'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export function LoginWithSupabase() {
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          setErrors({ general: 'कृपया पहले अपना ईमेल verify करें। आपके ईमेल पर एक verification link भेजा गया है।' })
        } else {
          setErrors({ general: 'लॉगिन में त्रुटि: ' + error.message })
        }
      } else {
        alert(`स्वागत है! आप सफलतापूर्वक लॉगिन हो गए हैं।`)
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email)
        }
        
        setFormData({ email: '', password: '', rememberMe: false })
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (error) {
      setErrors({ general: 'लॉगिन में त्रुटि हुई।' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="login" className="login-section">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h2>लॉगिन करें</h2>
            {errors.general && (
              <div className="error-message" style={{textAlign: 'center', marginBottom: '20px'}}>
                {errors.general}
              </div>
            )}
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
                <button 
                  type="button" 
                  className="resend-verification" 
                  onClick={async () => {
                    if (formData.email) {
                      const { error } = await supabase.auth.resend({
                        type: 'signup',
                        email: formData.email
                      })
                      if (!error) {
                        alert('Verification email भेजा गया है। कृपया अपना ईमेल चेक करें।')
                      }
                    } else {
                      alert('कृपया पहले ईमेल दर्ज करें।')
                    }
                  }}
                >
                  Verification Email दोबारा भेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SignupWithSupabase() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const validatePhone = (phone: string) => {
    const phonePattern = /^[6-9]\d{9}$/
    return phonePattern.test(phone)
  }

  const isStrongPassword = (password: string) => {
    const strongPattern = /^(?=.*[A-Za-z])(?=.*\d).+$/
    return strongPattern.test(password)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = 'नाम आवश्यक है।'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'नाम कम से कम 2 अक्षर का होना चाहिए।'
    }

    if (!formData.email) {
      newErrors.email = 'ईमेल आवश्यक है।'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'कृपया सही ईमेल पता दर्ज करें।'
    }

    if (!formData.phone) {
      newErrors.phone = 'मोबाइल नंबर आवश्यक है।'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'कृपया सही मोबाइल नंबर दर्ज करें (10 अंक)।'
    }

    if (!formData.password) {
      newErrors.password = 'पासवर्ड आवश्यक है।'
    } else if (formData.password.length < 6) {
      newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।'
    } else if (!isStrongPassword(formData.password)) {
      newErrors.password = 'पासवर्ड में कम से कम एक अक्षर और एक संख्या होनी चाहिए।'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'पासवर्ड की पुष्टि आवश्यक है।'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'पासवर्ड मेल नहीं खाते।'
    }

    if (!formData.userType) {
      newErrors.userType = 'उपयोगकर्ता प्रकार चुनें।'
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'कृपया नियम और शर्तों से सहमत हों।'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getUserTypeText = (userType: string) => {
    const types: {[key: string]: string} = {
      'student': 'छात्र',
      'parent': 'अभिभावक',
      'teacher': 'शिक्षक'
    }
    return types[userType] || userType
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        setErrors({ general: 'साइन अप में त्रुटि: ' + authError.message })
        return
      }

      // Insert user data into users table
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: formData.email,
              full_name: formData.name,
              phone: formData.phone,
              user_type: formData.userType,
            }
          ])

        if (dbError) {
          console.error('Database error:', dbError)
        }
      }

      alert(`धन्यवाद ${formData.name}! आपका खाता सफलतापूर्वक बन गया है।\n\nउपयोगकर्ता प्रकार: ${getUserTypeText(formData.userType)}\nईमेल: ${formData.email}\nमोबाइल: ${formData.phone}\n\n⚠️ महत्वपूर्ण: कृपया अपना ईमेल (${formData.email}) चेक करें और verification link पर क्लिक करें। Email verify करने के बाद ही आप लॉगिन कर सकेंगे।`)
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: '',
        agreeTerms: false
      })
      
      document.querySelector('#login')?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      setErrors({ general: 'साइन अप में त्रुटि हुई।' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="signup" className="signup-section">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h2>नया खाता बनाएं</h2>
            {errors.general && (
              <div className="error-message" style={{textAlign: 'center', marginBottom: '20px'}}>
                {errors.general}
              </div>
            )}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <label htmlFor="signupName">पूरा नाम</label>
                <input
                  type="text"
                  id="signupName"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="signupEmail">ईमेल आईडी</label>
                <input
                  type="email"
                  id="signupEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                <label htmlFor="signupPhone">मोबाइल नंबर</label>
                <input
                  type="tel"
                  id="signupPhone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className={`form-group ${errors.password ? 'error' : ''}`}>
                <label htmlFor="signupPassword">पासवर्ड</label>
                <input
                  type="password"
                  id="signupPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              
              <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
                <label htmlFor="confirmPassword">पासवर्ड की पुष्टि करें</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
              
              <div className={`form-group ${errors.userType ? 'error' : ''}`}>
                <label htmlFor="userType">उपयोगकर्ता प्रकार</label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">चुनें</option>
                  <option value="student">छात्र</option>
                  <option value="parent">अभिभावक</option>
                  <option value="teacher">शिक्षक</option>
                </select>
                {errors.userType && <span className="error-message">{errors.userType}</span>}
              </div>
              
              <div className={`form-group checkbox-group ${errors.agreeTerms ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="agreeTerms">मैं नियम और शर्तों से सहमत हूं</label>
                {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'खाता बनाया जा रहा है...' : 'खाता बनाएं'}
              </button>
              
              <div className="auth-links">
                <a href="#login" className="switch-auth">पहले से खाता है? लॉगिन करें</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
