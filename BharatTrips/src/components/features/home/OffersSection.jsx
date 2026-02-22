import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import FadeIn from "../../common/FadeIn";
import OfferCard from "../results/cards/OfferCard";
import { offersData } from "../../../data/mockData";

const OFFERS_PER_PAGE = 4;

const OffersSection = () => {
  const [offerPage, setOfferPage] = useState(0);
  const totalOfferPages = Math.ceil(offersData.length / OFFERS_PER_PAGE);

  const handlePrevOffers = () => setOfferPage((p) => Math.max(0, p - 1));
  const handleNextOffers = () =>
    setOfferPage((p) => Math.min(totalOfferPages - 1, p + 1));

  const visibleOffers = useMemo(
    () =>
      offersData.slice(
        offerPage * OFFERS_PER_PAGE,
        (offerPage + 1) * OFFERS_PER_PAGE,
      ),
    [offerPage],
  );

  return (
    <div className="max-w-300 mx-auto px-4 mt-16">
      <FadeIn>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
          <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Offers</h2>
            <div className="flex items-center space-x-2">
              <Link
                to="/offers"
                className="text-blue-600 font-semibold text-sm mr-2 hover:text-blue-700 transition-colors"
              >
                View All →
              </Link>
              <div className="flex space-x-1">
                <button
                  onClick={handlePrevOffers}
                  disabled={offerPage === 0}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${offerPage === 0 ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-500"}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextOffers}
                  disabled={offerPage >= totalOfferPages - 1}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${offerPage >= totalOfferPages - 1 ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-500"}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} layout="horizontal" />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default OffersSection;
