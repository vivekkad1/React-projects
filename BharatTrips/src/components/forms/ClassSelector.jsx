import { ExpandMore } from "@mui/icons-material";

const TRAIN_CLASSES = [
  { id: "SL", label: "Sleeper (SL)" },
  { id: "3A", label: "Third AC (3A)" },
  { id: "2A", label: "Second AC (2A)" },
  { id: "1A", label: "First AC (1A)" },
  { id: "CC", label: "Chair Car (CC)" },
  { id: "EC", label: "Exec. Chair Car (EC)" },
];

const BUS_TYPES = [
  { id: "any", label: "Any" },
  { id: "seater", label: "Seater" },
  { id: "sleeper", label: "Sleeper" },
  { id: "ac-seater", label: "A/C Seater" },
  { id: "ac-sleeper", label: "A/C Sleeper" },
];

const ClassSelector = ({
  label,
  value,
  options,
  onChange,
  activeDropdown,
  setActiveDropdown,
  target,
  className = "",
}) => {
  const isActive = activeDropdown === target;
  const selectedOption = options.find((o) => o.id === value);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setActiveDropdown(isActive ? null : target);
      }}
      className={`${className} p-3 px-4 cursor-pointer group relative transition-colors ${isActive ? "bg-blue-50" : "hover:bg-blue-50/50"}`}
    >
      <div className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-blue-500 flex items-center">
        {label}
        <ExpandMore
          className={`w-4 h-4 ml-1 text-blue-500 transition-transform ${isActive ? "rotate-180" : ""}`}
        />
      </div>
      <div className="h-15 sm:h-20 flex flex-col justify-center">
        <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 truncate">
          {selectedOption?.label || value || "Select"}
        </div>
        <div className="text-[11px] sm:text-[13px] text-transparent select-none">
          Class
        </div>
      </div>

      {isActive && (
        <div
          className="absolute bottom-[105%] right-0 w-[min(280px,90vw)] bg-white border border-slate-200 rounded-xl shadow-2xl z-100 p-4 animate-slide-fade cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-semibold text-slate-800 mb-3 text-base">
            {label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setActiveDropdown(null);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  value === option.id
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { TRAIN_CLASSES, BUS_TYPES };
export default ClassSelector;
