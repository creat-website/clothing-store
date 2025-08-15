'use client'

import { useState } from 'react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.email) {
      newErrors.email = 'ईमेल आवश्यक है।'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'कृपया सही ईमेल पता दर्ज करें।'
    }

    if (!formData.password) {
      newErrors.password = 'पासवर्ड आवश्यक है।'
    } else if (formData.password.length < 6) {
      newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate login process
    setTimeout(() => {
      alert(`स्वागत है! आप सफलतापूर्वक लॉगिन हो गए हैं।`)
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email)
      }
      
      setFormData({ email: '', password: '', rememberMe: false })
      setIsSubmitting(false)
      
      // Scroll to home
      document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
    }, 1500)
  }

  return (
    <section id="login" className="login-section">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h2>लॉगिन करें</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="loginEmail">ईमेल आईडी</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className={`form-group ${errors.password ? 'error' : ''}`}>
                <label htmlFor="loginPassword">पासवर्ड</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe">मुझे याद रखें</label>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
              </button>
              
              <div className="auth-links">
                <a href="#signup" className="switch-auth">नया खाता बनाएं</a>
                <a href="#" className="forgot-password">पासवर्ड भूल गए?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
