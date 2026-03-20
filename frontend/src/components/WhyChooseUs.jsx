import React from "react";
import "./WhyChooseUs.css";
import {
  BadgeCheck,
  CircleDollarSign,
  Truck,
  Headphones,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "100% Genuine Products",
    description: "Every product is authentic and quality-tested.",
  },
  {
    icon: CircleDollarSign,
    title: "Affordable Prices",
    description: "Best prices in the Sri Lankan market.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick delivery across all of Sri Lanka.",
  },
  {
    icon: Headphones,
    title: "Friendly Support",
    description: "24/7 customer support via phone & WhatsApp.",
  },
  {
    icon: Shield,
    title: "Warranty Available",
    description: "Manufacturer warranty on all products.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-container">

        <div className="why-header">
          <h2>
            Why Choose <span>NetTec Electronic?</span>
          </h2>
          <p>
            We are committed to providing the best service and highest quality
            products to our customers.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="why-card">
                <div className="why-icon">
                  <Icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
