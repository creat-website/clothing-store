'use client'

export default function Header() {
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
              <li><a href="#admissions">प्रवेश</a></li>
              <li><a href="#faculty">शिक्षक</a></li>
              <li><a href="#contact">संपर्क</a></li>
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
