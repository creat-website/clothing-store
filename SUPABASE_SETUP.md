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

## Step 7: Create Trigger to Mirror Auth Users into Public Users

Run the following SQL in Supabase SQL Editor to auto-insert rows into `public.users` when a user signs up. This also fixes RLS role name to `teacher`.

```sql
-- If the users table already exists, ensure it does NOT have password_hash.
-- Create/replace the function that mirrors auth.users -> public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'student')
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        user_type = EXCLUDED.user_type,
        updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

REVOKE ALL ON FUNCTION public.handle_new_user FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.handle_new_user TO authenticated, anon;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS policy fix: use 'teacher' (not 'faculty')
DROP POLICY IF EXISTS "Students can view own data" ON public.students;
CREATE POLICY "Students can view own data" ON public.students FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND user_type IN ('teacher','admin')
  )
);

DROP POLICY IF EXISTS "Faculty and admin can view inquiries" ON public.contact_inquiries;
CREATE POLICY "Faculty and admin can view inquiries" ON public.contact_inquiries FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND user_type IN ('teacher','admin')
  )
);
```

Note: The signup form now sends metadata (`full_name`, `phone`, `user_type`) which this trigger uses.

## Troubleshooting

- **Network/API errors (wsarecv/timeout)**: Check firewall/VPN/proxy. If on IPv6-only or DNS64/NAT64 network, try another network or disable VPN. Ensure `NEXT_PUBLIC_SUPABASE_URL`/`ANON_KEY` are correct.

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
