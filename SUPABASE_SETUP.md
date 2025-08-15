# Supabase Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `government-school-gadli-thothi`
   - Database Password: (create a strong password)
   - Region: Choose closest to your location

## Step 2: Setup Database Schema

1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy and paste the contents of `database/schema.sql` file
4. Click "Run" to execute the SQL

## Step 3: Add Sample Data (Optional)

1. In SQL Editor, copy and paste contents of `database/sample-data.sql`
2. Click "Run" to insert sample data

## Step 4: Get API Keys

1. Go to "Settings" → "API" in your Supabase dashboard
2. Copy the following:
   - Project URL
   - anon/public key

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 6: Update Supabase Client

Update the file `lib/supabase.js` with your actual credentials:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## Database Tables Created

### Users Table
- Stores user authentication data
- Fields: id, email, full_name, phone, user_type, etc.

### Students Table  
- Student admission and profile data
- Fields: student details, parents info, address, application status

### Faculty Table
- Teacher and staff information
- Fields: employee_id, designation, subjects_taught, etc.

### Classes Table
- Class and section information
- Fields: class_name, section, class_teacher, student capacity

### Subjects Table
- Subject master data
- Fields: subject_name, subject_code, class_level

### Contact Inquiries Table
- Contact form submissions
- Fields: name, email, message, status

### Announcements Table
- School announcements and notices
- Fields: title, content, target_audience, publish_date

## Authentication Features

- Email/Password signup and login
- User type selection (Student, Parent, Teacher)
- Form validation with Hindi error messages
- Row Level Security (RLS) policies
- Password strength validation
- Email verification

## Next Steps

1. Test the authentication system
2. Add more features like:
   - Password reset functionality
   - Profile management
   - Student admission form integration
   - Teacher dashboard
   - Parent portal

## Security Features

- Row Level Security enabled
- Users can only access their own data
- Teachers and admin have appropriate permissions
- Input validation and sanitization
- Secure password hashing
