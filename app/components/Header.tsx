'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let mounted = true
    // Initial fetch
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      setUserEmail(data.user?.email ?? null)
    })

    // Subscribe to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })

    // Close dropdown on outside click
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClickOutside)

    return () => {
      mounted = false
      document.removeEventListener('click', onClickOutside)
      sub.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="भारत सरकार" className="emblem" />
            <div className="school-info">
              <h1>राजकीय उच्च माध्यमिक विद्यालय गडली ठोठी</h1>
              <p>Government Higher Secondary School Gadli Thothi</p>
            </div>
          </div>
          <nav className="nav">
            <ul>
              <li><a href="#home">मुख्य पृष्ठ</a></li>
              <li><a href="#about">हमारे बारे में</a></li>
              <li><a href="#academics">शिक्षा</a></li>
              <li><a href="#faculty">शिक्षक</a></li>
              <li><a href="#contact">संपर्क</a></li>
              {userEmail ? (
                <li>
                  <div className="profile" ref={dropdownRef}>
                    <button
                      type="button"
                      aria-label="User menu"
                      className="avatar-btn"
                      onClick={() => setOpen((v) => !v)}
                    >
                      <div className="avatar-circle">{userEmail.charAt(0).toUpperCase()}</div>
                    </button>
                    {open && (
                      <div className="profile-dropdown">
                        <div className="profile-email" title={userEmail}>{userEmail}</div>
                        <button className="dropdown-item" onClick={handleLogout}>लॉगआउट</button>
                      </div>
                    )}
                  </div>
                </li>
              ) : (
                <>
                  <li><a href="#login" className="login-btn">लॉगिन</a></li>
                  <li><a href="#signup" className="signup-btn">साइन अप</a></li>
                </>
              )}
            </ul>
          </nav>
          <div className="mobile-menu-btn">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </div>
    </header>
  )
}
