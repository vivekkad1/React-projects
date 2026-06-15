import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiStar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearchParams } from "../../../store/slices/appSlice";

const DESTINATIONS = [
  {
    id: 1,
    name: "Goa",
    description: "Pristine beaches and vibrant nightlife",
    price: "₹8,500",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Kashmir",
    description: "Heaven on earth with snow-capped peaks",
    price: "₹15,200",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Jaipur",
    description: "The magnificent Pink City and its forts",
    price: "₹6,400",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Kerala",
    description: "God's own country with serene backwaters",
    price: "₹12,000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Ladakh",
    description: "Adventure in the land of high passes",
    price: "₹18,500",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581793745862-f9f4c2fc736c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Andaman Islands",
    description: "Crystal clear waters and coral reefs",
    price: "₹22,000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582236162391-7f9188e9999a?auto=format&fit=crop&q=80&w=800",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PopularDestinations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDestinationClick = (destName) => {
    dispatch(updateSearchParams({
      type: "flights",
      to: {
        code: destName.substring(0, 3).toUpperCase(),
        name: destName,
        desc: "Popular Destination",
      }
    }));
    navigate("/search");
  };

  const handleViewAll = () => {
    navigate("/search");
  };

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Explore the most loved destinations across India. From breathtaking mountains to pristine beaches.
            </p>
          </div>
          <button 
            onClick={handleViewAll}
            className="text-primary-blue font-bold hover:text-blue-700 transition-colors hidden md:block text-sm uppercase tracking-wider group cursor-pointer"
          >
            View All Destinations <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {DESTINATIONS.map((dest) => (
            <motion.div 
              key={dest.id}
              variants={cardVariants}
              onClick={() => handleDestinationClick(dest.name)}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 cursor-pointer"
            >
              <div className="relative h-72 image-hover-zoom">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <FiStar className="text-orange-500 fill-orange-500 w-3.5 h-3.5" />
                  <span className="text-xs font-black text-slate-800">{dest.rating}</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-3xl font-extrabold mb-1 drop-shadow-sm leading-tight tracking-wide font-heading">{dest.name}</h3>
                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-300">
                    <FiMapPin className="mr-1 text-sky-400" /> India
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-slate-500 text-sm mb-5 leading-relaxed font-normal">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-0.5">Starting from</span>
                    <span className="text-xl font-black text-primary-blue">{dest.price}</span>
                  </div>
                  <button className="bg-slate-50 hover:bg-primary-blue hover:text-white text-slate-700 hover:shadow-lg hover:shadow-blue-500/20 p-3 rounded-full transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <button 
          onClick={handleViewAll}
          className="mt-12 w-full py-4 text-primary-blue font-bold bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors md:hidden cursor-pointer"
        >
          View All Destinations
        </button>

      </div>
    </section>
  );
};

export default PopularDestinations;
