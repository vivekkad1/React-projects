import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

const Newsletter = () => {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Newsletter Subscribe:", data);
    // Simulate API call
    setTimeout(() => {
      reset();
    }, 2000);
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 text-center relative overflow-hidden"
        >
          {/* Abstract blobs */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Get Travel Updates & Offers
            </h2>
            <p className="text-slate-500 text-lg mb-10">
              Subscribe to our newsletter and be the first to know about exclusive deals, new destinations, and travel tips.
            </p>

            {isSubmitSuccessful ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl border border-green-200 font-medium animate-slide-fade">
                Thank you for subscribing! We'll keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border outline-none transition-colors text-slate-700 font-medium ${
                        errors.email ? "border-red-400 focus:border-red-500 bg-red-50/30" : "border-slate-200 focus:border-primary-blue focus:bg-white"
                      }`}
                      {...register("email", { 
                        required: "Email is required", 
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && (
                      <span className="absolute -bottom-6 left-2 text-xs font-medium text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <button 
                    type="submit"
                    className="bg-primary-blue hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Subscribe <FiSend />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-6">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
