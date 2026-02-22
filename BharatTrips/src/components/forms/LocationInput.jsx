import { LocationOn, ExpandMore } from "@mui/icons-material";

const LocationInput = ({
  label,
  target,
  value,
  onChange,
  activeDropdown,
  setActiveDropdown,
  searchQuery,
  setSearchQuery,
  locations,
  className = "",
  placeholder = "",
}) => {
  const isActive = activeDropdown === target;

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (!isActive) {
          setActiveDropdown(target);
          setSearchQuery(value?.name || "");
        }
      }}
      className={`${className} p-3 px-4 cursor-pointer border-b lg:border-b-0 lg:border-r border-slate-200 group relative transition-colors ${isActive ? "bg-blue-50" : "hover:bg-blue-50/50"}`}
    >
      <div className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-blue-500 flex items-center justify-between whitespace-nowrap">
        {label}{" "}
        <ExpandMore
          className={`w-4 h-4 ml-1 opacity-50 ${isActive ? "opacity-100 text-blue-500" : ""}`}
        />
      </div>
      <div className="h-15 sm:h-20 flex flex-col justify-center">
        {isActive ? (
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xl sm:text-3xl font-bold text-slate-900 mt-1 mb-1 bg-transparent border-none focus:outline-none p-0 placeholder:text-slate-300"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="w-full text-xl sm:text-3xl font-bold text-slate-900 mt-1 mb-1 truncate">
            {value?.name || placeholder}
          </div>
        )}
        <div className="text-[11px] sm:text-[13px] text-slate-500 truncate min-h-4">
          {value?.desc}
        </div>
      </div>

      {isActive && (
        <div className="absolute bottom-[105%] left-0 w-[min(350px,90vw)] bg-white border border-slate-200 rounded-xl shadow-2xl z-100 max-h-70 overflow-y-auto animate-slide-fade">
          <div className="p-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 sticky top-0 border-b border-slate-100">
            Popular Locations
          </div>
          <ul>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc, idx) => (
                <li
                  key={idx}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(loc);
                    setActiveDropdown(null);
                    setSearchQuery("");
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <LocationOn className="w-5 h-5 text-slate-400" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">
                        {loc.name}
                      </span>
                      <span className="text-xs text-slate-500">{loc.desc}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    {loc.code}
                  </span>
                </li>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">
                No cities found
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
