import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { offersData } from "../data/mockData";
import OfferCard from "../components/features/results/cards/OfferCard";

const CATEGORIES = ["All", "Flights", "Hotels", "Holidays", "Trains", "Buses"];

const Offers = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredOffers =
    activeCategory === "All"
      ? offersData
      : offersData.filter((o) =>
          o.type.toLowerCase().includes(activeCategory.toLowerCase()),
        );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-300 mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/"
            className="flex items-center text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium"
          >
            <ArrowBack className="w-4 h-4 mr-1" /> Back
          </Link>
          <div className="w-px h-4 bg-slate-200" />
          <h1 className="text-xl font-bold text-slate-900">All Offers</h1>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} layout="vertical" />
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm">
              No offers in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
