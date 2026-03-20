import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, Lock, ArrowRight, Zap } from "lucide-react";
import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();

  const handleScroll = () => {
    const section = document.getElementById("featured-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-image"></div>
      <div className="hero-gradient-overlay"></div>
      <div className="hero-pattern-overlay"></div>

      <div className="hero-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-badge">
            <Zap size={16} />
            Sri Lanka's #1 Electronics Store
          </div>

          <h1 className="hero-heading">
            Powering Sri Lanka with <br />
            <span className="hero-highlight">Quality Electronics</span>
          </h1>

          <p className="hero-paragraph">
            Your trusted destination for electrical and electronic products at
            affordable prices.
          </p>

          {/* ✅ Buttons Fixed */}
          <div className="hero-buttons">
            <button
  className="btn-primary"
  onClick={() => {
    const section = document.getElementById("featured-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Shop Now <ArrowRight size={18} />
</button>


            <button
              className="btn-secondary"
              onClick={() => navigate("/products")}
            >
              View Products
            </button>
          </div>

          <div className="hero-trust-grid">
            <div className="trust-item">
              <ShieldCheck size={28} color="#ffec1f" />
              <div>
                <strong>Quality Guaranteed</strong>
                <p>100% Genuine Products</p>
              </div>
            </div>

            <div className="trust-item">
              <Truck size={28} color="#ffec1f" />
              <div>
                <strong>Fast Delivery</strong>
                <p>Island-wide Shipping</p>
              </div>
            </div>

            <div className="trust-item">
              <Lock size={28} color="#ffec1f" />
              <div>
                <strong>Secure Payments</strong>
                <p>Cash on Delivery & Cards</p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      <div className="hero-glow"></div>
    </section>
  );
}

export default HeroSection;
