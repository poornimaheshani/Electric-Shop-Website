import React, { useState } from "react";
import { Zap, Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "#061523",
    borderBottom: "1px solid #102a43",
    color: "white",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80px",
  };

  const logoStyle = {
    fontWeight: "bold",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const zapIconWrapper = {
    backgroundColor: "#ffec1f",
    padding: "6px",
    borderRadius: "50%",
    marginRight: "8px",
  };

  const logoSpanStyle = {
    color: "#ffec1f",
  };

  const desktopMenuStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const searchWrapper = {
    position: "relative",
  };

  const searchInputStyle = {
    padding: "8px 12px 8px 36px",
    borderRadius: "999px",
    border: "1px solid #486581",
    backgroundColor: "#243b53",
    color: "#e2e8f0",
    outline: "none",
  };

  const iconStyle = {
    cursor: "pointer",
    marginLeft: "10px",
  };

  const mobileMenuStyle = {
    backgroundColor: "#102a43",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const mobileMenuItemStyle = {
    color: "white",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "8px",
    margin: 0,
  };

  const mobileButtonStyle = {
    display: "flex",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>

        {/* Logo */}
        <div style={logoStyle} onClick={() => navigate("/")}>
          <div style={zapIconWrapper}>
            <Zap style={{ height: "24px", width: "24px", color: "#061523" }} />
          </div>
          <span>
            NetTec <span style={logoSpanStyle}>Electronic</span>
          </span>
        </div>

        {/* Desktop Search */}
        <div style={{ ...desktopMenuStyle, flex: 1, maxWidth: "400px" }}>
          <div style={searchWrapper}>
            <Search
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
              }}
            />
            <input
              type="text"
              placeholder="Search products..."
              style={searchInputStyle}
            />
          </div>
        </div>

        {/* Desktop Icons */}
        <div style={desktopMenuStyle}>

          {/* Wishlist */}
          <Heart
            style={iconStyle}
            onClick={() => navigate("/wishlist")}
          />

          {/* Cart */}
          <ShoppingCart
            style={iconStyle}
            onClick={() => navigate("/addtocart")}
          />

          {/* Profile */}
          <User
            style={iconStyle}
            onClick={() => navigate("/profile")}
          />

        </div>

        {/* Mobile Menu Button */}
        <div style={{ display: "flex" }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={mobileButtonStyle}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={mobileMenuStyle}
          >
            <p style={mobileMenuItemStyle} onClick={() => { navigate("/"); setIsMenuOpen(false); }}>
              🏠 Home
            </p>
            <p style={mobileMenuItemStyle} onClick={() => { navigate("/products"); setIsMenuOpen(false); }}>
              📦 Categories
            </p>
            <p style={mobileMenuItemStyle} onClick={() => { navigate("/products"); setIsMenuOpen(false); }}>
              🛒 Products
            </p>
            <p style={mobileMenuItemStyle} onClick={() => { navigate("/aboutus"); setIsMenuOpen(false); }}>
              ℹ️ About Us
            </p>
            <p style={mobileMenuItemStyle} onClick={() => { navigate("/contact"); setIsMenuOpen(false); }}>
              📞 Contact
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}