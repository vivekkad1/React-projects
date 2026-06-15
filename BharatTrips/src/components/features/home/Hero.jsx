import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlane, FaHotel, FaTrain, FaBus, FaCar
} from "react-icons/fa";
import { FiRefreshCw, FiChevronDown, FiMapPin } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearchParams } from "../../../store/slices/appSlice";

const TOP_TABS = [
  { id: "flights", label: "Flights", icon: FaPlane },
  { id: "hotels", label: "Hotels", icon: FaHotel },
  { id: "trains", label: "Trains", icon: FaTrain },
  { id: "buses", label: "Buses", icon: FaBus },
  { id: "cabs", label: "Cabs", icon: FaCar },
];

const FAMOUS_PLACES = [
  { name: "Delhi", code: "DEL", desc: "New Delhi, India" },
  { name: "Mumbai", code: "BOM", desc: "Maharashtra, India" },
  { name: "Bengaluru", code: "BLR", desc: "Karnataka, India" },
  { name: "Goa", code: "GOI", desc: "Goa, India" },
  { name: "Jaipur", code: "JAI", desc: "Rajasthan, India" },
  { name: "Kochi", code: "COK", desc: "Kerala, India" },
  { name: "Kolkata", code: "CCU", desc: "West Bengal, India" },
  { name: "Hyderabad", code: "HYD", desc: "Telangana, India" },
  { name: "Chennai", code: "MAA", desc: "Tamil Nadu, India" },
  { name: "Pune", code: "PNQ", desc: "Maharashtra, India" },
];

const CustomDateInput = React.forwardRef(({ value, onClick, label, date, emptyText }, ref) => (
  <div onClick={onClick} ref={ref} className="w-full h-full flex flex-col justify-center outline-none">
    <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
      {label} <FiChevronDown className="w-4 h-4 text-blue-500" />
    </span>
    {date ? (
      <>
        <div className="text-4xl font-black text-slate-900 mb-1 flex items-baseline gap-1">
          {format(date, "d")} <span className="text-xl font-medium">{format(date, "MMM''yy")}</span>
        </div>
        <div className="text-sm text-slate-500">{format(date, "EEEE")}</div>
      </>
    ) : (
      <div className="text-sm text-slate-400 mt-2 pr-4 leading-tight">
        {emptyText}
      </div>
    )}
  </div>
));
CustomDateInput.displayName = "CustomDateInput";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("flights");

  // Dates state
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000)); // +1 day
  
  const [travelDate, setTravelDate] = useState(new Date());

  // Location state
  const [fromLocation, setFromLocation] = useState(FAMOUS_PLACES[0]);
  const [toLocation, setToLocation] = useState(FAMOUS_PLACES[1]);
  const [hotelLocation, setHotelLocation] = useState(FAMOUS_PLACES[3]);

  // Dropdown state
  const [activeDropdown, setActiveDropdown] = useState(null); // 'from', 'to', 'hotel', null
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    let dateToUse = departureDate;
    if (activeTab === 'hotels') dateToUse = checkInDate;
    else if (activeTab === 'trains' || activeTab === 'buses' || activeTab === 'cabs') dateToUse = travelDate;

    const payload = {
      type: activeTab,
      from: fromLocation,
      to: activeTab === 'hotels' ? hotelLocation : toLocation,
      date: dateToUse ? dateToUse.toISOString() : new Date().toISOString(),
      returnDate: returnDate ? returnDate.toISOString() : null,
      travelers: {
        adults: 1,
        children: 0,
        infants: 0,
        class: "Economy/Premium Economy"
      }
    };
    
    dispatch(updateSearchParams(payload));
    navigate("/search");
  };

  const handleSwapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const LocationDropdown = ({ onSelect }) => (
    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 max-h-80 overflow-y-auto">
      <div className="px-4 pb-2 mb-2 border-b border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Popular Cities in India</p>
      </div>
      {FAMOUS_PLACES.map((place) => (
        <div 
          key={place.code} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(place);
            setActiveDropdown(null);
          }}
          className="flex items-center gap-4 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-blue group-hover:text-white transition-colors">
            <FiMapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 flex items-center gap-2">
              {place.name} <span className="text-xs text-slate-400 font-medium bg-slate-100 px-1.5 rounded">{place.code}</span>
            </div>
            <div className="text-xs text-slate-500">{place.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInputs = () => {
    switch (activeTab) {
      case "flights":
      case "trains":
      case "buses":
      case "cabs":
        return (
          <div className="flex flex-col lg:flex-row border border-slate-200 rounded-xl relative" ref={dropdownRef}>
            {/* From & To Section */}
            <div className="flex flex-1 relative">
              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'from' ? null : 'from')}
                className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer rounded-l-xl transition-colors relative z-30"
              >
                <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
                  From <FiChevronDown className="w-4 h-4 text-blue-500" />
                </span>
                <div className="text-4xl font-black text-slate-900 mb-1">{fromLocation.name}</div>
                <div className="text-sm text-slate-500 truncate">{fromLocation.desc}</div>
                <AnimatePresence>
                  {activeDropdown === 'from' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <LocationDropdown onSelect={setFromLocation} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={handleSwapLocations}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-blue-500 hover:shadow-md z-40 shadow-sm transition-all hover:rotate-180"
              >
                <FiRefreshCw className="w-3 h-3" />
              </button>

              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'to' ? null : 'to')}
                className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-l border-slate-200 transition-colors relative z-20"
              >
                <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
                  To <FiChevronDown className="w-4 h-4 text-blue-500" />
                </span>
                <div className="text-4xl font-black text-slate-900 mb-1">{toLocation.name}</div>
                <div className="text-sm text-slate-500 truncate">{toLocation.desc}</div>
                <AnimatePresence>
                  {activeDropdown === 'to' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <LocationDropdown onSelect={setToLocation} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Dates & Misc Section based on Tab */}
            {activeTab === 'flights' && (
              <>
                <div className="flex flex-1 border-t lg:border-t-0 lg:border-l border-slate-200">
                  <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer transition-colors relative z-10">
                    <DatePicker
                      selected={departureDate}
                      onChange={(date) => setDepartureDate(date)}
                      selectsStart
                      startDate={departureDate}
                      endDate={returnDate}
                      minDate={new Date()}
                      customInput={<CustomDateInput label="Departure" date={departureDate} />}
                      wrapperClassName="w-full"
                    />
                  </div>
                  <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-l border-slate-200 transition-colors flex flex-col justify-center relative z-10">
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      selectsEnd
                      startDate={departureDate}
                      endDate={returnDate}
                      minDate={departureDate}
                      customInput={<CustomDateInput label="Return" date={returnDate} emptyText="Tap to add a return date for bigger discounts" />}
                      wrapperClassName="w-full"
                      isClearable
                    />
                  </div>
                </div>
                <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-t lg:border-t-0 lg:border-l border-slate-200 rounded-r-xl transition-colors">
                  <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
                    Travellers & Class <FiChevronDown className="w-4 h-4 text-blue-500" />
                  </span>
                  <div className="text-4xl font-black text-slate-900 mb-1 flex items-center gap-2">
                    1 <span className="text-xl font-medium text-slate-700">Economy...</span>
                  </div>
                  <div className="text-sm text-slate-500 flex gap-3">
                    <span>Adults: 1</span> <span>Children: 0</span>
                  </div>
                </div>
              </>
            )}

            {(activeTab === 'trains' || activeTab === 'buses' || activeTab === 'cabs') && (
              <>
                <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-t lg:border-t-0 lg:border-l border-slate-200 transition-colors relative z-10">
                  <DatePicker
                    selected={travelDate}
                    onChange={(date) => setTravelDate(date)}
                    minDate={new Date()}
                    customInput={<CustomDateInput label="Travel Date" date={travelDate} />}
                    wrapperClassName="w-full"
                  />
                </div>
                
                {activeTab === 'trains' && (
                  <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-t lg:border-t-0 lg:border-l border-slate-200 rounded-r-xl transition-colors">
                    <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
                      Class <FiChevronDown className="w-4 h-4 text-blue-500" />
                    </span>
                    <div className="text-3xl font-black text-slate-900 mb-1 mt-2">
                      All Classes
                    </div>
                  </div>
                )}

                {activeTab === 'cabs' && (
                  <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-t lg:border-t-0 lg:border-l border-slate-200 rounded-r-xl transition-colors">
                    <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
                      Pickup Time <FiChevronDown className="w-4 h-4 text-blue-500" />
                    </span>
                    <div className="text-3xl font-black text-slate-900 mb-1 mt-2">
                      10:00 AM
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );

      case "hotels":
        return (
          <div className="flex flex-col lg:flex-row border border-slate-200 rounded-xl relative" ref={dropdownRef}>
            {/* City */}
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'hotel' ? null : 'hotel')}
              className="flex-[1.5] p-4 hover:bg-blue-50/30 cursor-pointer rounded-l-xl transition-colors relative z-30"
            >
              <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
                City, Property Name Or Location <FiChevronDown className="w-4 h-4 text-blue-500" />
              </span>
              <div className="text-4xl font-black text-slate-900 mb-1">{hotelLocation.name}</div>
              <div className="text-sm text-slate-500 truncate">{hotelLocation.desc}</div>
              <AnimatePresence>
                {activeDropdown === 'hotel' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <LocationDropdown onSelect={setHotelLocation} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Check-In & Check-Out */}
            <div className="flex flex-1 border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer transition-colors relative z-10">
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => {
                    setCheckInDate(date);
                    if (date >= checkOutDate) {
                      setCheckOutDate(new Date(date.getTime() + 86400000));
                    }
                  }}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  customInput={<CustomDateInput label="Check-In" date={checkInDate} />}
                  wrapperClassName="w-full"
                />
              </div>
              <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-l border-slate-200 transition-colors relative z-10">
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date(checkInDate.getTime() + 86400000)}
                  customInput={<CustomDateInput label="Check-Out" date={checkOutDate} />}
                  wrapperClassName="w-full"
                />
              </div>
            </div>

            {/* Rooms & Guests */}
            <div className="flex-1 p-4 hover:bg-blue-50/30 cursor-pointer border-t lg:border-t-0 lg:border-l border-slate-200 rounded-r-xl transition-colors">
              <span className="text-sm text-slate-500 flex items-center gap-1 font-medium mb-1">
                Rooms & Guests <FiChevronDown className="w-4 h-4 text-blue-500" />
              </span>
              <div className="text-4xl font-black text-slate-900 mb-1 flex items-center gap-2">
                2 <span className="text-xl font-medium text-slate-700">Guests</span>
              </div>
              <div className="text-sm text-slate-500">
                1 Room
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center pt-28 pb-16 min-h-[500px]">
      {/* MMT Split Background */}
      <div className="absolute top-0 left-0 w-full h-[55vh] min-h-[400px] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1422]/90 to-[#0a1422]/60"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-8">
        {/* Main Widget Container */}
        <div className="mmt-search-widget relative pt-12 pb-16 px-8 mt-12 bg-white rounded-xl">
          
          {/* Top Tabs Container (Overlapping Top Edge) */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-sm border border-slate-200 flex justify-center items-center px-2 py-1 w-11/12 max-w-3xl overflow-x-auto hide-scrollbar z-20">
            {TOP_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 transition-all duration-200 cursor-pointer outline-none border-b-2 ${
                    isActive 
                      ? "border-primary-blue text-primary-blue" 
                      : "border-transparent text-slate-500 hover:text-primary-blue"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary-blue" : "text-slate-400"}`} />
                  <span className="text-sm font-bold whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Dynamic Inputs Grid */}
          <div className="mb-6">
            {renderInputs()}
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#53b2fe] to-[#065af3] text-white font-black text-2xl rounded-full px-20 py-3 shadow-lg cursor-pointer uppercase tracking-wide hover:shadow-xl transition-shadow"
          >
            Search
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
