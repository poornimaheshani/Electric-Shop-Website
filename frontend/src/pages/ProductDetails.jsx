import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/product-detail.css";

const API_BASE_URL = "http://localhost:5002";

export default function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const normalizeProduct = (data) => {
    if (!data || typeof data !== "object") {
      return null;
    }

    return {
      ...data,
      status: data.status || (Number(data.stock) > 0 ? "In Stock" : "Out of Stock"),
      created_at: data.created_at || new Date().toISOString(),
    };
  };

  const incQty = () => setQty((q) => Math.min(99, q + 1));
  const decQty = () => setQty((q) => Math.max(1, q - 1));

  // Database එකෙන් product data ගන්නවා
  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error("Backend did not return JSON. Restart the backend and verify /api/products/:id exists.");
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load product");
        }

        if (isMounted) {
          setProduct(normalizeProduct(data));
        }
      } catch (err) {
        console.log("Failed to load product details:", err.message);

        if (isMounted) {
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return (
    <div className="pd-page">
      <Navbar />
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p>Loading...</p>
      </div>
      <Footer />
    </div>
  );

  if (!product || product.message) return (
    <div className="pd-page">
      <Navbar />
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p>Product not found</p>
        <button onClick={() => navigate('/products')}
          style={{
            marginTop: '16px',
            background: '#FFC107',
            padding: '10px 24px',
            borderRadius: '8px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer'
          }}>
          Back to Products
        </button>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="pd-page">
      <Navbar />

      <main className="pd-container pd-main">

        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <a className="pd-breadcrumb-link" href="/">Home</a>
          <span className="material-symbols-outlined pd-breadcrumb-sep">chevron_right</span>
          <a className="pd-breadcrumb-link" href="/products">Shop</a>
          <span className="material-symbols-outlined pd-breadcrumb-sep">chevron_right</span>
          <span className="pd-breadcrumb-current">{product.name}</span>
        </nav>

        <div className="pd-grid">

          {/* LEFT - Image */}
          <div className="pd-gallery">
            <div className="pd-hero">
              <img
                className="pd-hero-img"
                src={product.image
                  ? `${API_BASE_URL}/uploads/${product.image}`
                  : '/no-image.png'}
                alt={product.name}
              />
            </div>
          </div>

          {/* RIGHT - Info */}
          <div className="pd-info">

            <div className="pd-stock">
              <span className="pd-stock-badge">
                <span className="pd-dot" /> {product.status}
              </span>
            </div>

            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating-row">
              <span className="pd-sku">Category: {product.category}</span>
            </div>

            {/* Price */}
            <div className="pd-price-box">
              <div className="pd-price-line">
                <span className="pd-price">
                  LKR {Number(product.price).toLocaleString()}
                </span>
              </div>
              <p className="pd-tax">Inclusive of VAT</p>
            </div>

            {/* Stock Info */}
            <div className="pd-specs">
              <h3 className="pd-h3">Product Details</h3>
              <div className="pd-specs-list">

                <div className="pd-spec">
                  <div className="pd-spec-icon">
                    <span className="material-symbols-outlined pd-primary">inventory</span>
                  </div>
                  <p className="pd-spec-text">Stock: {product.stock} units available</p>
                </div>

                <div className="pd-spec">
                  <div className="pd-spec-icon">
                    <span className="material-symbols-outlined pd-primary">category</span>
                  </div>
                  <p className="pd-spec-text">Category: {product.category}</p>
                </div>

                <div className="pd-spec">
                  <div className="pd-spec-icon">
                    <span className="material-symbols-outlined pd-primary">calendar_today</span>
                  </div>
                  <p className="pd-spec-text">
                    Added: {new Date(product.created_at).toLocaleDateString('en-GB')}
                  </p>
                </div>

              </div>
            </div>

            {/* Quantity + Buttons */}
            <div className="pd-actions">

              <div className="pd-qty-wrap">
                <span className="pd-qty-label">Quantity</span>
                <div className="pd-qty">
                  <button onClick={decQty} className="pd-qty-btn">−</button>
                  <span className="pd-qty-value">{qty}</span>
                  <button onClick={incQty} className="pd-qty-btn pd-primary">+</button>
                </div>
              </div>

              <div className="pd-cta">
                <button
                  className="pd-btn pd-btn-primary"
                  onClick={() => navigate('/addtocart')}>
                  Add to Cart
                </button>
                <button className="pd-btn pd-btn-dark">
                  Buy Now
                </button>
              </div>

              <div className="pd-assurance">
                <div className="pd-assurance-item">
                  <span className="material-symbols-outlined pd-muted">verified</span>
                  <span>Certified Quality</span>
                </div>
                <div className="pd-assurance-item">
                  <span className="material-symbols-outlined pd-muted">workspace_premium</span>
                  <span>Manufacturer Warranty</span>
                </div>
                <div className="pd-assurance-item">
                  <span className="material-symbols-outlined pd-muted">local_shipping</span>
                  <span>Islandwide Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}