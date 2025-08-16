export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">हमारे विद्यालय के बारे में</h2>
        <div className="about-content">
          <div className="about-text">
            <p>हमारा राजकीय उच्च माध्यमिक विद्यालय गादली-ठोठी 1985 से समुदाय की सेवा कर रहा है। हम गुणवत्तापूर्ण शिक्षा प्रदान करने और छात्रों के समग्र विकास के लिए प्रतिबद्ध हैं।</p>
            <div className="features">
              <div className="feature">
                <i className="fas fa-graduation-cap"></i>
                <h3>गुणवत्तापूर्ण शिक्षा</h3>
                <p>अनुभवी शिक्षकों द्वारा आधुनिक शिक्षण पद्धति</p>
              </div>
              <div className="feature">
                <i className="fas fa-users"></i>
                <h3>समग्र विकास</h3>
                <p>खेल, कला और सांस्कृतिक गतिविधियों पर जोर</p>
              </div>
              <div className="feature">
                <i className="fas fa-book"></i>
                <h3>निःशुल्क शिक्षा</h3>
                <p>सभी बच्चों के लिए निःशुल्क गुणवत्तापूर्ण शिक्षा</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
