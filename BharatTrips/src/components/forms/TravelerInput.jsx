import { ExpandMore, Remove, Add } from "@mui/icons-material";

const TravelerInput = ({
  searchForm,
  onFormChange,
  activeDropdown,
  setActiveDropdown,
  isHotel = false,
  className = "",
}) => {
  const target = isHotel ? "hotelTravelers" : "travelers";
  const isActive = activeDropdown === target;

  const totalTravelers =
    searchForm.travelers.adults +
    searchForm.travelers.children +
    searchForm.travelers.infants;

  const updateCount = (type, delta) => {
    if (type === "rooms" && isHotel) {
      const newCount = Math.max(1, searchForm.rooms + delta);
      onFormChange({ ...searchForm, rooms: newCount });
    } else {
      const newCount = Math.max(0, searchForm.travelers[type] + delta);
      if (type === "adults" && newCount === 0) return;
      onFormChange({
        ...searchForm,
        travelers: { ...searchForm.travelers, [type]: newCount },
      });
    }
  };

  const renderDropdownContent = () => {
    if (isHotel) {
      return (
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-700">Rooms</div>
              <div className="text-xs text-slate-400">Min 1</div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => updateCount("rooms", -1)}
                className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50"
              >
                <Remove className="w-4 h-4" />
              </button>
              <span className="w-4 text-center font-semibold text-slate-800">
                {searchForm.rooms}
              </span>
              <button
                type="button"
                onClick={() => updateCount("rooms", 1)}
                className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50"
              >
                <Add className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-700">Adults</div>
              <div className="text-xs text-slate-400">&gt; 12 Yrs</div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => updateCount("adults", -1)}
                className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50"
              >
                <Remove className="w-4 h-4" />
              </button>
              <span className="w-4 text-center font-semibold text-slate-800">
                {searchForm.travelers.adults}
              </span>
              <button
                type="button"
                onClick={() => updateCount("adults", 1)}
                className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50"
              >
                <Add className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="space-y-4 mb-6">
            {[
              { id: "adults", label: "Adults", sub: "> 12 Yrs" },
              { id: "children", label: "Children", sub: "2-12 Yrs" },
              { id: "infants", label: "Infants", sub: "< 2 Yrs" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-700">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400">{item.sub}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => updateCount(item.id, -1)}
                    className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    <Remove className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-semibold text-slate-800">
                    {searchForm.travelers[item.id]}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCount(item.id, 1)}
                    className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    <Add className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 mb-4">
            <div className="font-semibold text-slate-700 mb-3">
              Choose Travel Class
            </div>
            <div className="flex flex-wrap gap-2">
              {["Economy/Premium Economy", "Premium Economy", "Business"].map(
                (tClass) => (
                  <button
                    type="button"
                    key={tClass}
                    onClick={() =>
                      onFormChange({
                        ...searchForm,
                        travelers: { ...searchForm.travelers, class: tClass },
                      })
                    }
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${searchForm.travelers.class === tClass ? "bg-blue-500 text-white shadow-md" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                  >
                    {tClass}
                  </button>
                ),
              )}
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setActiveDropdown(isActive ? null : target);
      }}
      className={`${className} p-3 px-4 cursor-pointer group relative transition-colors ${isActive ? "bg-blue-50" : "hover:bg-blue-50/50"}`}
    >
      <div className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-blue-500 flex items-center">
        {isHotel ? "Rooms & Guests" : "Travellers & Class"}{" "}
        <ExpandMore
          className={`w-4 h-4 ml-1 text-blue-500 transition-transform ${isActive ? "rotate-180" : ""}`}
        />
      </div>
      <div className="h-15 sm:h-20 flex flex-col justify-center">
        {isHotel ? (
          <>
            <div className="flex items-baseline mt-1 space-x-1">
              <span className="text-2xl sm:text-4xl font-bold text-slate-900">
                {searchForm.rooms}
              </span>
              <span className="text-base sm:text-lg font-medium text-slate-900">
                Room{searchForm.rooms > 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-[11px] sm:text-[13px] text-slate-500 truncate min-h-4">
              {searchForm.travelers.adults} Adult
              {searchForm.travelers.adults > 1 ? "s" : ""}
              {searchForm.travelers.children > 0 &&
                `, ${searchForm.travelers.children} Child${searchForm.travelers.children > 1 ? "ren" : ""}`}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-baseline mt-1 space-x-1">
              <span className="text-2xl sm:text-4xl font-bold text-slate-900">
                {totalTravelers}
              </span>
              <span className="text-base sm:text-lg font-medium text-slate-900">
                Traveller{totalTravelers > 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-[11px] sm:text-[13px] text-slate-500 truncate min-h-4">
              {searchForm.travelers.class}
            </div>
          </>
        )}
      </div>

      {isActive && (
        <div
          className="absolute bottom-[105%] right-0 w-[min(350px,90vw)] bg-white border border-slate-200 rounded-xl shadow-2xl z-100 p-5 animate-slide-fade cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-semibold text-slate-800 mb-4 text-lg">
            {isHotel ? "Rooms & Guests" : "Travellers & Class"}
          </h3>
          {renderDropdownContent()}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveDropdown(null);
            }}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            APPLY
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelerInput;
