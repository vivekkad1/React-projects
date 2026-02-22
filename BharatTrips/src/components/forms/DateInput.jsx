import { ExpandMore } from "@mui/icons-material";
import { formatDateInfo } from "../../utils/dateUtils";

const DateInput = ({
  label,
  date,
  onDateChange,
  activeDropdown,
  setActiveDropdown,
  target,
  viewDate,
  setViewDate,
  className = "",
  placeholder = "Tap to add a date",
}) => {
  const isActive = activeDropdown === target;
  const dateInfo = date ? formatDateInfo(date) : null;
  const today = new Date();

  const renderCalendarDropdown = () => {
    if (!isActive) return null;

    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanksArray = Array.from({ length: firstDayIndex }, (_, i) => i);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div
        className="absolute bottom-[105%] left-0 w-[min(320px,90vw)] bg-white border border-slate-200 rounded-xl shadow-2xl z-100 p-4 animate-slide-fade cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            className="text-slate-400 hover:text-blue-500 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setViewDate(new Date(currentYear, currentMonth - 1, 1));
            }}
          >
            <ExpandMore className="w-5 h-5 rotate-90" />
          </button>
          <div className="font-semibold text-slate-800">
            {months[currentMonth]} {currentYear}
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-blue-500 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setViewDate(new Date(currentYear, currentMonth + 1, 1));
            }}
          >
            <ExpandMore className="w-5 h-5 -rotate-90" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div
              key={d}
              className="text-center text-xs font-semibold text-slate-400"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanksArray.map((b) => (
            <div key={`blank-${b}`} className="h-8"></div>
          ))}
          {daysArray.map((day) => {
            const dateObj = new Date(currentYear, currentMonth, day);
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();
            const isSelected =
              date &&
              date.getDate() === day &&
              date.getMonth() === currentMonth &&
              date.getFullYear() === currentYear;

            const isPast =
              dateObj <
              new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return (
              <button
                type="button"
                key={day}
                disabled={isPast}
                onClick={(e) => {
                  e.stopPropagation();
                  onDateChange(dateObj);
                  setActiveDropdown(null);
                }}
                className={`h-8 w-8 mx-auto rounded-md flex items-center justify-center text-sm font-semibold transition-colors
                  ${isPast ? "text-slate-300 cursor-not-allowed" : "hover:bg-blue-100 text-slate-700"}
                  ${isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
                  ${isToday && !isSelected ? "border border-blue-500 text-blue-600" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        const nextState = isActive ? null : target;
        setActiveDropdown(nextState);
        if (nextState === target) {
          setViewDate(date || new Date());
        }
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
        {date ? (
          <>
            <div className="flex items-baseline mt-1 space-x-1">
              <span className="text-2xl sm:text-4xl font-bold text-slate-900">
                {dateInfo.dayNum}
              </span>
              <span className="text-base sm:text-lg font-medium text-slate-900">
                {dateInfo.monthYear}
              </span>
            </div>
            <div className="text-[11px] sm:text-[13px] text-slate-500 min-h-4">
              {dateInfo.dayName}
            </div>
          </>
        ) : (
          <div className="text-sm sm:text-lg font-bold text-slate-900 mt-1 mb-1 truncate">
            {placeholder}
          </div>
        )}
      </div>
      {renderCalendarDropdown()}
    </div>
  );
};

export default DateInput;
