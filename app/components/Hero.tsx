export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h2>गुणवत्तापूर्ण शिक्षा का केंद्र</h2>
        <p>हमारा विद्यालय बच्चों के समग्र विकास के लिए प्रतिबद्ध है</p>
        <div className="hero-buttons">
          <a href="#admissions" className="btn btn-primary">प्रवेश के लिए आवेदन करें</a>
          <a href="#about" className="btn btn-secondary">और जानें</a>
        </div>
      </div>
      <div className="hero-image">
        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="School Building" />
      </div>
    </section>
  )
}
