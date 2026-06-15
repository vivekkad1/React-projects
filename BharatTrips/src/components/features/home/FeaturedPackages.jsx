import React from "react";
import { motion } from "framer-motion";
import { FiClock, FiStar, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PACKAGES = [
  {
    id: 1,
    title: "Golden Triangle Tour",
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 124,
    price: "₹18,500",
    oldPrice: "₹22,000",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    features: ["Hotels", "Transfers", "Sightseeing", "Meals"],
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Romantic Kerala Backwaters",
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 89,
    price: "₹24,000",
    oldPrice: "₹28,500",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
    features: ["Houseboat", "Transfers", "Meals", "Activities"],
    badge: "Honeymoon",
  },
  {
    id: 3,
    title: "Mystical Leh Ladakh Bike Trip",
    duration: "8 Days / 7 Nights",
    rating: 4.7,
    reviews: 215,
    price: "₹32,000",
    oldPrice: "₹36,000",
    image: "https://images.unsplash.com/photo-1581793745862-f9f4c2fc736c?auto=format&fit=crop&q=80&w=800",
    features: ["Bike Rental", "Camps", "Permits", "Meals"],
    badge: "Adventure",
  },
];

const FeaturedPackages = () => {
  const navigate = useNavigate();

  const handleExplore = (e) => {
    e.stopPropagation();
    navigate("/booking");
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-extrabold tracking-widest uppercase text-xs mb-3 block">Premium Experiences</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Featured Holiday Packages
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Handpicked itineraries designed to give you the best of India. Unbeatable prices, premium comfort.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col cursor-pointer"
            >
              <div className="relative h-60 image-hover-zoom">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover"
                />
                {pkg.badge && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    {pkg.badge}
                  </div>
                )}
                <button className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-md cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <FiClock className="text-primary-blue w-4 h-4" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiStar className="text-orange-500 fill-orange-500 w-4 h-4" />
                    {pkg.rating} <span className="text-slate-400 font-normal">({pkg.reviews})</span>
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-4 line-clamp-2 leading-snug">
                  {pkg.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.features.map(feature => (
                    <span key={feature} className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100/80 px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <FiCheck className="text-success-green w-3.5 h-3.5" /> {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 line-through mb-0.5 font-bold">{pkg.oldPrice}</div>
                    <div className="text-2xl font-black text-primary-blue">{pkg.price}</div>
                  </div>
                  <button 
                    onClick={handleExplore}
                    className="bg-gradient-to-r from-primary-blue to-[#0048b3] hover:from-[#0048b3] hover:to-[#003685] text-white font-extrabold py-3 px-8 rounded-2xl transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedPackages;
