import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/Product.css";

export default function Products() {

  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5002/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  // URL category param check කරන්න
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("All");
    }
  }, [location.search]);

  // Get unique categories from database
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="page">

      <Navbar />

      <main className="container main">

        {/* Page Header */}
        <section className="intro">

          <nav className="breadcrumb">
            <a className="breadcrumb-link" href="/">Home</a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">
              {selectedCategory === "All" ? "Shop" : selectedCategory}
            </span>
          </nav>

          <div className="intro-head">
            <h1 className="intro-title">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h1>
            <p className="intro-sub">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

        </section>

        <div className="layout">

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="panel">
              <h3 className="panel-title">Categories</h3>
              <ul className="list">
                {categories.map((cat) => (
                  <li key={cat}>
                    <span
                      className={`cat-link ${selectedCategory === cat ? "is-active" : ""}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        if (cat === "All") {
                          navigate("/products");
                        } else {
                          navigate(`/products?category=${encodeURIComponent(cat)}`);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <span>{cat}</span>
                      <span className={`count ${selectedCategory === cat ? "active" : ""}`}>
                        {cat === "All"
                          ? products.length
                          : products.filter(p => p.category === cat).length}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="content">

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <article
                    className="product-card"
                    key={product.id}
                    onClick={() => navigate(`/product-details/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="ratio-box">
                      <img
                        className="media-img"
                        src={`http://localhost:5002/uploads/${product.image}`}
                        alt={product.name}
                      />
                      <div className="wishlist">
                        <button className="wish-btn">
                          <span className="material-symbols-outlined">
                            favorite
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <span className="eyebrow">
                        {product.category}
                      </span>

                      <h4 className="prod-title clamp-2">
                        {product.name}
                      </h4>

                      <div className="rating-row">
                        <div className="stars">
                          <span className="material-symbols-outlined star fill">star</span>
                          <span className="material-symbols-outlined star fill">star</span>
                          <span className="material-symbols-outlined star fill">star</span>
                          <span className="material-symbols-outlined star fill">star</span>
                          <span className="material-symbols-outlined star">star_half</span>
                        </div>
                        <span className="rating-count">(0)</span>
                      </div>

                      <div className="buy-row">
                        <span className="price">
                          LKR {product.price}
                        </span>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product-details/${product.id}`);
                          }}
                        >
                          <span className="material-symbols-outlined">
                            shopping_cart
                          </span>
                          Add to Cart
                        </button>
                      </div>
                    </div>

                  </article>
                ))}
              </div>
            )}

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}