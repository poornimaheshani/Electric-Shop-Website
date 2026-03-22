import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/ReturnsExchanges.css";

const ReturnsExchanges = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const policies = [
    {
      title: "Return Eligibility",
      content:
        "Products can be returned within 7 days of delivery. Items must be unused, in original packaging, and in the same condition as received. Products with broken seals, missing accessories, or physical damage will not be accepted.",
    },
    {
      title: "Non-Returnable Items",
      content:
        "The following items cannot be returned: software products once opened, consumable items, products damaged due to misuse, items without original packaging or accessories.",
    },
    {
      title: "Exchange Policy",
      content:
        "We offer exchanges for defective or damaged products received. Exchange requests must be made within 7 days of delivery. The replacement product will be dispatched after we receive and inspect the returned item.",
    },
    {
      title: "Refund Process",
      content:
        "Once your return is received and inspected, we will notify you of the approval or rejection. Approved refunds will be processed within 5-7 business days to your original payment method.",
    },
    {
      title: "Return Shipping",
      content:
        "If the return is due to our error (wrong or defective item), we will cover the return shipping cost. For other returns, the customer is responsible for the shipping cost.",
    },
  ];

  return (
    <div className="returns-page">
      <Navbar />

      {/* Hero */}
      <div className="returns-hero">
        <div className="returns-hero-content">
          <h1>Returns & <span>Exchanges</span></h1>
          <p>Simple and hassle-free returns for your peace of mind.</p>
        </div>
      </div>

      <div className="returns-container">

        {/* Steps */}
        <div className="returns-steps-section">
          <h2>How to Return an Item</h2>
          <div className="returns-steps-grid">
            <div className="returns-step-card">
              <div className="step-number">01</div>
              <h4>Contact Us</h4>
              <p>Email us at info@nettecelectronic.lk with your order number and reason for return.</p>
            </div>
            <div className="returns-step-card">
              <div className="step-number">02</div>
              <h4>Pack the Item</h4>
              <p>Pack the item securely in its original packaging with all accessories included.</p>
            </div>
            <div className="returns-step-card">
              <div className="step-number">03</div>
              <h4>Ship It Back</h4>
              <p>Send the package to our address. Keep the tracking number for reference.</p>
            </div>
            <div className="returns-step-card">
              <div className="step-number">04</div>
              <h4>Get Refund</h4>
              <p>Once we receive and inspect the item, your refund will be processed within 5-7 days.</p>
            </div>
          </div>
        </div>

        {/* Policy Accordion */}
        <div className="returns-policy-section">
          <h2>Return Policies</h2>
          {policies.map((item, index) => (
            <div
              key={index}
              className={`returns-item ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="returns-question"
                onClick={() => toggle(index)}
              >
                <span>{item.title}</span>
                <span className="returns-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="returns-answer">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conditions */}
        <div className="returns-conditions">
          <div className="conditions-card accepted">
            <h3>✓ We Accept Returns If</h3>
            <ul>
              <li>Item is unused and in original condition</li>
              <li>Original packaging and accessories included</li>
              <li>Return requested within 7 days of delivery</li>
              <li>Item is defective or damaged on arrival</li>
              <li>Wrong item was delivered</li>
            </ul>
          </div>
          <div className="conditions-card rejected">
            <h3>✕ We Do Not Accept If</h3>
            <ul>
              <li>Item has been used or damaged by customer</li>
              <li>Original packaging is missing</li>
              <li>Return requested after 7 days</li>
              <li>Item is a non-returnable product</li>
              <li>Serial number or label is removed</li>
            </ul>
          </div>
        </div>

        {/* Contact Box */}
        <div className="returns-contact-box">
          <h3>Need Help with a Return?</h3>
          <p>Our support team is ready to assist you with your return or exchange request.</p>
          <div className="returns-contact-info">
            <span>📧 info@nettecelectronic.lk</span>
            <span>📞 +94 11 234 5678</span>
            <span>💬 +94 77 123 4567</span>
          </div>
          <a href="/contact" className="returns-contact-btn">Contact Us</a>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ReturnsExchanges;