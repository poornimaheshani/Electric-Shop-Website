import React from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/aboutus.css";
import image from "../assets/image.jpg";

const Aboutus = () => {
  
  return (
    <div className="about-container">
      <Navbar />
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          NetTec Electronic is one of the largest e-commerce platform which facilitates the distribution of electrical, communications and data networking products serving all the regions within the country. Our wide spread products are provided to commercial and residential electrical contractors, utility companies, industrial facilities, institutions, and low voltage installers. We have partnered with number of reputable brands to ensure our customer base that anything they purchase from us will be proven, reliable, and top quality.
        </p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Making our customers’ lives easier is the prime job of ours, hence we commit ourselves to understand and satisfy their needs Elecshop has partnered with premier manufacturers to assure best quality products and solutions are sourced. Wide range of industries are offered with extensive products which are included with electrical, communication, MRO, and OEM products.
          </p>

          <h2>Our Mission</h2>
          <p>
            Elecshop is an an independent, family-owned e-commerce platform. It has maintained a leadership position in the electrical platforms of the country by consistently meeting its responsibilities and commitments to its customers, manufacturers and employees. Our long term, profitable and sustainable growth is driven by lasting loyalty from our customers, building strong partnerships with best suppliers and manufacturers and empowering our skilled employee base to excel in meeting both their internal and external customers expectations.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>✔ Safety First</li>
            <li>✔ Quality Workmanship</li>
            <li>✔ Reliability & Accountability</li>
            <li>✔ Teamwork & Collaboration</li>
          </ul>
        </div>

        <div className="about-image">
          <img
              src={image}
            alt="Our Team"
          />
        </div>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
            />
            <h3>John Doe</h3>
            <p>Owner</p>
          </div>

          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member"
            />
            <h3>Jane Smith</h3>
            <p>Manager</p>
          </div>

          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Team Member"
            />
            <h3>Michael Lee</h3>
            <p>Electrician</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Aboutus;

