-- Quick Setup: Copy-paste this entire code in Supabase SQL Editor

-- Users table
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    user_type VARCHAR(20) CHECK (user_type IN ('student', 'parent', 'teacher', 'admin')) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
    class_applying VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    phone VARCHAR(15),
    application_status VARCHAR(20) DEFAULT 'pending',
    application_number VARCHAR(50) UNIQUE,
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
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    announcement_type VARCHAR(50),
    target_audience VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    publish_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample data
INSERT INTO users (email, full_name, phone, user_type) VALUES
('admin@school.gov.in', 'प्रधानाचार्य राम शर्मा', '9876543210', 'admin'),
('teacher@school.gov.in', 'श्रीमती सुनीता देवी', '9876543211', 'teacher');

INSERT INTO announcements (title, content, announcement_type, target_audience) VALUES
('स्वागत है', 'राजकीय उच्च माध्यमिक विद्यालय गादली-ठोठी में आपका स्वागत है।', 'general', 'all'),
('नया शैक्षणिक सत्र', 'नया शैक्षणिक सत्र शुरू हो गया है। सभी छात्र समय पर आएं।', 'academic', 'students');
