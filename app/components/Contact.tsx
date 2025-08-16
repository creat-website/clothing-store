export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">संपर्क करें</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>पता</h3>
                <p>राजकीय उच्च माध्यमिक विद्यालय गादली-ठोठी<br />
                गडली ठोठी, हरियाणा - 125001</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>फोन</h3>
                <p>+91 11 2345 6789</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>ईमेल</h3>
                <p>info@govtschool.edu.in</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>समय</h3>
                <p>सोमवार - शुक्रवार: 8:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
          <div className="map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8746034230833!2d77.20902931508236!3d28.65195958240251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683d1c7a3%3A0x8c59b1b5c8b5c8b5!2sRed%20Fort!5e0!3m2!1sen!2sin!4v1642678901234!5m2!1sen!2sin" 
              width="100%" 
              height="300" 
              style={{border:0}} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
