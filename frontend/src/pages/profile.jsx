import React from "react";
import { Navbar } from "../components/Navbar";
import "../styles/profile.css";

export default function Profile() {
  return (
    <div className="ad-page">
      {/* Header */}
      <Navbar />

      <main className="ad-main">
        <div className="ad-container">

          {/* Breadcrumbs */}
          <nav className="ad-breadcrumbs">
            <a href="#" className="ad-bc-link">Home</a>
            <span className="material-symbols-outlined ad-bc-sep">chevron_right</span>
            <span className="ad-bc-current">My Account</span>
          </nav>

          {/* Greeting */}
          <div className="ad-greeting">
            <h2 className="ad-h2">Welcome back, Janith!</h2>
            <p className="ad-muted">
              Manage your orders and account settings from your dashboard.
            </p>
          </div>

          <div className="ad-layout">

            {/* Sidebar */}
            <aside className="ad-sidebar">
              <div className="ad-sidecard">
                <nav className="ad-sidenav">

                  <a href="#" className="ad-sidelink ad-sidelink-active">
                    <span className="material-symbols-outlined">dashboard</span>
                    Dashboard
                  </a>

                  <a href="#" className="ad-sidelink">
                    <span className="material-symbols-outlined">package</span>
                    My Orders
                  </a>

                  <a href="#" className="ad-sidelink">
                    <span className="material-symbols-outlined">local_shipping</span>
                    Track Order
                  </a>

                  <a href="#" className="ad-sidelink">
                    <span className="material-symbols-outlined">favorite</span>
                    Wishlist
                  </a>

                  <a href="#" className="ad-sidelink">
                    <span className="material-symbols-outlined">location_on</span>
                    Addresses
                  </a>

                  <a href="#" className="ad-sidelink">
                    <span className="material-symbols-outlined">payments</span>
                    Payment Methods
                  </a>

                  <a href="#" className="ad-sidelink">
                    <span className="material-symbols-outlined">person</span>
                    Account Details
                  </a>

                  <div className="ad-side-sep" />

                  <a href="#" className="ad-sidelink ad-danger">
                    <span className="material-symbols-outlined">logout</span>
                    Logout
                  </a>

                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <section className="ad-content">

              {/* Overview Cards */}
              <div className="ad-cards-grid">

                <div className="ad-card ad-flex">
                  <div className="ad-icochip ad-icochip-primary">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </div>
                  <div>
                    <p className="ad-kpi-label">Total Orders</p>
                    <p className="ad-kpi-value">24</p>
                  </div>
                </div>

                <div className="ad-card ad-flex">
                  <div className="ad-icochip ad-icochip-orange">
                    <span className="material-symbols-outlined">pending_actions</span>
                  </div>
                  <div>
                    <p className="ad-kpi-label">Pending</p>
                    <p className="ad-kpi-value">02</p>
                  </div>
                </div>

                <div className="ad-card ad-flex">
                  <div className="ad-icochip ad-icochip-green">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div>
                    <p className="ad-kpi-label">Completed</p>
                    <p className="ad-kpi-value">22</p>
                  </div>
                </div>

                <div className="ad-card ad-flex">
                  <div className="ad-icochip ad-icochip-red">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <div>
                    <p className="ad-kpi-label">Wishlist</p>
                    <p className="ad-kpi-value">12</p>
                  </div>
                </div>

              </div>

              {/* Recent Orders */}
              <div className="ad-tablecard">
                <div className="ad-tablehead">
                  <h3 className="ad-h3">Recent Orders</h3>
                  <a href="#" className="ad-link-primary">View All</a>
                </div>

                <div className="ad-tablewrap">
                  <table className="ad-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount (LKR)</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th className="ad-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ad-strong">#NT-92831</td>
                        <td className="ad-dim">Oct 24, 2023</td>
                        <td className="ad-strong">145,500.00</td>
                        <td className="ad-dim">Visa Cards</td>
                        <td><span className="ad-pill ad-pill-green">Delivered</span></td>
                        <td className="ad-right">
                          <button className="ad-link-cta">View Details</button>
                        </td>
                      </tr>

                      <tr>
                        <td className="ad-strong">#NT-92845</td>
                        <td className="ad-dim">Nov 02, 2023</td>
                        <td className="ad-strong">89,900.00</td>
                        <td className="ad-dim">Bank Transfer</td>
                        <td><span className="ad-pill ad-pill-orange">Pending</span></td>
                        <td className="ad-right">
                          <button className="ad-link-cta">Track Order</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="ad-quickgrid">

                <div className="ad-quickcard ad-quick-dark">
                  <div className="ad-quick-content">
                    <h4 className="ad-h4">Need help with an order?</h4>
                    <p className="ad-muted-light">
                      Track your shipping status in real-time or contact support.
                    </p>
                    <div className="ad-btnrow">
                      <button className="ad-btn ad-btn-primary">Track Order</button>
                      <button className="ad-btn ad-btn-outline">Support Center</button>
                    </div>
                  </div>
                  <span className="material-symbols-outlined ad-quick-bgicon">
                    local_shipping
                  </span>
                </div>

                <div className="ad-quickcard ad-quick-primary">
                  <div className="ad-quick-content">
                    <h4 className="ad-h4">Exclusive Discounts</h4>
                    <p>
                      As a premium member, you have access to exclusive deals.
                    </p>
                    <div className="ad-btnrow">
                      <button className="ad-btn ad-btn-dark">Browse Deals</button>
                    </div>
                  </div>
                  <span className="material-symbols-outlined ad-quick-bgicon ad-dark-bgicon">
                    sell
                  </span>
                </div>

              </div>

            </section>
          </div>

        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="ad-bottomnav">
        <a href="#" className="ad-bottomitem ad-bottomitem-active">
          <span className="material-symbols-outlined">home</span>
          <span className="ad-bottomlabel">Home</span>
        </a>

        <a href="#" className="ad-bottomitem">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="ad-bottomlabel">Shop</span>
        </a>

        <a href="#" className="ad-bottomitem">
          <span className="material-symbols-outlined">favorite</span>
          <span className="ad-bottomlabel">Wishlist</span>
        </a>

        <a href="#" className="ad-bottomitem">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="ad-bottomlabel">Account</span>
        </a>
      </nav>

      <div className="ad-bottomspacer" />
    </div>
  );
}