import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  Flight,
  Hotel,
  Train,
  DirectionsBus,
  DirectionsCar,
  SwapHoriz,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearchParams } from "../../../store/slices/appSlice";
import { locationData } from "../../../data/mockData";
import { generateTimeSlots } from "../../../utils/dateUtils";

import TabSelector from "./TabSelector";
import LocationInput from "../../forms/LocationInput";
import DateInput from "../../forms/DateInput";
import TravelerInput from "../../forms/TravelerInput";
import TimeInput from "../../forms/TimeInput";
import ClassSelector, {
  TRAIN_CLASSES,
  BUS_TYPES,
} from "../../forms/ClassSelector";
import SearchFormContainer from "../../common/SearchFormContainer";

const TABS = [
  { id: "flights", label: "Flights", icon: Flight },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "trains", label: "Trains", icon: Train },
  { id: "buses", label: "Buses", icon: DirectionsBus },
  { id: "cabs", label: "Cabs", icon: DirectionsCar },
];

const TAB_IDS = TABS.map((t) => t.id);

const SearchWidget = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = useSelector((state) => state.app.searchParams);

  const [activeTab, setActiveTab] = useState(searchParams.type);

  const getInitialTabState = () => {
    const initialState = {};
    TAB_IDS.forEach((tab) => {
      const locations = locationData[tab] || [];
      const hyd = locations.find(
        (l) => l.name === "Hyderabad" || l.code === "HYD" || l.code === "HYB",
      );
      const blr = locations.find(
        (l) => l.name === "Bengaluru" || l.code === "BLR" || l.code === "SBC",
      );

      initialState[tab] = {
        type: tab,
        from: hyd || locations[0] || { name: "Origin", code: "ORG", desc: "" },
        to: blr ||
          locations[1] || { name: "Destination", code: "DST", desc: "" },
        date: new Date(),
        returnDate: null,
        travelers: {
          adults: 1,
          children: 0,
          infants: 0,
          class: "Economy/Premium Economy",
        },
        rooms: 1,
        priceRange: "₹0-₹1500",
        trainClass: "SL",
        busType: "any",
        time: "10:00 AM",
      };
    });
    initialState[searchParams.type] = {
      ...initialState[searchParams.type],
      ...searchParams,
    };
    return initialState;
  };

  const [tabState, setTabState] = useState(getInitialTabState);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const searchForm = tabState[activeTab];

  const setSearchForm = useCallback(
    (newStateOrFn) => {
      setTabState((prev) => {
        const currentTabState = prev[activeTab];
        const newState =
          typeof newStateOrFn === "function"
            ? newStateOrFn(currentTabState)
            : newStateOrFn;

        return {
          ...prev,
          [activeTab]: { ...currentTabState, ...newState },
        };
      });
    },
    [activeTab],
  );

  const wrapperRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = useCallback(
    (newTab) => {
      setActiveTab(newTab);
      setActiveDropdown(null);
      setSearchQuery("");
      dispatch(updateSearchParams(tabState[newTab]));
    },
    [dispatch, tabState],
  );

  const { date: searchDate, time: searchTime } = searchForm;

  useEffect(() => {
    if (activeTab === "cabs" && searchDate) {
      const slots = generateTimeSlots(searchDate);
      if (slots.length > 0 && !slots.includes(searchTime)) {
        setTimeout(() => {
          setSearchForm((prev) => ({ ...prev, time: slots[0] }));
        }, 0);
      }
    }
  }, [searchDate, activeTab, searchTime, setSearchForm]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateSearchParams({ ...searchForm, type: activeTab }));
      navigate("/search");
    },
    [dispatch, searchForm, activeTab, navigate],
  );

  const handleSwap = useCallback(() => {
    setSearchForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  }, [setSearchForm]);

  const handleLocationChange = useCallback(
    (target, value) => {
      setSearchForm((prev) => ({ ...prev, [target]: value }));
    },
    [setSearchForm],
  );

  const handleDateChange = useCallback(
    (target, date) => {
      setSearchForm((prev) => ({ ...prev, [target]: date }));
    },
    [setSearchForm],
  );

  const handleTimeChange = useCallback(
    (val) => {
      setSearchForm((prev) => ({ ...prev, time: val }));
    },
    [setSearchForm],
  );

  const handleClassChange = useCallback(
    (field, val) => {
      setSearchForm((prev) => ({ ...prev, [field]: val }));
    },
    [setSearchForm],
  );

  const currentLocations = useMemo(
    () => locationData[activeTab] || [],
    [activeTab],
  );

  const cabTimeSlots = useMemo(() => {
    if (activeTab === "cabs" && searchForm.date) {
      return generateTimeSlots(searchForm.date);
    }
    return [];
  }, [activeTab, searchForm.date]);

  const swapLeft = useMemo(() => {
    if (screenWidth >= 1024) return "25%";
    if (screenWidth >= 640) return "50%";
  }, [screenWidth]);

  const TAB_CONFIGS = useMemo(
    () => ({
      flights: {
        fields: [
          {
            type: "location",
            label: "From",
            target: "from",
            width: "lg:w-[25%]",
          },
          { type: "swap", left: swapLeft },
          { type: "location", label: "To", target: "to", width: "lg:w-[25%]" },
          {
            type: "date",
            label: "Departure",
            target: "date",
            width: "lg:w-[15%]",
          },
          {
            type: "date",
            label: "Return",
            target: "returnDate",
            width: "lg:w-[15%]",
            placeholder: "Tap to add return date",
          },
          { type: "traveler", width: "lg:w-[20%]" },
        ],
      },
      hotels: {
        fields: [
          {
            type: "location",
            label: "City",
            target: "from",
            width: "lg:w-[50%]",
          },
          {
            type: "date",
            label: "Check-In",
            target: "date",
            width: "lg:w-[15%]",
          },
          {
            type: "date",
            label: "Check-Out",
            target: "returnDate",
            width: "lg:w-[15%]",
            placeholder: "Tap to add check-out",
          },
          { type: "traveler", isHotel: true, width: "lg:w-[20%]" },
        ],
      },
      trains: {
        fields: [
          {
            type: "location",
            label: "From",
            target: "from",
            width: "lg:w-[25%]",
          },
          { type: "swap", left: swapLeft },
          { type: "location", label: "To", target: "to", width: "lg:w-[25%]" },
          {
            type: "date",
            label: "Departure",
            target: "date",
            width: "lg:w-[15%]",
          },
          {
            type: "date",
            label: "Return",
            target: "returnDate",
            width: "lg:w-[15%]",
            placeholder: "Tap to add return date",
          },
          {
            type: "class",
            label: "Train Class",
            target: "trainClass",
            options: TRAIN_CLASSES,
            width: "lg:w-[20%]",
          },
        ],
      },
      buses: {
        fields: [
          {
            type: "location",
            label: "From",
            target: "from",
            width: "lg:w-[25%]",
          },
          { type: "swap", left: swapLeft },
          { type: "location", label: "To", target: "to", width: "lg:w-[25%]" },
          {
            type: "date",
            label: "Departure",
            target: "date",
            width: "lg:w-[15%]",
          },
          {
            type: "date",
            label: "Return",
            target: "returnDate",
            width: "lg:w-[15%]",
            placeholder: "Tap to add return date",
          },
          {
            type: "class",
            label: "Bus Type",
            target: "busType",
            options: BUS_TYPES,
            width: "lg:w-[20%]",
          },
        ],
      },
      cabs: {
        fields: [
          {
            type: "location",
            label: "From",
            target: "from",
            width: "lg:w-[25%]",
          },
          { type: "swap", left: swapLeft },
          { type: "location", label: "To", target: "to", width: "lg:w-[25%]" },
          {
            type: "date",
            label: "Departure",
            target: "date",
            width: "lg:w-[15%]",
          },
          {
            type: "date",
            label: "Return",
            target: "returnDate",
            width: "lg:w-[15%]",
            placeholder: "Tap to add return date",
          },
          {
            type: "time",
            label: "Pickup Time",
            target: "time",
            width: "lg:w-[20%]",
          },
        ],
      },
    }),
    [swapLeft],
  );

  const renderField = (field, index) => {
    switch (field.type) {
      case "location":
        return (
          <LocationInput
            key={index}
            label={field.label}
            target={field.target}
            value={searchForm[field.target]}
            onChange={(val) => handleLocationChange(field.target, val)}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locations={currentLocations}
            className={`w-full ${field.width}`}
          />
        );
      case "swap":
        return (
          <div
            key={index}
            onClick={handleSwap}
            style={{ left: field.left }}
            className="flex absolute -ml-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-white border border-slate-200 rounded-full shadow-sm text-blue-500 hover:shadow-md cursor-pointer hover:bg-slate-50 transition-all text-sm font-bold sm:top-10 lg:top-1/2"
          >
            <SwapHoriz className="w-4 h-4" />
          </div>
        );
      case "date":
        return (
          <DateInput
            key={index}
            label={field.label}
            target={field.target}
            date={searchForm[field.target]}
            onDateChange={(date) => handleDateChange(field.target, date)}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            viewDate={viewDate}
            setViewDate={setViewDate}
            className={`w-full ${field.width}`}
            placeholder={field.placeholder}
          />
        );
      case "traveler":
        return (
          <TravelerInput
            key={index}
            searchForm={searchForm}
            onFormChange={setSearchForm}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            isHotel={field.isHotel}
            className={`w-full ${field.width}`}
          />
        );
      case "class":
        return (
          <ClassSelector
            key={index}
            label={field.label}
            value={searchForm[field.target]}
            options={field.options}
            onChange={(val) => handleClassChange(field.target, val)}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            target={field.target}
            className={`w-full ${field.width}`}
          />
        );
      case "time":
        return (
          <TimeInput
            key={index}
            label={field.label}
            target={field.target}
            time={searchForm[field.target]}
            onTimeChange={handleTimeChange}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            slots={cabTimeSlots}
            className={`w-full ${field.width}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`lg:w-300 md:w-162.5 mx-auto relative z-60 px-4 ${className}`}
      ref={wrapperRef}
    >
      <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.1)] pb-8 sm:pb-12 pt-4 relative">
        <TabSelector
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={TABS}
        />

        <form onSubmit={handleSearch} className="px-3 sm:px-8">
          <div key={activeTab} className="animate-slide-fade">
            <SearchFormContainer>
              {TAB_CONFIGS[activeTab].fields.map((field, idx) =>
                renderField(field, idx),
              )}
            </SearchFormContainer>
          </div>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-10 rounded-full shadow-lg uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchWidget;
