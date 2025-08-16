'use client'

export default function Admissions() {
  return (
    <section id="admissions" className="admissions">
      <div className="container">
        <h2 className="section-title">प्रवेश प्रक्रिया</h2>
        <div className="admission-content">
          <div className="admission-info">
            <h3>प्रवेश की जानकारी</h3>
            <ul>
              <li><strong>आयु सीमा:</strong> 11-18 वर्ष</li>
              <li><strong>प्रवेश काल:</strong> अप्रैल-मई</li>
              <li><strong>आवश्यक दस्तावेज:</strong> जन्म प्रमाण पत्र, आधार कार्ड, पासपोर्ट साइज फोटो</li>
              <li><strong>शुल्क:</strong> निःशुल्क</li>
            </ul>
            <div className="admission-requirements">
              <h4>आवश्यक दस्तावेज:</h4>
              <ul>
                <li>जन्म प्रमाण पत्र</li>
                <li>आधार कार्ड (बच्चे और माता-पिता का)</li>
                <li>पिछली कक्षा की मार्कशीट</li>
                <li>स्थानांतरण प्रमाण पत्र (TC)</li>
                <li>जाति प्रमाण पत्र (यदि लागू हो)</li>
                <li>आय प्रमाण पत्र</li>
                <li>पासपोर्ट साइज फोटो (4 प्रतियां)</li>
              </ul>
            </div>
          </div>
          <div className="main-admission-form">
            <h3>मुख्य प्रवेश आवेदन फॉर्म</h3>
            <form id="admissionForm" className="admission-form-main">
              <div className="form-section">
                <h4>छात्र की जानकारी</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="studentName">छात्र का पूरा नाम *</label>
                    <input type="text" id="studentName" name="studentName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fatherName">पिता का नाम *</label>
                    <input type="text" id="fatherName" name="fatherName" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="motherName">माता का नाम *</label>
                    <input type="text" id="motherName" name="motherName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">जन्म तिथि *</label>
                    <input type="date" id="dob" name="dob" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">लिंग *</label>
                    <select id="gender" name="gender" required>
                      <option value="">चुनें</option>
                      <option value="male">पुरुष</option>
                      <option value="female">महिला</option>
                      <option value="other">अन्य</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">श्रेणी *</label>
                    <select id="category" name="category" required>
                      <option value="">चुनें</option>
                      <option value="general">सामान्य</option>
                      <option value="obc">अन्य पिछड़ा वर्ग (OBC)</option>
                      <option value="sc">अनुसूचित जाति (SC)</option>
                      <option value="st">अनुसूचित जनजाति (ST)</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="admissionClass">प्रवेश की कक्षा *</label>
                    <select id="admissionClass" name="admissionClass" required>
                      <option value="">कक्षा चुनें</option>
                      <option value="6">कक्षा 6</option>
                      <option value="7">कक्षा 7</option>
                      <option value="8">कक्षा 8</option>
                      <option value="9">कक्षा 9</option>
                      <option value="10">कक्षा 10</option>
                      <option value="11">कक्षा 11</option>
                      <option value="12">कक्षा 12</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">मोबाइल नंबर *</label>
                    <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" required />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>संपर्क जानकारी</h4>
                <div className="form-group">
                  <label htmlFor="address">पूरा पता *</label>
                  <textarea id="address" name="address" rows={3} required></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="district">जिला *</label>
                    <input type="text" id="district" name="district" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">राज्य *</label>
                    <input type="text" id="state" name="state" defaultValue="राजस्थान" required />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>घोषणा</h4>
                <div className="checkbox-group">
                  <input type="checkbox" id="declaration" name="declaration" required />
                  <label htmlFor="declaration">मैं घोषणा करता/करती हूं कि उपरोक्त सभी जानकारी सत्य है।</label>
                </div>
              </div>

              <div className="form-actions">
                <button type="reset" className="btn btn-secondary">रीसेट करें</button>
                <button type="submit" className="btn btn-primary">आवेदन जमा करें</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
