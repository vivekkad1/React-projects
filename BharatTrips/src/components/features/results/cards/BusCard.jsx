import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  DirectionsBus,
  AccessTime,
  AcUnit,
  AirlineSeatReclineExtra,
  Close,
  EventSeat,
  RadioButtonChecked,
} from "@mui/icons-material";
import BaseCard from "../../../common/BaseCard";

const generateFlatSeats = (busId) => {
  const seed = parseInt(busId.replace(/\D/g, ""), 10) || 1;
  const totalRows = 10;
  const layout = [];

  for (let r = 0; r < totalRows; r++) {
    const row = [];
    const labels = ["A", "B", "C", "D"];
    for (let c = 0; c < 5; c++) {
      if (c === 2) {
        row.push({ type: "aisle" });
      } else {
        const labelIdx = c < 2 ? c : c - 1;
        const seatNumber = r * 4 + labelIdx + 1;
        const id = `${r + 1}${labels[labelIdx]}`;
        const hash = (seed * 31 + seatNumber * 17) % 100;
        const status = hash < 30 ? "booked" : "available";
        row.push({ type: "seat", id, status, label: id });
      }
    }
    layout.push(row);
  }
  return layout;
};

const SeatIcon = ({ seat, isSelected, onSelect }) => {
  if (seat.type === "aisle") {
    return <div className="w-8 h-8 sm:w-9 sm:h-9"></div>;
  }

  const isBooked = seat.status === "booked";

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isBooked) {
      onSelect(seat.id);
    }
  };

  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={handleClick}
      title={isBooked ? `${seat.label} - Booked` : `${seat.label} - Available`}
      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-200 border-2 flex items-center justify-center
                ${
                  isBooked
                    ? "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
                    : isSelected
                      ? "bg-blue-600 border-blue-700 text-white shadow-md shadow-blue-500/30 scale-105"
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                }`}
    >
      {seat.label}
    </button>
  );
};

const BusSeatSelector = ({
  bus,
  selectedSeats,
  onSelectSeat,
  onClose,
  onBook,
}) => {
  const seatLayout = useMemo(() => generateFlatSeats(bus.id), [bus.id]);
  const totalPrice = selectedSeats.length * bus.price;

  return (
    <div className="p-5 sm:p-6 w-full">
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-bold text-slate-800 flex items-center text-sm">
          <EventSeat className="w-4 h-4 mr-2 text-blue-500" />
          Select Your Seats
        </h4>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <Close className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 inline-block shadow-sm">
            <div className="flex items-center justify-end mb-3 pr-1">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                <RadioButtonChecked className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className="space-y-1.5">
                {seatLayout.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex items-center gap-1 sm:gap-1.5 justify-center"
                  >
                    {row.map((seat, colIdx) => (
                      <SeatIcon
                        key={
                          seat.type === "aisle"
                            ? `aisle-${rowIdx}-${colIdx}`
                            : seat.id
                        }
                        seat={seat}
                        isSelected={selectedSeats.includes(seat.id)}
                        onSelect={onSelectSeat}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mt-4 pt-3 border-t border-dashed border-slate-200">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-slate-200 bg-white"></div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-blue-700 bg-blue-600"></div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Selected
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border-2 border-slate-200 bg-slate-100"></div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Booked
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sticky top-4">
            <h5 className="font-bold text-slate-800 text-sm mb-3">
              Booking Summary
            </h5>

            {selectedSeats.length > 0 ? (
              <>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Seats</span>
                    <span className="font-semibold text-slate-800">
                      {selectedSeats.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Count</span>
                    <span className="font-semibold text-slate-800">
                      {selectedSeats.length} seat
                      {selectedSeats.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Per seat</span>
                    <span className="font-semibold text-slate-800">
                      ₹{bus.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 mb-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 text-right mt-0.5">
                    + ₹{Math.floor(totalPrice * 0.05).toLocaleString("en-IN")}{" "}
                    taxes
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBook();
                  }}
                  className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 text-sm"
                >
                  Proceed to Book
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <EventSeat className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                  Tap on available seats to select
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BusCard = ({ bus }) => {
  const navigate = useNavigate();
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const isAC =
    bus.type.toLowerCase().includes("a/c") ||
    bus.type.toLowerCase().includes("volvo");
  const isSleeper = bus.type.toLowerCase().includes("sleeper");

  const handleSelectSeat = useCallback((seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : prev.length < 6
          ? [...prev, seatId]
          : prev,
    );
  }, []);

  const handleBook = useCallback(() => {
    navigate("/booking", {
      state: {
        type: "bus",
        price: bus.price * selectedSeats.length,
        operator: bus.operator,
        busType: bus.type,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        seats: selectedSeats,
        seatCount: selectedSeats.length,
        pricePerSeat: bus.price,
      },
    });
  }, [navigate, bus, selectedSeats]);

  const handleToggleSeats = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowSeats((prev) => {
      if (prev) setSelectedSeats([]);
      return !prev;
    });
  }, []);

  const mainContent = useMemo(
    () => (
      <div className="flex items-center justify-between w-full px-0 sm:px-6">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {bus.departureTime}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            Departure
          </div>
        </div>
        <div className="flex-1 px-4 flex flex-col items-center">
          <div className="flex items-center text-xs text-slate-400 font-semibold mb-1.5">
            <AccessTime className="w-3 h-3 mr-1" />
            {bus.duration}
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
            {bus.arrivalTime}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            Arrival
          </div>
        </div>
      </div>
    ),
    [bus],
  );

  const badges = useMemo(() => {
    const b = [];
    if (isAC)
      b.push({
        icon: AcUnit,
        label: "A/C",
        className: "bg-blue-50 text-blue-700 border-blue-100",
      });
    if (isSleeper)
      b.push({
        icon: AirlineSeatReclineExtra,
        label: "Sleeper",
        className: "bg-slate-100 text-slate-700 border-slate-200",
      });
    return b;
  }, [isAC, isSleeper]);

  const footerContent = showSeats ? (
    <BusSeatSelector
      bus={bus}
      selectedSeats={selectedSeats}
      onSelectSeat={handleSelectSeat}
      onClose={handleToggleSeats}
      onBook={handleBook}
    />
  ) : (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center text-xs font-semibold text-slate-600">
        <DirectionsBus className="w-4 h-4 mr-1.5 text-blue-500" /> Live Tracking
        Available
      </div>
      <span className="text-xs text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors">
        View Amenities →
      </span>
    </div>
  );

  return (
    <BaseCard
      icon={DirectionsBus}
      title={bus.operator}
      subtitle={bus.type}
      mainContent={mainContent}
      price={bus.price}
      priceLabel="per seat"
      actionLabel={showSeats ? "Hide Seats" : "Select Seats"}
      onAction={handleToggleSeats}
      badges={badges}
      footerContent={footerContent}
      className={showSeats ? "border-blue-200 shadow-xl shadow-blue-500/5" : ""}
    />
  );
};

BusCard.displayName = "BusCard";

export default BusCard;
