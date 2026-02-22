import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Flight, Check, AccessTime } from "@mui/icons-material";
import BaseCard from "../../../common/BaseCard";

const FlightCard = React.memo(
  ({ flight, fromCode = "ORG", toCode = "DST" }) => {
    const navigate = useNavigate();

    const handleBook = () => {
      navigate("/booking", {
        state: {
          type: "flight",
          price: flight.price,
          airline: flight.airline,
          flightNumber: flight.number,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          from: fromCode,
          to: toCode,
        },
      });
    };

    const mainContent = useMemo(
      () => (
        <div className="flex items-center justify-between w-full">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {flight.departureTime}
            </div>
            <div className="text-xs text-slate-400 font-semibold tracking-wider mt-0.5">
              {fromCode}
            </div>
          </div>
          <div className="flex-1 px-4 flex flex-col items-center">
            <div className="flex items-center text-xs text-slate-400 font-semibold mb-1.5">
              <AccessTime className="w-3 h-3 mr-1" />
              {flight.duration}
            </div>
            <div className="w-full relative flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
              <div className="flex-1 h-px bg-linear-to-r from-blue-400 via-slate-300 to-blue-400 mx-1 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
            </div>
            <div className="text-[10px] text-blue-600 font-bold mt-1 uppercase tracking-widest">
              Non-Stop
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {flight.arrivalTime}
            </div>
            <div className="text-xs text-slate-400 font-semibold tracking-wider mt-0.5">
              {toCode}
            </div>
          </div>
        </div>
      ),
      [flight, fromCode, toCode],
    );

    const footerContent = (
      <>
        <div className="flex items-center text-xs font-semibold text-blue-700">
          <Check className="w-4 h-4 mr-1.5 text-blue-500" /> Free Cancellation
          Available
        </div>
        <span className="text-xs text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors">
          View Details →
        </span>
      </>
    );

    return (
      <BaseCard
        icon={Flight}
        iconRotate={45}
        title={flight.airline}
        subtitle={flight.number}
        mainContent={mainContent}
        price={flight.price}
        priceLabel="per person"
        actionLabel="Book Now"
        onAction={handleBook}
        footerContent={footerContent}
      />
    );
  },
);

FlightCard.displayName = "FlightCard";

export default FlightCard;
