-- Government School Database Schema for Supabase

-- Users table for authentication
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    user_type VARCHAR(20) CHECK (user_type IN ('student', 'parent', 'teacher', 'admin')) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    mother_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
    category VARCHAR(20) CHECK (category IN ('general', 'obc', 'sc', 'st', 'ews')),
    class_applying VARCHAR(20) NOT NULL,
    previous_school VARCHAR(255),
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    aadhar_number VARCHAR(12) UNIQUE,
    father_occupation VARCHAR(255),
    mother_occupation VARCHAR(255),
    family_income DECIMAL(10,2),
    transport_required BOOLEAN DEFAULT false,
    special_requirements TEXT,
    application_status VARCHAR(20) DEFAULT 'pending' CHECK (application_status IN ('pending', 'approved', 'rejected', 'waitlist')),
    application_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Faculty table
CREATE TABLE faculty (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    qualification VARCHAR(255),
    experience_years INTEGER,
    joining_date DATE,
    subjects_taught TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    class_name VARCHAR(20) NOT NULL,
    section VARCHAR(5),
    class_teacher_id UUID REFERENCES faculty(id),
    academic_year VARCHAR(10) NOT NULL,
    max_students INTEGER DEFAULT 40,
    current_students INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    class_level VARCHAR(20) NOT NULL,
    is_mandatory BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact inquiries table
CREATE TABLE contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- School announcements table
CREATE TABLE announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    announcement_type VARCHAR(50) CHECK (announcement_type IN ('general', 'academic', 'event', 'holiday', 'urgent')),
    target_audience VARCHAR(50) CHECK (target_audience IN ('all', 'students', 'parents', 'faculty')),
    is_active BOOLEAN DEFAULT true,
    publish_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_application_status ON students(application_status);
CREATE INDEX idx_students_class_applying ON students(class_applying);
CREATE INDEX idx_faculty_user_id ON faculty(user_id);
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_announcements_active ON announcements(is_active);
CREATE INDEX idx_announcements_target ON announcements(target_audience);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Students can view their own data, faculty and admin can view all
CREATE POLICY "Students can view own data" ON students FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type IN ('teacher', 'admin'))
);

-- Faculty can view their own data and admin can view all
CREATE POLICY "Faculty can view own data" ON faculty FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin')
);

-- Contact inquiries can be viewed by faculty and admin
CREATE POLICY "Faculty and admin can view inquiries" ON contact_inquiries FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type IN ('teacher', 'admin'))
);

-- Anyone can insert contact inquiries
CREATE POLICY "Anyone can submit inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);

-- Announcements can be viewed by all authenticated users
CREATE POLICY "All users can view announcements" ON announcements FOR SELECT USING (
    is_active = true AND 
    (publish_date <= CURRENT_DATE) AND 
    (expiry_date IS NULL OR expiry_date >= CURRENT_DATE)
);

-- Functions and triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON faculty FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Automatically create a row in public.users when a new auth user signs up
-- This uses the metadata provided during signUp from the client
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

-- Allow the auth role to execute the function
REVOKE ALL ON FUNCTION public.handle_new_user FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.handle_new_user TO authenticated, anon;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
