import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Train, AccessTime, EventSeat } from "@mui/icons-material";
import BaseCard from "../../../common/BaseCard";

const TrainCard = React.memo(({ train }) => {
  const navigate = useNavigate();
  const classesArr = useMemo(
    () => train.classes.split(",").map((c) => c.trim()),
    [train.classes],
  );

  const handleBook = () => {
    navigate("/booking", {
      state: {
        type: "train",
        price: train.price,
        name: train.name,
        number: train.number,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
      },
    });
  };

  const mainContent = useMemo(
    () => (
      <div className="flex items-center justify-between w-full px-0 sm:px-6">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {train.departureTime}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            Departure
          </div>
        </div>
        <div className="flex-1 px-4 flex flex-col items-center">
          <div className="flex items-center text-xs text-slate-400 font-semibold mb-1.5">
            <AccessTime className="w-3 h-3 mr-1" />
            {train.duration}
          </div>
          <div className="w-full relative flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
            <div className="flex-1 h-px bg-linear-to-r from-blue-400 via-slate-300 to-blue-400 mx-1 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {train.arrivalTime}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            Arrival
          </div>
        </div>
      </div>
    ),
    [train],
  );

  const badges = useMemo(
    () =>
      classesArr.map((cls) => ({
        label: cls,
        className: "bg-blue-50 text-blue-700 border-blue-100",
      })),
    [classesArr],
  );

  const footerContent = (
    <>
      <div className="flex items-center text-xs font-semibold text-slate-600">
        <EventSeat className="w-4 h-4 mr-1.5 text-blue-500" /> Runs Daily: M T W
        T F S S
      </div>
      <span className="text-xs text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors">
        Check Availability →
      </span>
    </>
  );

  return (
    <BaseCard
      icon={Train}
      title={train.name}
      subtitle={`#${train.number}`}
      mainContent={mainContent}
      price={train.price}
      priceLabel="starting from"
      actionLabel="Book Now"
      onAction={handleBook}
      badges={badges}
      footerContent={footerContent}
    />
  );
});

TrainCard.displayName = "TrainCard";

export default TrainCard;
