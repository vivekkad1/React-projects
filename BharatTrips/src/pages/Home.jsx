import Hero from "../components/features/home/Hero";
import OffersSection from "../components/features/home/OffersSection";
import CollectionsSection from "../components/features/home/CollectionsSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-0 font-sans">
      <Hero />
      <OffersSection />
      <CollectionsSection />
    </div>
  );
};

export default Home;
