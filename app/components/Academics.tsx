export default function Academics() {
  return (
    <section id="academics" className="academics">
      <div className="container">
        <h2 className="section-title">शैक्षणिक कार्यक्रम</h2>
        <div className="academics-grid">
          <div className="academic-card">
            <i className="fas fa-child"></i>
            <h3>कक्षा 6-8</h3>
            <p>मध्य विद्यालय - विज्ञान, गणित और भाषा पर फोकस</p>
          </div>
          <div className="academic-card">
            <i className="fas fa-user-graduate"></i>
            <h3>कक्षा 9-10</h3>
            <p>माध्यमिक शिक्षा - बोर्ड परीक्षा की तैयारी</p>
          </div>
          <div className="academic-card">
            <i className="fas fa-graduation-cap"></i>
            <h3>कक्षा 11-12</h3>
            <p>उच्च माध्यमिक - विज्ञान, वाणिज्य और कला संकाय</p>
          </div>
          <div className="academic-card">
            <i className="fas fa-palette"></i>
            <h3>कला एवं शिल्प</h3>
            <p>रचनात्मकता और कलात्मक कौशल विकास</p>
          </div>
          <div className="academic-card">
            <i className="fas fa-running"></i>
            <h3>खेल कूद</h3>
            <p>शारीरिक स्वास्थ्य और टीम वर्क</p>
          </div>
        </div>
      </div>
    </section>
  )
}
