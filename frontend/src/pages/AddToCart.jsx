import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/cart.css";

export default function Cart() {
  const navigate = useNavigate();
  // Mock cart data 
  const [items, setItems] = useState([
    
    {
      id: "copper-wire-100m",
      title: "Premium 2.5 mm² Multi-Strand Copper Cable (100 m)",
      category: "Electrical",
      color: "Copper",
      price: 8750,
      qty: 1,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRmM1Yp5LV0bATGxIAFUQkuC-Lu95KvQ_gAwufPd8LdSmuuvGc053feXg-23IK8aStNnQykXwsURUVcpjs2bpC5NjZll_Fqvi_iNN9f6JlCbGDi_XYnlOWVBrtH9S_L32uvKcjGx6O36WHTlL1mxLyEOn4cWBjhvswhX2pfr0yzC9wT1RxgU5wWaICiFe47sbFQzHKoSx6uF8pzcW5226uE0RtuzGBDlA_Uijg6l5RwFwGffpKAmk8hC1phb33SqPh2UxsKkMj_PY", 
    },
  ]);

  const VAT_RATE = 0.15;

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const tax = useMemo(() => Math.round(subtotal * VAT_RATE), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const fmt = (n) =>
    `LKR ${n.toLocaleString("en-LK", { maximumFractionDigits: 0 })}`;

  const inc = (id) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.min(99, it.qty + 1) } : it
      )
    );

  const dec = (id) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="cart-page bg--light text--light">
      <Navbar />

      <main className="container main">
        <h2 className="page-title">Your Shopping Cart</h2>

        <div className="layout">
          {/* Left: Items */}
          <section className="items-col">
            <div className="table-head">
              <div className="th th-product">Product Details</div>
              <div className="th th-qty">Quantity</div>
              <div className="th th-price">Price</div>
              <div className="th th-subtotal">Subtotal</div>
            </div>

            {items.map((it) => {
              const sub = it.price * it.qty;
              return (
                <div key={it.id} className="item-card">
                  <div className="item-left">
                    <div
                      className="item-thumb"
                      style={{ backgroundImage: `url('${it.img}')` }}
                      aria-label={it.title}
                      role="img"
                    />
                    <div className="item-info">
                      <h3 className="item-title">{it.title}</h3>
                      <p className="item-meta">Category: {it.category}</p>
                      <p className="item-meta">Color: {it.color}</p>
                    </div>
                  </div>

                  <div className="item-qty">
                    <div className="qty-chip">
                      <button
                        className="qty-btn"
                        onClick={() => dec(it.id)}
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined sm">
                          remove
                        </span>
                      </button>
                      <span className="qty-value">{it.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => inc(it.id)}
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined sm">add</span>
                      </button>
                    </div>
                  </div>

                  <div className="item-price">
                    <p className="price">{fmt(it.price)}</p>
                  </div>

                  <div className="item-sub">
                    <span className="sub-label">Subtotal:</span>
                    <p className="sub-value">{fmt(sub)}</p>
                    <button
                      className="delete-btn"
                      onClick={() => removeItem(it.id)}
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Right: Summary */}
          <aside className="summary-col">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-lines">
                <div className="line">
                  <span>Subtotal</span>
                  <span className="emph">{fmt(subtotal)}</span>
                </div>
                <div className="line">
                  <span>Shipping Fee</span>
                  <span className="free">FREE</span>
                </div>
                <div className="line">
                  <span>Tax (VAT 15%)</span>
                  <span className="emph">{fmt(tax)}</span>
                </div>
                <div className="line total">
                  <span className="total-label">Total Amount</span>
                  <div className="total-right">
                    <p className="total-value primary-text">{fmt(total)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="coupon">
              <label className="coupon-label">Coupon Code</label>
              <div className="coupon-row">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="coupon-input"
                />
                <button className="coupon-apply" type="button">
                  Apply
                </button>
              </div>
            </div>

            <button
  className="btn-checkout"
  type="button"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
  <span className="material-symbols-outlined">payments</span>
</button>

            <div className="secure">
              <span className="material-symbols-outlined xl">verified_user</span>
              <span className="secure-text">Secure SSL Encrypted Checkout</span>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}