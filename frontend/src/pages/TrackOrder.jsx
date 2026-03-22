import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/TrackOrder.css";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = () => {
    if (orderNumber && email) {
      setSearched(true);
    }
  };

  return (
    <div className="track-page">
      <Navbar />

      {/* Hero */}
      <div className="track-hero">
        <div className="track-hero-content">
          <h1>Track Your <span>Order</span></h1>
          <p>Enter your order details below to track your delivery status.</p>
        </div>
      </div>

      <div className="track-container">

        {/* Search Box */}
        <div className="track-search-box">
          <h2>Order Tracking</h2>
          <p>Please enter your Order Number and Email Address to track your order.</p>

          <div className="track-form">
            <div className="track-input-group">
              <label>Order Number</label>
              <input
                type="text"
                placeholder="e.g. NTE-20260001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>

            <div className="track-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="track-btn" onClick={handleTrack}>
              Track Order
            </button>
          </div>
        </div>

        {/* Result - shows after search */}
        {searched && (
          <div className="track-result">
            <div className="track-result-header">
              <h3>Order #{orderNumber}</h3>
              <span className="track-status-badge">In Transit</span>
            </div>

            <div className="track-steps">
              <div className="track-step completed">
                <div className="step-icon">✓</div>
                <div className="step-info">
                  <h4>Order Placed</h4>
                  <p>Your order has been received and confirmed.</p>
                </div>
              </div>

              <div className="track-step completed">
                <div className="step-icon">✓</div>
                <div className="step-info">
                  <h4>Processing</h4>
                  <p>Your order is being prepared for shipment.</p>
                </div>
              </div>

              <div className="track-step active">
                <div className="step-icon">→</div>
                <div className="step-info">
                  <h4>In Transit</h4>
                  <p>Your order is on the way to your address.</p>
                </div>
              </div>

              <div className="track-step">
                <div className="step-icon">📦</div>
                <div className="step-info">
                  <h4>Delivered</h4>
                  <p>Package delivered to your address.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="track-info-grid">
          <div className="track-info-card">
            <div className="info-icon">📧</div>
            <h4>Check Your Email</h4>
            <p>A tracking confirmation email is sent after your order is shipped.</p>
          </div>

          <div className="track-info-card">
            <div className="info-icon">📞</div>
            <h4>Call Us</h4>
            <p>Contact our support team at +94 11 234 5678 for order updates.</p>
          </div>

          <div className="track-info-card">
            <div className="info-icon">💬</div>
            <h4>WhatsApp</h4>
            <p>Message us on WhatsApp at +94 77 123 4567 for quick assistance.</p>
          </div>
        </div>

        {/* Need Help */}
        <div className="track-help-box">
          <h3>Need Help with Your Order?</h3>
          <p>Our customer support team is available to assist you.</p>
          <a href="/contact" className="track-help-btn">Contact Support</a>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default TrackOrder;