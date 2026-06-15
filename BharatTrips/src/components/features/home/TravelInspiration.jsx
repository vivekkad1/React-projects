import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const ARTICLES = [
  {
    id: 1,
    title: "Top 10 Places to Visit in India During Winter",
    date: "Oct 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600",
    category: "Guides",
  },
  {
    id: 2,
    title: "Best Time to Visit Kashmir: A Seasonal Guide",
    date: "Sep 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=600",
    category: "Tips",
  },
  {
    id: 3,
    title: "Budget Travel Tips for Backpacking Across South India",
    date: "Sep 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600",
    category: "Budget",
  },
];

const TravelInspiration = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Travel Inspiration
            </h2>
            <p className="text-slate-500 text-lg">
              Read our latest guides, tips, and stories to fuel your next adventure.
            </p>
          </div>
          <button className="text-primary-blue font-semibold hover:text-blue-700 transition-colors hidden md:flex items-center gap-2">
            Read all articles <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-blue shadow-sm">
                  {article.category}
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mb-3">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{article.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-text-dark leading-snug group-hover:text-primary-blue transition-colors mb-3">
                {article.title}
              </h3>
              
              <div className="mt-auto flex items-center text-primary-blue font-semibold text-sm group-hover:gap-2 transition-all">
                Read Article <FiArrowRight className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        <button className="mt-10 w-full py-4 text-primary-blue font-semibold bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors md:hidden flex justify-center items-center gap-2">
          Read all articles <FiArrowRight />
        </button>

      </div>
    </section>
  );
};

export default TravelInspiration;
