import { ExpandMore, AccessTime } from "@mui/icons-material";

const TimeInput = ({
  label,
  time,
  onTimeChange,
  activeDropdown,
  setActiveDropdown,
  target,
  className = "",
  slots = [],
}) => {
  const isActive = activeDropdown === target;

  const renderDropdown = () => {
    if (!isActive) return null;

    return (
      <div
        className="absolute bottom-[105%] left-0 w-[min(200px,90vw)] bg-white border border-slate-200 rounded-xl shadow-2xl z-100 max-h-75 overflow-y-auto animate-slide-fade"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 sticky top-0 border-b border-slate-100">
          Select Time
        </div>
        <ul>
          {slots.map((slot) => (
            <li
              key={slot}
              className={`px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-0 ${time === slot ? "bg-blue-50/50" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onTimeChange(slot);
                setActiveDropdown(null);
              }}
            >
              <span
                className={`font-semibold ${time === slot ? "text-blue-600" : "text-slate-700"}`}
              >
                {slot}
              </span>
              {time === slot && (
                <AccessTime className="w-4 h-4 text-blue-500" />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setActiveDropdown(isActive ? null : target);
      }}
      className={`${className} p-3 px-4 cursor-pointer border-b lg:border-b-0 lg:border-r border-slate-200 group relative transition-colors ${isActive ? "bg-blue-50" : "hover:bg-blue-50/50"}`}
    >
      <div className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-blue-500 flex items-center">
        {label}{" "}
        <ExpandMore
          className={`w-4 h-4 ml-1 text-blue-500 transition-transform ${isActive ? "rotate-180" : ""}`}
        />
      </div>

      <div className="h-15 sm:h-20 flex flex-col justify-center">
        <div className="w-full text-xl sm:text-3xl font-bold text-slate-900 mt-1 mb-1 truncate">
          {time}
        </div>
        <div className="text-[11px] sm:text-[13px] text-slate-500 truncate">
          Pickup Time
        </div>
      </div>

      {renderDropdown()}
    </div>
  );
};

export default TimeInput;
