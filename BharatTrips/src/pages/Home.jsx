import React from "react";
import Hero from "../components/features/home/Hero";
import PopularDestinations from "../components/features/home/PopularDestinations";
import FeaturedPackages from "../components/features/home/FeaturedPackages";
import WhyChooseUs from "../components/features/home/WhyChooseUs";
import TravelCategories from "../components/features/home/TravelCategories";
import TravelInspiration from "../components/features/home/TravelInspiration";
import MobileAppPromo from "../components/features/home/MobileAppPromo";
import Newsletter from "../components/features/home/Newsletter";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Hero />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <TravelCategories />
      <TravelInspiration />
      <MobileAppPromo />
      <Newsletter />
    </div>
  );
};

export default Home;
