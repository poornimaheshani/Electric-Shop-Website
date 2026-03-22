import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/FAQs.css";

const faqData = [
  {
    category: "Orders & Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept Cash on Delivery, Bank Transfer, and Online Payment methods."
      },
      {
        question: "Can I cancel my order after placing it?",
        answer: "Yes, you can cancel your order within 24 hours of placing it by contacting our support team."
      },
      {
        question: "How do I track my order?",
        answer: "Once your order is shipped, you will receive a tracking number via email or SMS."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 3-5 business days. Express delivery is available for Colombo area within 24 hours."
      },
      {
        question: "Do you deliver island-wide?",
        answer: "Yes, we deliver to all parts of Sri Lanka."
      },
      {
        question: "Is there a delivery charge?",
        answer: "Free delivery for orders above Rs. 5,000. A delivery fee of Rs. 350 applies for orders below that."
      }
    ]
  },
  {
    category: "Returns & Warranty",
    items: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 7 days of delivery if the product is unused and in original packaging."
      },
      {
        question: "How do I return a product?",
        answer: "Contact our support team at info@nettecelectronic.lk with your order number and reason for return."
      },
      {
        question: "Do products come with warranty?",
        answer: "Yes, all our products come with manufacturer warranty. Duration varies by product."
      }
    ]
  },
  {
    category: "Products",
    items: [
      {
        question: "Are your products genuine?",
        answer: "Yes, all products sold on NetTec Electronic are 100% genuine and sourced from authorized distributors."
      },
      {
        question: "Can I request a product that is not listed?",
        answer: "Yes! Contact us via WhatsApp or email and we will try our best to source it for you."
      }
    ]
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let counter = 0;

  return (
    <div className="faqs-page">
      <Navbar />

      <div className="faqs-hero">
        <div className="faqs-hero-content">
          <h1>Frequently Asked <span>Questions</span></h1>
          <p>Find answers to the most common questions about our products and services.</p>
        </div>
      </div>

      <div className="faqs-container">
        {faqData.map((section, sIndex) => (
          <div key={sIndex} className="faq-section">
            <h2 className="faq-category">{section.category}</h2>
            {section.items.map((item, iIndex) => {
              const globalIndex = counter++;
              return (
                <div
                  key={iIndex}
                  className={`faq-item ${openIndex === globalIndex ? "open" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggle(globalIndex)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon">{openIndex === globalIndex ? "−" : "+"}</span>
                  </button>
                  {openIndex === globalIndex && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div className="faq-contact-box">
          <h3>Still have questions?</h3>
          <p>Can't find the answer you're looking for? Contact our support team.</p>
          <a href="/contact" className="faq-contact-btn">Contact Us</a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQs;