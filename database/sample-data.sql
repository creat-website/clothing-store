-- Sample data for Government School Database

-- Insert sample users
INSERT INTO users (id, email, password_hash, full_name, phone, user_type) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@school.gov.in', '$2b$10$example_hash', 'प्रधानाचार्य राम शर्मा', '9876543210', 'admin'),
('550e8400-e29b-41d4-a716-446655440001', 'teacher1@school.gov.in', '$2b$10$example_hash', 'श्रीमती सुनीता देवी', '9876543211', 'teacher'),
('550e8400-e29b-41d4-a716-446655440002', 'teacher2@school.gov.in', '$2b$10$example_hash', 'श्री विकास कुमार', '9876543212', 'teacher'),
('550e8400-e29b-41d4-a716-446655440003', 'parent1@gmail.com', '$2b$10$example_hash', 'श्री राजेश गुप्ता', '9876543213', 'parent'),
('550e8400-e29b-41d4-a716-446655440004', 'student1@gmail.com', '$2b$10$example_hash', 'आदित्य गुप्ता', '9876543214', 'student');

-- Insert sample faculty
INSERT INTO faculty (user_id, employee_id, designation, department, qualification, experience_years, joining_date, subjects_taught) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'TCH001', 'वरिष्ठ शिक्षक', 'गणित विभाग', 'M.Sc Mathematics, B.Ed', 15, '2010-07-01', ARRAY['गणित', 'विज्ञान']),
('550e8400-e29b-41d4-a716-446655440002', 'TCH002', 'शिक्षक', 'हिंदी विभाग', 'M.A Hindi, B.Ed', 8, '2016-08-15', ARRAY['हिंदी', 'संस्कृत']);

-- Insert sample classes
INSERT INTO classes (class_name, section, class_teacher_id, academic_year, max_students, current_students) VALUES
('कक्षा 1', 'A', (SELECT id FROM faculty WHERE employee_id = 'TCH001'), '2024-25', 40, 35),
('कक्षा 2', 'A', (SELECT id FROM faculty WHERE employee_id = 'TCH002'), '2024-25', 40, 38),
('कक्षा 3', 'A', (SELECT id FROM faculty WHERE employee_id = 'TCH001'), '2024-25', 40, 32),
('कक्षा 4', 'A', (SELECT id FROM faculty WHERE employee_id = 'TCH002'), '2024-25', 40, 30),
('कक्षा 5', 'A', (SELECT id FROM faculty WHERE employee_id = 'TCH001'), '2024-25', 40, 28);

-- Insert sample subjects
INSERT INTO subjects (subject_name, subject_code, class_level, is_mandatory) VALUES
('हिंदी', 'HIN01', 'कक्षा 1-5', true),
('अंग्रेजी', 'ENG01', 'कक्षा 1-5', true),
('गणित', 'MAT01', 'कक्षा 1-5', true),
('पर्यावरण अध्ययन', 'EVS01', 'कक्षा 1-5', true),
('कला और शिल्प', 'ART01', 'कक्षा 1-5', false),
('शारीरिक शिक्षा', 'PE01', 'कक्षा 1-5', false);

-- Insert sample student
INSERT INTO students (
    user_id, student_name, father_name, mother_name, date_of_birth, gender, 
    category, class_applying, address, district, state, pincode, 
    aadhar_number, father_occupation, mother_occupation, family_income, 
    application_status, application_number
) VALUES (
    '550e8400-e29b-41d4-a716-446655440004',
    'आदित्य गुप्ता',
    'राजेश गुप्ता',
    'सुनीता गुप्ता',
    '2015-05-15',
    'male',
    'general',
    'कक्षा 3',
    'गांव गडली ठोठी, तहसील सिरसा',
    'सिरसा',
    'हरियाणा',
    '125055',
    '123456789012',
    'किसान',
    'गृहिणी',
    150000.00,
    'approved',
    'ADM2024001'
);

-- Insert sample contact inquiries
INSERT INTO contact_inquiries (name, email, phone, subject, message, status) VALUES
('राम लाल', 'ramlal@gmail.com', '9876543215', 'प्रवेश संबंधी जानकारी', 'मैं अपने बेटे का दाखिला कराना चाहता हूं। कृपया प्रक्रिया बताएं।', 'new'),
('सुमित्रा देवी', 'sumitra@gmail.com', '9876543216', 'फीस संबंधी', 'कक्षा 2 की फीस कितनी है?', 'resolved'),
('विनोद कुमार', 'vinod@gmail.com', '9876543217', 'परिवहन सुविधा', 'क्या स्कूल बस की सुविधा उपलब्ध है?', 'in_progress');

-- Insert sample announcements
INSERT INTO announcements (title, content, announcement_type, target_audience, created_by, publish_date, expiry_date) VALUES
('नया शैक्षणिक सत्र 2024-25', 'नया शैक्षणिक सत्र 1 अप्रैल 2024 से शुरू हो रहा है। सभी छात्र समय पर स्कूल आएं।', 'academic', 'all', '550e8400-e29b-41d4-a716-446655440000', '2024-03-25', '2024-04-15'),
('वार्षिक खेल दिवस', 'वार्षिक खेल दिवस 15 दिसंबर को आयोजित किया जाएगा। सभी छात्र भाग लें।', 'event', 'students', '550e8400-e29b-41d4-a716-446655440000', '2024-12-01', '2024-12-16'),
('अभिभावक-शिक्षक बैठक', 'मासिक अभिभावक-शिक्षक बैठक 20 तारीख को होगी।', 'general', 'parents', '550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE, CURRENT_DATE + INTERVAL '10 days');
