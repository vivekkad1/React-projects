import React from "react";

const OfferCard = React.memo(({ offer, layout = "horizontal" }) => {
  if (layout === "vertical") {
    return (
      <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white">
        <div className="w-full h-45 sm:h-50 overflow-hidden">
          <img
            src={offer.img}
            alt={offer.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mb-2">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {offer.type}
            </span>
            <span>T&C&apos;s apply</span>
          </div>
          <h3 className="font-bold text-base text-slate-800 leading-snug mb-1.5">
            {offer.title}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 flex-1">
            {offer.desc}
          </p>
          <div className="text-right mt-3 pt-3 border-t border-slate-100">
            <span className="text-blue-600 font-semibold text-sm">
              Book Now →
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col xs:flex-row border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white">
      <div className="w-full xs:w-32.5 sm:w-37.5 h-40 xs:h-auto shrink-0">
        <img
          src={offer.img}
          alt={offer.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mb-1.5">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {offer.type}
            </span>
            <span>T&C&apos;s apply</span>
          </div>
          <h3 className="font-bold text-base text-slate-800 leading-snug mb-1">
            {offer.title}
          </h3>
          <p className="text-[13px] text-slate-500 line-clamp-2">
            {offer.desc}
          </p>
        </div>
        <div className="text-right mt-2">
          <span className="text-blue-600 font-semibold text-sm">
            Book Now →
          </span>
        </div>
      </div>
    </div>
  );
});

OfferCard.displayName = "OfferCard";

export default OfferCard;
