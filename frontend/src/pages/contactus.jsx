import React, { useState } from "react";
import "../styles/contactus.css";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:5002/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setStatusMsg(data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMsg(data.message);
      }
    } catch (err) {
      setStatus("error");
      setStatusMsg("Could not connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>Contact Us</h1>
        <p>
          NetTec Electronic delivers top-quality electrical, communication, and
          networking products nationwide. Our dedicated team is ready to provide
          expert support, answer your questions, and help you find the perfect
          solutions for your projects. Reach out today and experience fast,
          reliable, and friendly service. Whether you are a business, contractor,
          or home user, we ensure every order is handled with care and delivered
          on time.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-left">
            <h2>Get in Touch</h2>
            <p>
              Whether you need product support, technical assistance, or help
              with your order, our dedicated team is here to assist you.
            </p>

            <div className="contact-cards">
              <div className="contact-card">
                <span>📍</span>
                <div>
                  <h4>Address</h4>
                  <p>123 Electrical Avenue, Business District, Colombo</p>
                </div>
              </div>

              <div className="contact-card">
                <span>📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+94 71 567 890</p>
                </div>
              </div>

              <div className="contact-card">
                <span>📧</span>
                <div>
                  <h4>Email</h4>
                  <p>support@nettec.lk</p>
                </div>
              </div>

              <div className="contact-card">
                <span>🕒</span>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <div className="form-container">
          <h2>Send Us a Message</h2>

          {/* SUCCESS MESSAGE */}
          {status === "success" && (
            <div className="contact-success-msg">
              <span>✅</span> {statusMsg}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {status === "error" && (
            <div className="contact-error-msg">
              <span>⚠️</span> {statusMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contactus;
