export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>राजकीय उच्च माध्यमिक विद्यालय गादली-ठोठी</h3>
            <p>गुणवत्तापूर्ण शिक्षा के लिए प्रतिबद्ध</p>
          </div>
          <div className="footer-section">
            <h3>त्वरित लिंक</h3>
            <ul>
              <li><a href="#home">मुख्य पृष्ठ</a></li>
              <li><a href="#about">हमारे बारे में</a></li>
              <li><a href="#admissions">प्रवेश</a></li>
              <li><a href="#contact">संपर्क</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>संपर्क</h3>
            <p><i className="fas fa-phone"></i> +91 11 2345 6789</p>
            <p><i className="fas fa-envelope"></i> info@govtschool.edu.in</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 राजकीय उच्च माध्यमिक विद्यालय गादली-ठोठी। सभी अधिकार सुरक्षित।</p>
        </div>
      </div>
    </footer>
  )
}
