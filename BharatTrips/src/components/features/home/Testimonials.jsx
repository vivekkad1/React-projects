import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiStar } from "react-icons/fi";

const REVIEWS = [
  {
    id: 1,
    name: "Rohan Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "Booking our family trip to Kerala through BharatTrips was the best decision. The itinerary was perfectly balanced, and the hotels were top-notch. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Ahmedabad, India",
    rating: 5,
    text: "The Goa package exceeded our expectations. Excellent customer service, hassle-free transfers, and great recommendations for local dining. Will definitely use them again.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Amit Kumar",
    location: "Delhi, India",
    rating: 4,
    text: "Our bike trip to Ladakh was an adventure of a lifetime. The team ensured all permits and accommodations were ready. Very professional and reliable service.",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Hyderabad, India",
    rating: 5,
    text: "I was skeptical about booking online, but BharatTrips proved me wrong. Transparent pricing, no hidden fees, and a wonderfully curated Golden Triangle tour.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-primary-blue font-bold tracking-wider uppercase text-sm mb-2 block">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Real stories from our community of explorers. See why we are rated as India's premier travel platform.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-16"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col relative mt-8">
                  {/* Avatar overlapping top edge */}
                  <div className="absolute -top-8 left-8">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                    />
                  </div>
                  
                  <div className="flex text-orange-500 mt-6 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-orange-500 w-4 h-4" />
                    ))}
                  </div>
                  
                  <p className="text-slate-600 italic mb-6 flex-grow leading-relaxed">
                    "{review.text}"
                  </p>
                  
                  <div className="mt-auto border-t border-slate-100 pt-4">
                    <h4 className="font-bold text-text-dark">{review.name}</h4>
                    <p className="text-xs text-slate-400">{review.location}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
