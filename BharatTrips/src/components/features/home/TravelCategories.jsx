import React from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: 1,
    name: "Beach Escapes",
    count: "45+ Packages",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Adventure Trips",
    count: "32+ Packages",
    image: "https://images.unsplash.com/photo-1533240332313-0cb49b473b45?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Spiritual Journeys",
    count: "28+ Packages",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Family Vacations",
    count: "56+ Packages",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    name: "Honeymoon",
    count: "40+ Packages",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    name: "Weekend Getaways",
    count: "85+ Packages",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600",
  },
];

const TravelCategories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            Travel by Theme
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl">
            Find the perfect trip tailored to your interests and travel style.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden mb-4 relative shadow-sm group-hover:shadow-xl transition-all duration-300">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
              </div>
              <h3 className="font-bold text-text-dark group-hover:text-primary-blue transition-colors text-center text-sm md:text-base">
                {category.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{category.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelCategories;
