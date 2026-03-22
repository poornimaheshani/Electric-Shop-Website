import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus("validation");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("http://localhost:5002/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: "",
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ fullName: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "80px 16px", backgroundColor: "#f7f7f7" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#061523" }}>
            Get In <span style={{ color: "#ffec1f" }}>Touch</span>
          </h2>
          <p style={{ color: "#555", marginTop: "10px" }}>
            Have questions? Visit our store or contact us directly.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

          {/* Left - Contact Info */}
          <div style={{ backgroundColor: "#fff", padding: "32px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
            <h3 style={{ marginBottom: "30px", fontSize: "22px" }}>Contact Information</h3>

            {[
              { icon: <MapPin size={20} />, label: "Our Location", value: "Kottawa road, Colombo, Sri Lanka" },
              { icon: <Phone size={20} />, label: "Phone", value: "+94 11 234 5678" },
              { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "+94 77 123 4567" },
              { icon: <Mail size={20} />, label: "Email", value: "info@nettecelectronic.lk" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", marginBottom: "24px" }}>
                <div style={{ backgroundColor: "#fff4b3", padding: "12px", borderRadius: "50%", marginRight: "16px", color: "#facc15" }}>
                  {item.icon}
                </div>
                <div>
                  <strong>{item.label}</strong>
                  <p style={{ margin: 0, color: "#555" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Contact Form */}
          <div style={{ backgroundColor: "#fff", padding: "32px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
            <h3 style={{ marginBottom: "30px", fontSize: "22px" }}>Send us a Message</h3>

            {[
              { name: "fullName", type: "text", placeholder: "Full Name" },
              { name: "phone", type: "tel", placeholder: "Phone Number" },
              { name: "email", type: "email", placeholder: "Email Address" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #ccc", outline: "none", marginBottom: "16px", fontSize: "14px", boxSizing: "border-box" }}
              />
            ))}

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #ccc", outline: "none", marginBottom: "16px", fontSize: "14px", boxSizing: "border-box" }}
            />

            {/* Status Messages */}
            {status === "validation" && (
              <p style={{ color: "orange", marginBottom: "12px" }}>⚠️ Please fill in Name, Email and Message.</p>
            )}
            {status === "success" && (
              <p style={{ color: "green", marginBottom: "12px" }}>✅ Message sent successfully!</p>
            )}
            {status === "error" && (
              <p style={{ color: "red", marginBottom: "12px" }}>⚠️ Failed to send. Please try again.</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: "100%", backgroundColor: loading ? "#ccc" : "#ffec1f", color: "#061523", fontWeight: "bold", padding: "16px", borderRadius: "10px", border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} style={{ marginLeft: "8px" }} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}