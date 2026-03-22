import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/review.css";

export default function ReviewRecommendations() {
  return (
    <div className="rv-page">
        {/* HEADER */}
              <Navbar />
      <main className="rv-container rv-main">
        {/* Main Content Grid */}
        <div className="rv-layout">
          {/* Review Form (Left) */}
          <section className="rv-card">
            <div className="rv-card-head">
              <span className="material-symbols-outlined rv-primary rv-xxl">rate_review</span>
              <h2 className="rv-h2">Write a Review</h2>
            </div>

            <form className="rv-form">
              {/* Star Rating */}
              <div className="rv-field">
                <p className="rv-label">Overall Rating</p>
                <div className="rv-stars">
                  <span className="material-symbols-outlined rv-star rv-star-filled">star</span>
                  <span className="material-symbols-outlined rv-star rv-star-filled">star</span>
                  <span className="material-symbols-outlined rv-star rv-star-filled">star</span>
                  <span className="material-symbols-outlined rv-star rv-star-filled">star</span>
                  <span className="material-symbols-outlined rv-star">star</span>
                </div>
              </div>

              <div className="rv-grid2 rv-gap4">
                <label className="rv-field">
                  <span className="rv-label-text">Full Name</span>
                  <input
                    type="text"
                    placeholder="e.g. Priyantha Silva"
                    className="rv-input"
                  />
                </label>

                <label className="rv-field">
                  <span className="rv-label-text">Email Address</span>
                  <input
                    type="email"
                    placeholder="example@nettec.lk"
                    className="rv-input"
                  />
                </label>
              </div>

              <label className="rv-field">
                <span className="rv-label-text">Review Title</span>
                <input
                  type="text"
                  placeholder="Sum up your experience"
                  className="rv-input"
                />
              </label>

              <label className="rv-field">
                <span className="rv-label-text">Your Review</span>
                <textarea
                  rows={4}
                  placeholder="What did you like or dislike about the product?"
                  className="rv-input"
                />
              </label>

              {/* Upload Zone (Static) */}
              <div className="rv-upload">
                <span className="material-symbols-outlined rv-muted rv-xxl">add_a_photo</span>
                <p className="rv-upload-text">
                  Drag and drop photos or <span className="rv-primary rv-bold">Browse</span>
                </p>
                <p className="rv-upload-hint">Supports JPG, PNG up to 5MB</p>
              </div>

              <button type="submit" className="rv-btn rv-btn-primary rv-btn-lg">
                Submit Review
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </section>

          {/* Review Summary (Right) */}
          <aside className="rv-summary">
            <div className="rv-card">
              <h3 className="rv-h3">Customer Sentiment</h3>

              <div className="rv-sentiment">
                <div className="rv-score">
                  <p className="rv-score-big">4.8</p>
                  <div className="rv-score-stars">
                    <span className="material-symbols-outlined rv-star rv-star-filled sm">star</span>
                    <span className="material-symbols-outlined rv-star rv-star-filled sm">star</span>
                    <span className="material-symbols-outlined rv-star rv-star-filled sm">star</span>
                    <span className="material-symbols-outlined rv-star rv-star-filled sm">star</span>
                    <span className="material-symbols-outlined rv-star rv-star-filled sm">star</span>
                  </div>
                  <p className="rv-reviews-count">1,240 Reviews</p>
                </div>

                <div className="rv-bars">
                  <div className="rv-bar-row">
                    <span className="rv-bar-label">5</span>
                    <div className="rv-bar">
                      <div className="rv-bar-fill" style={{ width: "85%" }} />
                    </div>
                    <span className="rv-bar-pct">85%</span>
                  </div>

                  <div className="rv-bar-row">
                    <span className="rv-bar-label">4</span>
                    <div className="rv-bar">
                      <div className="rv-bar-fill" style={{ width: "10%" }} />
                    </div>
                    <span className="rv-bar-pct">10%</span>
                  </div>

                  <div className="rv-bar-row">
                    <span className="rv-bar-label">3</span>
                    <div className="rv-bar">
                      <div className="rv-bar-fill" style={{ width: "3%" }} />
                    </div>
                    <span className="rv-bar-pct">3%</span>
                  </div>

                  <div className="rv-bar-row">
                    <span className="rv-bar-label">2</span>
                    <div className="rv-bar">
                      <div className="rv-bar-fill" style={{ width: "1%" }} />
                    </div>
                    <span className="rv-bar-pct">1%</span>
                  </div>

                  <div className="rv-bar-row">
                    <span className="rv-bar-label">1</span>
                    <div className="rv-bar">
                      <div className="rv-bar-fill" style={{ width: "1%" }} />
                    </div>
                    <span className="rv-bar-pct">1%</span>
                  </div>
                </div>
              </div>

              <div className="rv-recommend">
                <span className="material-symbols-outlined rv-primary">verified</span>
                <p className="rv-recommend-text">
                  98% of customers recommend this store.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommendations */}
        <section className="rv-reco">
          <div className="rv-reco-head">
            <h2 className="rv-h2">Recommended for You</h2>
            <div className="rv-reco-actions">
              <button className="rv-icon-btn" type="button" aria-label="Previous">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="rv-icon-btn" type="button" aria-label="Next">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="rv-reco-grid">
            {/* Product 5 */}
<article className="rv-product">
  <div className="rv-product-media">
    <img
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFElIgrx_pQh0Y_5Ly8MdB1cXiCzA36o2-gdm6wW0WIu4p2-iJTZg_QkzbkXtzr1cOTJ6R2UMafK2f1lLCjBwPWhEaot5h4K-7CeF-rBPdOtYhNCHCdaWDVYK27rZM6ffrozYF--jxmxm_Knv8VVjtb2hE0bN3A0wdPlDIex_2v2SdLdNKH-i4THwLyrhL-h4oRB_GZYurAQcMKIJ-gtESK7R-T3XJW46ekyK2qiIsnXvCBsEMkk5SUWZCw99QH8oAQLlP6o_w40M"
      alt="Smart Wi‑Fi Energy Meter"
    />
  </div>
  <div className="rv-product-info">
    <h4 className="rv-product-title">Smart Wi‑Fi Energy Meter</h4>
    <p className="rv-product-sub">Real-time energy monitoring • App Control</p>
    <div className="rv-product-foot">
      <span className="rv-price">LKR 25,000</span>
      <button className="rv-icon-box" type="button" aria-label="Add to cart">
        <span className="material-symbols-outlined">shopping_cart</span>
      </button>
    </div>
  </div>
</article>

{/* Product 6 */}
<article className="rv-product">
  <div className="rv-product-media">
    <img
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRmM1Yp5LV0bATGxIAFUQkuC-Lu95KvQ_gAwufPd8LdSmuuvGc053feXg-23IK8aStNnQykXwsURUVcpjs2bpC5NjZll_Fqvi_iNN9f6JlCbGDi_XYnlOWVBrtH9S_L32uvKcjGx6O36WHTlL1mxLyEOn4cWBjhvswhX2pfr0yzC9wT1RxgU5wWaICiFe47sbFQzHKoSx6uF8pzcW5226uE0RtuzGBDlA_Uijg6l5RwFwGffpKAmk8hC1phb33SqPh2UxsKkMj_PY"
      alt="Premium 2.5mm 100m Multi-Strand Copper Cable"
    />
  </div>
  <div className="rv-product-info">
    <h4 className="rv-product-title">Premium 2.5mm² 100m Multi-Strand Copper Cable</h4>
    <p className="rv-product-sub">Durable • Flexible • High Conductivity</p>
    <div className="rv-product-foot">
      <span className="rv-price">LKR 8,750</span>
      <button className="rv-icon-box" type="button" aria-label="Add to cart">
        <span className="material-symbols-outlined">shopping_cart</span>
      </button>
    </div>
  </div>
</article>

{/* Product 7 */}
<article className="rv-product">
  <div className="rv-product-media">
    <img
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0pld7IX7NyBh5ldb3aXAe9cPIcjhX23NpL0KqLwh2qGL72YvJlOsvlhhoaK9SZQhC2t_FXixjjAwSbUGYsR8CnJCj90tNf3-8kdtreBkWctqM_VgXtPq8FzuGG7SgcXbYoFGRFxZnhSEOR2N8Pv2L9iJgir9czO3KvimFfnB3AfRo8D4TfGHsAsT64vWgro_Tz45ThlYooSbGvxjRIvJpJOpx8NdhhY0Ax9q48e0eQIcgoaDa4gsJ4YceV_FYZRVuvJHhFJgiXc"
      alt="100W IP65 Waterproof LED"
    />
  </div>
  <div className="rv-product-info">
    <h4 className="rv-product-title">100W IP65 Waterproof LED</h4>
    <p className="rv-product-sub">Energy Efficient • Outdoor Lighting</p>
    <div className="rv-product-foot">
      <span className="rv-price">LKR 15,500</span>
      <button className="rv-icon-box" type="button" aria-label="Add to cart">
        <span className="material-symbols-outlined">shopping_cart</span>
      </button>
    </div>
  </div>
</article>

{/* Product 8 */}
<article className="rv-product">
  <div className="rv-product-media">
    <img
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWFftXxSPuaSWXRZN72eddrwaps5FtEX3QGNy4xfsEPjDF2d8qmXit7BPT0OStt8l19nK18kcDDDxBgdLGy9SQGngwksIvGorbWLK6viEppiBnqksyytnAEje7yyXLSeRdPMZ0nZGjWpys8f4PME70so8EbM036OCxUPnRR_Ore6AVSTHBkFJnVTzPFgHq7qVyACclousnN6x6qafIJESysqeKMts4L55Mi94xZNsmPdvW3rpqmTlBhQRxjsgn-K5W9LZgpwMdMZE"
      alt="Pure Sine Wave 5KW Hybrid Inverter"
    />
  </div>
  <div className="rv-product-info">
    <h4 className="rv-product-title">Pure Sine Wave 5KW Hybrid Inverter</h4>
    <p className="rv-product-sub">Solar Compatible • Stable Power Supply</p>
    <div className="rv-product-foot">
      <span className="rv-price">LKR 320,000</span>
      <button className="rv-icon-box" type="button" aria-label="Add to cart">
        <span className="material-symbols-outlined">shopping_cart</span>
      </button>
    </div>
  </div>
</article>
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}