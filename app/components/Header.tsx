'use client'

import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Supabase removed: no auth state tracking
    setUserEmail(null)
    setOpen(false)
  }, [])

  // Supabase removed: no logout handler

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="भारत सरकार" className="emblem" />
            <div className="school-info">
              <h1>राजकीय उच्च माध्यमिक विद्यालय गादली-ठोठी</h1>
              <p>Government Higher Secondary School Gadli Thothi</p>
            </div>
          </div>
          <nav className={`nav ${mobileOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#home">मुख्य पृष्ठ</a></li>
              <li><a href="#about">हमारे बारे में</a></li>
              <li><a href="#academics">शिक्षा</a></li>
              <li><a href="#faculty">शिक्षक</a></li>
              <li><a href="#contact">संपर्क</a></li>
              {/* Supabase removed: always show login/signup links statically */}
              <li><a href="/login.html" className="login-btn">लॉगिन</a></li>
              <li><a href="/signup.html" className="signup-btn">साइन अप</a></li>
            </ul>
          </nav>
          <div
            className="mobile-menu-btn"
            role="button"
            aria-label="Open mobile menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>
      </div>
    </header>
  )
}

