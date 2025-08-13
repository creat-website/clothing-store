# School Website

A simple full-stack school website built with Express, EJS, and SQLite.

## Quick start

1. Install dependencies

```bash
cd /workspace/school-website
npm install
```

2. Configure environment (optional)

```bash
cp .env.example .env
# Edit .env to change ADMIN_USER/ADMIN_PASS or PORT
```

3. Start the app

```bash
npm start
```

Open http://localhost:3000

- Admin area: http://localhost:3000/admin (basic auth using ADMIN_USER/ADMIN_PASS)
- Create news/events, and view contact messages

## Tech
- Express (server)
- EJS (views)
- SQLite (data)

## Notes
- Data stored in `data/database.sqlite`.
- Initial sample news/events are seeded on first run.