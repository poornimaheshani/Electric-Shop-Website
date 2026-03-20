import React from "react";
import "./CategorySection.css";
import { Cable, Lightbulb, Tv, Factory, Wrench } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electrical Supplies",
    description: "Wires, cables, switches",
    icon: Cable,
  },
  {
    id: 2,
    name: "LED & Lighting",
    description: "Modern lighting solutions",
    icon: Lightbulb,
  },
  {
    id: 3,
    name: "Home Electronics",
    description: "Smart home essentials",
    icon: Tv,
  },
  {
    id: 4,
    name: "Industrial Equipment",
    description: "Heavy-duty solutions",
    icon: Factory,
  },
  {
    id: 5,
    name: "Tools & Accessories",
    description: "Professional-grade tools",
    icon: Wrench,
  },
];

export function CategorySection() {
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
              <div key={category.id} className="category-card">
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
