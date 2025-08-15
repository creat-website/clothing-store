// Supabase में data insert करने के लिए script
import { supabase } from './lib/supabase.js';

// Sample data insert करने का function
async function insertSampleData() {
    try {
        console.log('Supabase में data insert कर रहे हैं...');

        // 1. Contact inquiry insert करें
        const { data: contactData, error: contactError } = await supabase
            .from('contact_inquiries')
            .insert([
                {
                    name: 'अमित शर्मा',
                    email: 'amit.sharma@gmail.com',
                    phone: '9876543218',
                    subject: 'नया प्रवेश',
                    message: 'मैं अपनी बेटी का दाखिला कराना चाहता हूं। कृपया जानकारी दें।',
                    status: 'new'
                },
                {
                    name: 'प्रिया गुप्ता',
                    email: 'priya.gupta@gmail.com',
                    phone: '9876543219',
                    subject: 'स्कूल टाइमिंग',
                    message: 'स्कूल का समय क्या है? छुट्टी कब होती है?',
                    status: 'new'
                }
            ]);

        if (contactError) {
            console.error('Contact inquiry insert error:', contactError);
        } else {
            console.log('✅ Contact inquiries successfully inserted:', contactData);
        }

        // 2. Announcement insert करें
        const { data: announcementData, error: announcementError } = await supabase
            .from('announcements')
            .insert([
                {
                    title: 'गर्मी की छुट्टियां',
                    content: 'गर्मी की छुट्टियां 15 मई से 30 जून तक रहेंगी। सभी छात्र घर पर पढ़ाई करते रहें।',
                    announcement_type: 'general',
                    target_audience: 'all',
                    publish_date: new Date().toISOString().split('T')[0],
                    expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                {
                    title: 'नई किताबें उपलब्ध',
                    content: 'नए सत्र की किताबें स्कूल में उपलब्ध हैं। कृपया अपनी किताबें ले जाएं।',
                    announcement_type: 'academic',
                    target_audience: 'students',
                    publish_date: new Date().toISOString().split('T')[0],
                    expiry_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                }
            ]);

        if (announcementError) {
            console.error('Announcement insert error:', announcementError);
        } else {
            console.log('✅ Announcements successfully inserted:', announcementData);
        }

        // 3. Data fetch करके check करें
        const { data: allContacts, error: fetchError } = await supabase
            .from('contact_inquiries')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (fetchError) {
            console.error('Data fetch error:', fetchError);
        } else {
            console.log('📋 Latest contact inquiries:');
            allContacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.name} - ${contact.subject}`);
            });
        }

        const { data: allAnnouncements, error: announcementFetchError } = await supabase
            .from('announcements')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(3);

        if (announcementFetchError) {
            console.error('Announcements fetch error:', announcementFetchError);
        } else {
            console.log('📢 Active announcements:');
            allAnnouncements.forEach((announcement, index) => {
                console.log(`${index + 1}. ${announcement.title}`);
            });
        }

        console.log('🎉 सभी data successfully insert हो गया!');

    } catch (error) {
        console.error('Error:', error);
    }
}

// Function को run करें
insertSampleData();

// Export for use in other files
export { insertSampleData };
