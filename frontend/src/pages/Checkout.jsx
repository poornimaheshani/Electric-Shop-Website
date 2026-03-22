import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const [items] = useState([
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

  const SHIPPING_FEE = 0;
  const VAT_RATE = 0.15;

  const subTotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const tax = useMemo(() => Math.round(subTotal * VAT_RATE), [subTotal]);
  const total = useMemo(() => subTotal + SHIPPING_FEE + tax, [subTotal, tax]);

  const fmt = (n) =>
    `LKR ${n.toLocaleString("en-LK", { maximumFractionDigits: 0 })}`;

  // Stepper
  const currentStep = 3;
  const progressPct = useMemo(() => {
    const map = { 1: 0, 2: 33, 3: 66, 4: 100 };
    return map[currentStep] ?? 0;
  }, [currentStep]);

  // Payment method selection
  const [method, setMethod] = useState("card"); 

  // Place Order
  const handlePlaceOrder = () => {
    alert("Order placed successfully! 🎉");
    navigate("/review-recommendations");
  };

  return (
    <div className="co-page">
      {/* HEADER */}
      <Navbar />

      {/* STEPPER */}
      <nav className="co-steps">
        <div className="co-steps-wrap co-container-narrow">
          <div className="co-steps-bar-bg" />
          <div
            className="co-steps-bar-fill"
            style={{ width: `${progressPct}%` }}
          />
          {/* Step 1 */}
          <div className="co-step">
            <div className="co-step-dot co-step-done">
              <span className="material-symbols-outlined co-navy">check</span>
            </div>
            <span className="co-step-label co-step-active">Cart</span>
          </div>
          {/* Step 2 */}
          <div className="co-step">
            <div className="co-step-dot co-step-done">
              <span className="material-symbols-outlined co-navy">check</span>
            </div>
            <span className="co-step-label co-step-active">Payment</span>
          </div>
          {/* Step 3 */}
          <div className="co-step">
            <div className="co-step-dot co-step-current">
              <span className="co-step-num">3</span>
            </div>
            <span className="co-step-label co-step-active">Shipping</span>
          </div>
          {/* Step 4 */}
          <div className="co-step">
            <div className="co-step-dot co-step-upcoming">
              <span className="co-step-num co-muted">4</span>
            </div>
            <span className="co-step-label co-step-inactive">Review</span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="co-container co-main">
        <div className="co-layout">
          <div className="co-left">
            {/* Shipping Information */}
            <section className="co-card">
              <div className="co-card-head">
                <h2 className="co-h2">
                  <span className="material-symbols-outlined co-muted">
                    location_on
                  </span>
                  Shipping Information
                </h2>
              </div>

              <div className="co-card-body">
                <div className="co-grid2 co-gap6">
                  <div className="co-col-2">
                    <label className="co-label">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="co-input"
                    />
                  </div>

                  <div>
                    <label className="co-label">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+94 77 123 4567"
                      className="co-input"
                    />
                  </div>

                  <div>
                    <label className="co-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      className="co-input"
                    />
                  </div>

                  <div className="co-col-2">
                    <label className="co-label">Address</label>
                    <input
                      type="text"
                      placeholder="House No, Street Name"
                      className="co-input"
                    />
                  </div>

                  <div>
                    <label className="co-label">City</label>
                    <select className="co-input">
                      <option>Colombo</option>
                      <option>Kandy</option>
                      <option>Galle</option>
                      <option>Gampaha</option>
                      <option>Negombo</option>
                    </select>
                  </div>

                  <div>
                    <label className="co-label">Postal Code</label>
                    <input type="text" placeholder="00000" className="co-input" />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="co-card">
              <div className="co-card-head">
                <h2 className="co-h2">
                  <span className="material-symbols-outlined co-muted">
                    account_balance_wallet
                  </span>
                  Payment Method
                </h2>
              </div>

              <div className="co-card-body">
                <div className="co-grid3 co-gap6 co-mb8">
                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={`co-pay-card ${
                      method === "card" ? "co-pay-card--active" : ""
                    }`}
                    aria-pressed={method === "card"}
                  >
                    {method === "card" && (
                      <div className="co-pay-check">
                        <span className="material-symbols-outlined co-primary">
                          check_circle
                        </span>
                      </div>
                    )}
                    <span className="material-symbols-outlined co-navy co-xxl">
                      credit_card
                    </span>
                    <h3 className="co-pay-title co-navy">Card</h3>
                    <p className="co-pay-desc">Credit / Debit Card</p>
                  </button>

                  {/* Bank */}
                  <button
                    type="button"
                    onClick={() => setMethod("bank")}
                    className={`co-pay-card ${
                      method === "bank" ? "co-pay-card--active" : ""
                    }`}
                    aria-pressed={method === "bank"}
                  >
                    {method === "bank" && (
                      <div className="co-pay-check">
                        <span className="material-symbols-outlined co-primary">
                          check_circle
                        </span>
                      </div>
                    )}
                    <span className="material-symbols-outlined co-muted co-xxl">
                      account_balance
                    </span>
                    <h3 className="co-pay-title">Bank</h3>
                    <p className="co-pay-desc">Direct Transfer</p>
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setMethod("cod")}
                    className={`co-pay-card ${
                      method === "cod" ? "co-pay-card--active" : ""
                    }`}
                    aria-pressed={method === "cod"}
                  >
                    {method === "cod" && (
                      <div className="co-pay-check">
                        <span className="material-symbols-outlined co-primary">
                          check_circle
                        </span>
                      </div>
                    )}
                    <span className="material-symbols-outlined co-muted co-xxl">
                      payments
                    </span>
                    <h3 className="co-pay-title">COD</h3>
                    <p className="co-pay-desc">Cash on Delivery</p>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: Sticky Summary */}
          <div className="co-right">
            <div className="co-sticky">
              <div className="co-summary">
                <h2 className="co-summary-title">Order Summary</h2>

                <div className="co-summary-list">
                  {items.map((it) => (
                    <div className="co-item" key={it.id}>
                      <div className="co-item-thumb">
                        <img src={it.img} alt={it.title} />
                      </div>
                      <div className="co-item-info">
                        <h4 className="co-item-title">{it.title}</h4>
                        <div className="co-item-meta">
                          <span className="co-item-qty">Qty: {it.qty}</span>
                          <span className="co-item-price co-navy">
                            {fmt(it.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="co-summary-totals">
                  <div className="co-line">
                    <span>Subtotal</span>
                    <span className="co-strong">{fmt(subTotal)}</span>
                  </div>
                  <div className="co-line">
                    <span>Shipping (Standard)</span>
                    <span className="co-free">FREE</span>
                  </div>
                  <div className="co-line">
                    <span>Tax (VAT 15%)</span>
                    <span className="co-strong">{fmt(tax)}</span>
                  </div>

                  <div className="co-divider-dashed" />

                  {/* PLACE ORDER BUTTON */}
                  <button
                    type="button"
                    className="co-btn-primary"
                    onClick={handlePlaceOrder}
                  >
                    <span className="co-btn-text">PLACE ORDER</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>

                {/* Promo code */}
                <div className="co-promo">
                  <input
                    type="text"
                    className="co-promo-input"
                    placeholder="Have a promo code?"
                  />
                  <button type="button" className="co-promo-apply">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}