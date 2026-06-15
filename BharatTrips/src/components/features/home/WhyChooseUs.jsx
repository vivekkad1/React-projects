import React from "react";
import { motion } from "framer-motion";
import { FiTag, FiShield, FiPhoneCall, FiCheckCircle, FiRefreshCcw, FiUsers } from "react-icons/fi";

const FEATURES = [
  {
    id: 1,
    title: "Best Prices",
    description: "We guarantee the best prices on flights, hotels, and holiday packages across India.",
    icon: FiTag,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: 2,
    title: "Secure Booking",
    description: "Your payments are 100% secure with enterprise-grade encryption.",
    icon: FiShield,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our travel experts are available round the clock to assist you.",
    icon: FiPhoneCall,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    title: "Verified Partners",
    description: "We work only with verified hotels and transport providers for quality assurance.",
    icon: FiCheckCircle,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: 5,
    title: "Easy Cancellations",
    description: "Change of plans? Enjoy hassle-free cancellations and instant refunds.",
    icon: FiRefreshCcw,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    id: 6,
    title: "Happy Travelers",
    description: "Join thousands of satisfied travelers who trust BharatTrips.",
    icon: FiUsers,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary-blue font-extrabold tracking-widest uppercase text-xs mb-3 block">Our Promise</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Why Choose BharatTrips?
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            We don't just book trips; we create memories. Here is why thousands of travelers choose us for their Indian adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
