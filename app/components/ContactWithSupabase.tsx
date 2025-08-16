'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export function ContactWithSupabase() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            status: 'new'
          }
        ])

      if (error) {
        console.error('Contact form error:', error)
        setSubmitStatus('error')
      } else {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>संपर्क करें</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>पता</h3>
                <p>राजकीय उच्च माध्यमिक विद्यालय गादली-ठोठी<br />
                गांव गडली ठोठी, तहसील सिरसा<br />
                जिला सिरसा, हरियाणा - 125055</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>फोन</h3>
                <p>+91-1666-123456<br />
                +91-9876543210</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>ईमेल</h3>
                <p>principal@schoolgadlithothi.edu.in<br />
                info@schoolgadlithothi.edu.in</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>समय</h3>
                <p>सोमवार - शुक्रवार: 8:00 AM - 2:00 PM<br />
                शनिवार: 8:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              {submitStatus === 'success' && (
                <div className="success-message">
                  धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्दी ही आपसे संपर्क करेंगे।
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message">
                  संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।
                </div>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName">नाम *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contactEmail">ईमेल</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactPhone">मोबाइल नंबर</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contactSubject">विषय</label>
                  <select
                    id="contactSubject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">विषय चुनें</option>
                    <option value="admission">प्रवेश संबंधी</option>
                    <option value="fees">फीस संबंधी</option>
                    <option value="transport">परिवहन सुविधा</option>
                    <option value="academic">शैक्षणिक जानकारी</option>
                    <option value="complaint">शिकायत</option>
                    <option value="other">अन्य</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="contactMessage">संदेश *</label>
                <textarea
                  id="contactMessage"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'भेजा जा रहा है...' : 'संदेश भेजें'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.5!2d75.0269!3d29.5341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDMyJzAzLjAiTiA3NcKwMDEnMzYuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
