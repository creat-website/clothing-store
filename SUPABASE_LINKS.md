# Supabase Database Links और Setup

## 🔗 **Important Links:**

### 1. **Supabase Dashboard:**
- **Main URL:** https://supabase.com/dashboard
- **Login करके अपना project देखें**

### 2. **Database Tables (आपका data यहां save होगा):**

#### **Users Table** - Login/Signup data
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor/tables/users
```

#### **Students Table** - Admission forms data  
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor/tables/students
```

#### **Faculty Table** - Teachers data
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor/tables/faculty
```

#### **Contact Inquiries** - Contact form submissions
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor/tables/contact_inquiries
```

#### **Announcements** - School notices
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor/tables/announcements
```

## 📊 **Real-time Data Viewing:**

### **Table Editor में data देखने के लिए:**
1. Supabase dashboard में login करें
2. अपना project select करें  
3. Left sidebar में **"Table Editor"** click करें
4. कोई भी table select करके data देख सकते हैं

### **SQL Editor में queries run करने के लिए:**
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql
```

## 🚀 **Setup Steps:**

### **Step 1: Project बनाएं**
1. https://supabase.com पर जाएं
2. "New Project" click करें
3. Project name: `government-school-gadli-thothi`

### **Step 2: Database Schema Setup**
1. SQL Editor में जाएं
2. `database/schema.sql` file का content copy-paste करें
3. "Run" button click करें

### **Step 3: Sample Data Add करें**
1. SQL Editor में `database/sample-data.sql` का content paste करें
2. "Run" करें

### **Step 4: API Keys Copy करें**
```
Settings → API → Copy करें:
- Project URL
- anon/public key
```

## 📱 **Data Access URLs:**

### **Authentication Data:**
- Login attempts और user registrations यहां save होंगे
- Real-time में देख सकते हैं कि कौन signup कर रहा है

### **Student Admissions:**
- सभी admission forms का data `students` table में
- Application status track कर सकते हैं

### **Contact Forms:**
- Website से आने वाले सभी messages
- Status update कर सकते हैं (new, in_progress, resolved)

## 🔐 **Security:**
- Row Level Security enabled है
- Users अपना ही data देख सकते हैं
- Teachers और Admin को appropriate permissions हैं

---

**Note:** `YOUR_PROJECT_ID` को अपने actual Supabase project ID से replace करें जो dashboard URL में दिखेगा।
