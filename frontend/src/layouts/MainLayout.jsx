import { Navbar } from "../components/Navbar";
import HeroSection from "../components/HeroSection";

import { CategorySection } from "../components/CategorySection";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />

        {/* ✅ Add id for scrolling */}
        <section id="featured-products">
          <FeaturedProducts />
        </section>

        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
