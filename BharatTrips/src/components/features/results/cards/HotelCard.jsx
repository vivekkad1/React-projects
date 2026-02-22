import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Star, LocationOn } from "@mui/icons-material";
import BaseCard from "../../../common/BaseCard";

const HotelCard = React.memo(({ hotel }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/booking", {
      state: {
        type: "hotel",
        price: hotel.price,
        name: hotel.name,
        location: hotel.location,
        rating: hotel.rating,
      },
    });
  };

  const topBadge = useMemo(
    () => (
      <>
        <Star className="w-4 h-4 text-yellow-400 mr-1" />
        {hotel.rating}
      </>
    ),
    [hotel.rating],
  );

  const subtitle = useMemo(
    () => (
      <p className="text-sm text-slate-500 flex items-center mt-1">
        <LocationOn className="w-4 h-4 text-blue-500 mr-0.5 shrink-0" />
        <span className="truncate">{hotel.location}</span>
      </p>
    ),
    [hotel.location],
  );

  const mainContent = useMemo(
    () => (
      <p className="text-xs text-slate-400 mt-1">
        {hotel.reviews.toLocaleString("en-IN")} reviews
      </p>
    ),
    [hotel.reviews],
  );

  return (
    <BaseCard
      layout="vertical"
      image={hotel.img}
      topBadge={topBadge}
      title={hotel.name}
      subtitle={subtitle}
      mainContent={mainContent}
      price={hotel.price}
      priceLabel="per night"
      actionLabel="BOOK"
      onAction={handleBook}
      className="h-full"
    />
  );
});

HotelCard.displayName = "HotelCard";

export default HotelCard;
