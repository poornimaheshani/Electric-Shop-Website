import React, { useEffect, useState } from "react";
import "./FeaturedProducts.css";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5002";

export function FeaturedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        // only show first 6 products
        setProducts(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <div className="featured-container">

        {/* Header */}
        <div className="featured-header">
          <div>
            <h2>
              Featured <span>Products</span>
            </h2>
            <p>Hand-picked selection of our best-selling electronics and electrical supplies.</p>
          </div>
          <a href="/products" className="view-all">View All Products →</a>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">

              {/* Product Image */}
              <div className="product-image">
                <img
                  src={`${API_BASE_URL}/uploads/${product.image}`}
                  alt={product.name}
                  className="product-img"
                  onError={(e) => { e.target.src = "/no-image.png"; }}
                />

                {product.discount > 0 && (
                  <div className="discount-badge">-{product.discount}% OFF</div>
                )}

                <div className="quick-actions">
                  <button className="icon-btn" aria-label="Add to Wishlist">
                    <Heart size={18} />
                  </button>
                  <button className="icon-btn" aria-label="Add to Cart">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="product-footer">
                  <div>
                    <span className="price-label">Price</span>
                    <span className="price">LKR {Number(product.price).toLocaleString()}.00</span>
                  </div>
                  <button
                    className="buy-btn"
                    onClick={() => navigate(`/product-details/${product.id}`)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}