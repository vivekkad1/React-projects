import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const MobileAppPromo = () => {
  const benefits = [
    "Exclusive mobile-only discounts",
    "Real-time flight & train tracking",
    "Offline access to bookings & tickets",
    "Instant support via in-app chat"
  ];

  return (
    <section className="py-20 bg-primary-blue relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your entire trip, <br/> in your pocket.
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Download the BharatTrips app to manage your bookings on the go. Get exclusive deals, instant alerts, and much more.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center text-white font-medium">
                  <FiCheckCircle className="text-success-green mr-3 w-5 h-5" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="flex items-center gap-3 bg-text-dark hover:bg-black text-white px-6 py-3.5 rounded-xl transition-colors shadow-lg">
                <FaApple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-[10px] leading-none text-slate-300 uppercase tracking-wider mb-1">Download on the</div>
                  <div className="text-lg font-bold leading-none">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-text-dark hover:bg-black text-white px-6 py-3.5 rounded-xl transition-colors shadow-lg">
                <FaGooglePlay className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-[10px] leading-none text-slate-300 uppercase tracking-wider mb-1">Get it on</div>
                  <div className="text-lg font-bold leading-none">Google Play</div>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex justify-center relative"
          >
            {/* Abstract phone mockup */}
            <div className="relative w-72 h-[550px] bg-white rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden flex flex-col transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-0 inset-x-0 h-7 bg-slate-900 rounded-b-2xl w-1/2 mx-auto z-20"></div>
              
              <div className="flex-1 bg-surface relative">
                <div className="h-48 bg-primary-blue flex flex-col justify-end p-5 text-white">
                  <div className="font-bold text-xl mb-1">BharatTrips</div>
                  <div className="text-xs opacity-80">Welcome back, Rohan!</div>
                </div>
                
                <div className="absolute top-36 left-4 right-4 bg-white rounded-xl shadow-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Upcoming Trip</div>
                  <div className="font-bold text-slate-800 text-lg">Mumbai to Goa</div>
                  <div className="text-sm font-medium text-primary-blue mt-1">Tomorrow, 08:30 AM</div>
                </div>

                <div className="mt-20 px-4 space-y-3">
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 flex gap-3 items-center shadow-xs">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=150" 
                      className="w-14 h-14 object-cover rounded-lg shrink-0" 
                      alt="Grand Palace Hotel" 
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800">Grand Palace Hotel</div>
                      <div className="text-[10px] text-slate-400">Deluxe Double Room</div>
                      <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-bold mt-1 inline-block">Confirmed</span>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 flex gap-3 items-center shadow-xs">
                    <img 
                      src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=150" 
                      className="w-14 h-14 object-cover rounded-lg shrink-0" 
                      alt="Indigo Flight" 
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800">Flight DEL - BOM</div>
                      <div className="text-[10px] text-slate-400">IndiGo 6E-2015</div>
                      <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-bold mt-1 inline-block">On Time</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Nav Mockup */}
              <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-4">
                <div className="w-6 h-6 rounded-full bg-primary-blue/20"></div>
                <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                <div className="w-6 h-6 rounded-full bg-slate-200"></div>
              </div>
            </div>

            {/* Decorative element behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-blue/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MobileAppPromo;
