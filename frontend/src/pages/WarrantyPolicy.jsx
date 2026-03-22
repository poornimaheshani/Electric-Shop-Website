import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/WarrantyPolicy.css";

const WarrantyPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I claim warranty?",
      answer:
        "Contact us via email or phone with your order number and a description of the issue. Our team will guide you through the warranty claim process.",
    },
    {
      question: "Does warranty cover physical damage?",
      answer:
        "No. Warranty does not cover physical damage caused by the customer such as drops, spills, or misuse.",
    },
    {
      question: "How long does warranty repair take?",
      answer:
        "Warranty repairs typically take 7-14 business days depending on the product and availability of parts.",
    },
    {
      question: "Can I get a replacement instead of repair?",
      answer:
        "If the product cannot be repaired, we will offer a replacement of the same model or a product of equal value.",
    },
  ];

  return (
    <div className="warranty-page">
      <Navbar />

      {/* Hero */}
      <div className="warranty-hero">
        <div className="warranty-hero-content">
          <h1>Warranty <span>Policy</span></h1>
          <p>We stand behind every product we sell with reliable warranty coverage.</p>
        </div>
      </div>

      <div className="warranty-container">

        {/* Intro */}
        <div className="warranty-intro">
          <p>
            At <strong>NetTec Electronic</strong>, all products come with manufacturer warranty.
            We are committed to ensuring your complete satisfaction with every purchase.
            Please read our warranty policy carefully to understand your coverage.
          </p>
        </div>

        {/* Warranty Cards */}
        <div className="warranty-cards-section">
          <h2>Warranty Coverage</h2>
          <div className="warranty-cards-grid">
            <div className="warranty-card">
              <div className="warranty-card-icon">🔧</div>
              <h4>Manufacturing Defects</h4>
              <p>Full coverage for any defects caused during the manufacturing process.</p>
              <span className="warranty-badge">Covered</span>
            </div>

            <div className="warranty-card">
              <div className="warranty-card-icon">⚡</div>
              <h4>Electrical Faults</h4>
              <p>Coverage for internal electrical component failures under normal use.</p>
              <span className="warranty-badge">Covered</span>
            </div>

            <div className="warranty-card">
              <div className="warranty-card-icon">📱</div>
              <h4>Software Issues</h4>
              <p>Factory software and firmware related issues are covered under warranty.</p>
              <span className="warranty-badge">Covered</span>
            </div>

            <div className="warranty-card not-covered">
              <div className="warranty-card-icon">💧</div>
              <h4>Water Damage</h4>
              <p>Damage caused by liquid exposure or moisture is not covered.</p>
              <span className="warranty-badge not">Not Covered</span>
            </div>

            <div className="warranty-card not-covered">
              <div className="warranty-card-icon">🔨</div>
              <h4>Physical Damage</h4>
              <p>Accidental drops, cracks, or damage caused by misuse is not covered.</p>
              <span className="warranty-badge not">Not Covered</span>
            </div>

            <div className="warranty-card not-covered">
              <div className="warranty-card-icon">🔓</div>
              <h4>Unauthorized Repairs</h4>
              <p>Products repaired or modified by unauthorized persons void the warranty.</p>
              <span className="warranty-badge not">Not Covered</span>
            </div>
          </div>
        </div>

        {/* Warranty Periods */}
        <div className="warranty-periods-section">
          <h2>Warranty Periods by Category</h2>
          <div className="warranty-table">
            <div className="warranty-table-header">
              <span>Product Category</span>
              <span>Warranty Period</span>
              <span>Coverage Type</span>
            </div>
            <div className="warranty-table-row">
              <span>Mobile Phones & Tablets</span>
              <span>12 Months</span>
              <span className="coverage-full">Full Coverage</span>
            </div>
            <div className="warranty-table-row">
              <span>Laptops & Computers</span>
              <span>12 Months</span>
              <span className="coverage-full">Full Coverage</span>
            </div>
            <div className="warranty-table-row">
              <span>Home Appliances</span>
              <span>24 Months</span>
              <span className="coverage-full">Full Coverage</span>
            </div>
            <div className="warranty-table-row">
              <span>Audio & Visual</span>
              <span>6 Months</span>
              <span className="coverage-limited">Limited Coverage</span>
            </div>
            <div className="warranty-table-row">
              <span>Accessories & Cables</span>
              <span>3 Months</span>
              <span className="coverage-limited">Limited Coverage</span>
            </div>
            <div className="warranty-table-row">
              <span>Batteries & Chargers</span>
              <span>3 Months</span>
              <span className="coverage-limited">Limited Coverage</span>
            </div>
          </div>
        </div>

        {/* How to Claim */}
        <div className="warranty-claim-section">
          <h2>How to Claim Warranty</h2>
          <div className="warranty-claim-steps">
            <div className="claim-step">
              <div className="claim-number">01</div>
              <div className="claim-info">
                <h4>Contact Support</h4>
                <p>Reach out to us via email or phone with your order number and issue description.</p>
              </div>
            </div>
            <div className="claim-step">
              <div className="claim-number">02</div>
              <div className="claim-info">
                <h4>Submit Evidence</h4>
                <p>Send photos or videos of the defective product for initial assessment.</p>
              </div>
            </div>
            <div className="claim-step">
              <div className="claim-number">03</div>
              <div className="claim-info">
                <h4>Ship the Product</h4>
                <p>Send the product to our service center with original packaging if possible.</p>
              </div>
            </div>
            <div className="claim-step">
              <div className="claim-number">04</div>
              <div className="claim-info">
                <h4>Repair or Replace</h4>
                <p>We will repair or replace your product and return it to you within 7-14 days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="warranty-faq-section">
          <h2>Warranty FAQs</h2>
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`warranty-faq-item ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="warranty-faq-question"
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <span className="warranty-faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="warranty-faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Box */}
        <div className="warranty-contact-box">
          <h3>Warranty Claim Support</h3>
          <p>Have a warranty issue? Our team is here to help you.</p>
          <div className="warranty-contact-info">
            <span>📧 info@nettecelectronic.lk</span>
            <span>📞 +94 11 234 5678</span>
            <span>📍 Kottawa road, Colombo, Sri Lanka</span>
          </div>
          <a href="/contact" className="warranty-contact-btn">Contact Us</a>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default WarrantyPolicy;