import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DirectionsCar, Group, Work, Star } from "@mui/icons-material";
import BaseCard from "../../../common/BaseCard";

const CabCard = React.memo(({ cab }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/booking", {
      state: {
        type: "cab",
        price: cab.price,
        model: cab.model,
        passengers: cab.passengers,
        luggage: cab.luggage,
      },
    });
  };

  const mainContent = useMemo(
    () => (
      <div className="flex items-center gap-4 sm:gap-6 w-full mb-4 sm:mb-0 sm:justify-center">
        <div className="flex items-center gap-1.5 bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
          <Star className="w-4 h-4 text-blue-500" />
          <span className="font-bold text-sm">{cab.rating}</span>
          <span className="text-[11px] text-slate-500 font-medium">
            ({cab.trips.toLocaleString("en-IN")} trips)
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <div className="flex items-center gap-1 text-sm font-medium">
            <Group className="w-4 h-4 text-slate-400" />
            <span>{cab.passengers}</span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Work className="w-4 h-4 text-slate-400" />
            <span>{cab.luggage}</span>
          </div>
        </div>
      </div>
    ),
    [cab],
  );

  const footerContent = (
    <>
      <div className="flex items-center text-xs font-semibold text-slate-600">
        <DirectionsCar className="w-4 h-4 mr-1.5 text-blue-500" />{" "}
        {cab.features}
      </div>
      <span className="text-xs text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors">
        View Details →
      </span>
    </>
  );

  return (
    <BaseCard
      icon={DirectionsCar}
      title={cab.model}
      subtitle={cab.type}
      mainContent={mainContent}
      price={cab.price}
      priceLabel="incl. tolls & taxes"
      actionLabel="Book Cab"
      onAction={handleBook}
      footerContent={footerContent}
    />
  );
});

CabCard.displayName = "CabCard";

export default CabCard;
