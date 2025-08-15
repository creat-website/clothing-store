const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const basicAuth = require('express-basic-auth');
const ejsMate = require('ejs-mate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

function initializeDatabase() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        published_at INTEGER NOT NULL
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        event_date INTEGER NOT NULL
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )`
    );

    db.get('SELECT COUNT(*) as count FROM news', (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
      if (row.count === 0) {
        const stmt = db.prepare(
          'INSERT INTO news (title, content, published_at) VALUES (?, ?, ?)'
        );
        stmt.run(
          'Welcome to Our School',
          'We are excited to launch our new website!',
          Date.now()
        );
        stmt.run(
          'Spring Term Begins',
          'Classes start next Monday. Please check your schedules.',
          Date.now()
        );
        stmt.finalize();
      }
    });

    db.get('SELECT COUNT(*) as count FROM events', (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
      if (row.count === 0) {
        const stmt = db.prepare(
          'INSERT INTO events (title, description, event_date) VALUES (?, ?, ?)'
        );
        const now = Date.now();
        stmt.run(
          'Open House',
          'Meet our teachers and tour the campus.',
          now + 7 * 24 * 60 * 60 * 1000
        );
        stmt.run(
          'Science Fair',
          'Student projects on display in the gym.',
          now + 30 * 24 * 60 * 60 * 1000
        );
        stmt.finalize();
      }
    });
  });
}

initializeDatabase();

function formatDate(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

app.get('/', (req, res) => {
  db.serialize(() => {
    db.all(
      'SELECT * FROM news ORDER BY published_at DESC LIMIT 3',
      (err, news) => {
        if (err) {
          return res.status(500).send('Database error');
        }
        db.all(
          'SELECT * FROM events WHERE event_date >= ? ORDER BY event_date ASC LIMIT 3',
          [Date.now()],
          (err2, events) => {
            if (err2) {
              return res.status(500).send('Database error');
            }
            res.render('index', {
              pageTitle: 'Home',
              news,
              events,
              formatDate
            });
          }
        );
      }
    );
  });
});

app.get('/about', (req, res) =>
  res.render('about', { pageTitle: 'About Us' })
);
app.get('/academics', (req, res) =>
  res.render('academics', { pageTitle: 'Academics' })
);
app.get('/admissions', (req, res) =>
  res.render('admissions', { pageTitle: 'Admissions' })
);

app.get('/news', (req, res) => {
  db.all('SELECT * FROM news ORDER BY published_at DESC', (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('news', { pageTitle: 'News', news: rows, formatDate });
  });
});

app.get('/events', (req, res) => {
  db.all('SELECT * FROM events ORDER BY event_date ASC', (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('events', { pageTitle: 'Events', events: rows, formatDate });
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    pageTitle: 'Contact',
    success: req.query.success === '1'
  });
});

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).render('contact', {
      pageTitle: 'Contact',
      error: 'Please fill name, email, and message.',
      success: false
    });
  }
  db.run(
    'INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
    [name, email, subject || '', message, Date.now()],
    err => {
      if (err)
        return res.status(500).render('contact', {
          pageTitle: 'Contact',
          error: 'Database error. Try again.',
          success: false
        });
      res.redirect('/contact?success=1');
    }
  );
});

const adminUser = process.env.ADMIN_USER || 'admin';
const adminPass = process.env.ADMIN_PASS || 'admin123';
app.use(
  '/admin',
  basicAuth({
    users: { [adminUser]: adminPass },
    challenge: true
  })
);

app.get('/admin', (req, res) => {
  res.render('admin/index', { pageTitle: 'Admin' });
});

app.get('/admin/news', (req, res) => {
  db.all('SELECT * FROM news ORDER BY published_at DESC', (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('admin/news_list', {
      pageTitle: 'Manage News',
      news: rows,
      formatDate
    });
  });
});

app.get('/admin/events', (req, res) => {
  db.all('SELECT * FROM events ORDER BY event_date DESC', (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('admin/events_list', {
      pageTitle: 'Manage Events',
      events: rows,
      formatDate
    });
  });
});

app.get('/admin/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('admin/messages_list', {
      pageTitle: 'Messages',
      messages: rows,
      formatDate
    });
  });
});

app.get('/admin/news/create', (req, res) => {
  res.render('admin/news_create', { pageTitle: 'Create News' });
});

app.post('/admin/news/create', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).render('admin/news_create', {
      pageTitle: 'Create News',
      error: 'Please provide title and content.'
    });
  }
  db.run(
    'INSERT INTO news (title, content, published_at) VALUES (?, ?, ?)',
    [title, content, Date.now()],
    err => {
      if (err)
        return res.status(500).render('admin/news_create', {
          pageTitle: 'Create News',
          error: 'Database error.'
        });
      res.redirect('/admin/news');
    }
  );
});

app.get('/admin/events/create', (req, res) => {
  res.render('admin/events_create', { pageTitle: 'Create Event' });
});

app.post('/admin/events/create', (req, res) => {
  const { title, description, date } = req.body;
  if (!title || !description || !date) {
    return res.status(400).render('admin/events_create', {
      pageTitle: 'Create Event',
      error: 'Please provide title, description, and date.'
    });
  }
  const timestamp = Date.parse(date);
  if (Number.isNaN(timestamp)) {
    return res.status(400).render('admin/events_create', {
      pageTitle: 'Create Event',
      error: 'Invalid date.'
    });
  }
  db.run(
    'INSERT INTO events (title, description, event_date) VALUES (?, ?, ?)',
    [title, description, timestamp],
    err => {
      if (err)
        return res.status(500).render('admin/events_create', {
          pageTitle: 'Create Event',
          error: 'Database error.'
        });
      res.redirect('/admin/events');
    }
  );
});

app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`School website running at http://localhost:${PORT}`);
});