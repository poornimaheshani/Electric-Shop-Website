import React from "react";
import "./CategorySection.css";
import { Cable, Lightbulb, Tv, Factory, Wrench, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electrical Supplies",
    description: "Wires, cables, switches",
    icon: Cable,
    filter: "Electrical Supplies",
  },
  {
    id: 2,
    name: "LED & Lighting",
    description: "Modern lighting solutions",
    icon: Lightbulb,
    filter: "LED & Lighting",
  },
  {
    id: 3,
    name: "Home Electronics",
    description: "Smart home essentials",
    icon: Tv,
    filter: "Home Electronics",
  },
  {
    id: 4,
    name: "Industrial Equipment",
    description: "Heavy-duty solutions",
    icon: Factory,
    filter: "Industrial Equipment",
  },
  {
    id: 5,
    name: "Tools & Accessories",
    description: "Professional-grade tools",
    icon: Wrench,
    filter: "Tools & Accessories",
  },
    {
    id: 3,
    name: "Circuit Protection",
    description: "Breakers, fuses & protection",
    icon: ShieldCheck,
    filter: "Circuit Protection",
  },
];

export function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <div className="category-container">
        <div className="category-header">
          <h2>
            Browse <span>Categories</span>
          </h2>
          <p>
            Explore our wide range of high-quality electrical and electronic
            products designed for every need.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="category-card"
                onClick={() => navigate(`/products?category=${encodeURIComponent(category.filter)}`)}
              >
                <div className="icon-wrapper">
                  <Icon className="category-icon" />
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}