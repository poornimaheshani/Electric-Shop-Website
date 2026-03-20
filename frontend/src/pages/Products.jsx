import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/Product.css";

export default function Products() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
  fetch("http://localhost:5002/api/products")
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.log(err));
}, []);

  return (
    <div className="page">

      <Navbar />

      <main className="container main">

        {/* Page Header */}
        <section className="intro">

          <nav className="breadcrumb">
            <a className="breadcrumb-link" href="#">Home</a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Shop</span>
          </nav>

          <div className="intro-head">
            <h1 className="intro-title">All Products</h1>
            <p className="intro-sub">
              Browse our extensive collection of high-quality electronic components.
            </p>
          </div>

        </section>


        <div className="layout">

          {/* Sidebar */}
          <aside className="sidebar">

            <div className="panel">
              <h3 className="panel-title">Categories</h3>

              <ul className="list">
                <li>LED Lighting</li>
                <li>Solar Panels</li>
                <li>Inverters</li>
                <li>Cables</li>
                <li>Batteries</li>
              </ul>

            </div>

          </aside>


          {/* Product Grid */}
          <section className="content">

            <div className="products-grid">

              {products.map(product => (

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

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}