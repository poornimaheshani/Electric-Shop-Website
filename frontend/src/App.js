import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails"; 
import AddToCart from "./pages/AddToCart";
import Checkout from "./pages/Checkout";
import ReviewRecommendations from "./pages/ReviewRecommendations";
import AboutUs from "./pages/aboutus";
import Contactus from "./pages/contactus";
import Profile from "./pages/profile";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TrackOrder from "./pages/TrackOrder";
import ReturnsExchanges from "./pages/ReturnsExchanges";
import WarrantyPolicy from "./pages/WarrantyPolicy";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/review-recommendations" element={<ReviewRecommendations />} />
        <Route path="/account-dashboard" element={<Navigate to="/profile" replace />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
        <Route path="/warranty-policy" element={<WarrantyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
