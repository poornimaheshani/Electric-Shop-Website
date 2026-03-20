import React from "react";
import "./Footer.css";
import {
  Zap,
  Facebook,
  Instagram,
  MessageCircle,
  CreditCard,
  Banknote,
  Wallet,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">
                <Zap size={18} />
              </div>
              <span>
                NetTec <span className="highlight">Electronic</span>
              </span>
            </div>

            <p>
              Your trusted partner for all electrical and electronic needs in
              Sri Lanka. Quality products, affordable prices, and excellent
              service guaranteed.
            </p>

            <div className="social-icons">
              <a href="#"><Facebook size={18} /></a>
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><MessageCircle size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop All</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="/aboutus">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Track Your Order</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Warranty Policy</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3>Stay Connected</h3>
            <p className="newsletter-text">
              Subscribe to our newsletter for latest updates and offers.
            </p>

            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2026 NetTec Electronic. All Rights Reserved.</p>

          <div className="payment-methods">
            <div><Banknote size={14} /> Cash on Delivery</div>
            <div><CreditCard size={14} /> Bank Transfer</div>
            <div><Wallet size={14} /> Online Payment</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
