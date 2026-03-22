import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <Navbar />

      <div className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>Privacy <span>Policy</span></h1>
          <p>Last updated: March 2026</p>
        </div>
      </div>

      <div className="privacy-container">

        <div className="privacy-intro">
          <p>
            At <strong>NetTec Electronic</strong>, we are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains how we collect,
            use, and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">01</span> Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Full name, email address, and phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment information (processed securely)</li>
            <li>Order history and preferences</li>
            <li>Messages sent via our contact form</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">02</span> How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and delivery updates</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send promotional offers and newsletters (only if you opt in)</li>
            <li>Improve our website and customer experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">03</span> Information Sharing</h2>
          <p>
            We do <strong>not</strong> sell, trade, or rent your personal information to third parties.
            We may share your information only with:
          </p>
          <ul>
            <li>Delivery partners to fulfill your orders</li>
            <li>Payment processors to handle transactions securely</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">04</span> Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect
            your personal information against unauthorized access, alteration, disclosure,
            or destruction. All payment transactions are encrypted using SSL technology.
          </p>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">05</span> Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience. Cookies help us
            remember your preferences and understand how you use our site. You can choose
            to disable cookies through your browser settings, though this may affect
            some website functionality.
          </p>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">06</span> Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">07</span> Third Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible
            for the privacy practices or content of those sites. We encourage you to
            review their privacy policies before providing any personal information.
          </p>
        </div>

        <div className="privacy-section">
          <h2><span className="section-number">08</span> Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be
            posted on this page with an updated revision date. We encourage you to
            review this policy periodically.
          </p>
        </div>

        <div className="privacy-contact-box">
          <h3>Questions about our Privacy Policy?</h3>
          <p>If you have any questions or concerns, please contact us.</p>
          <div className="privacy-contact-details">
            <span>📧 info@nettecelectronic.lk</span>
            <span>📞 +94 11 234 5678</span>
            <span>📍 Kottawa road, Colombo, Sri Lanka</span>
          </div>
          <a href="/contact" className="privacy-contact-btn">Contact Us</a>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;