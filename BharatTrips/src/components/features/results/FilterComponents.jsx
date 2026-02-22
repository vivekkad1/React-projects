import { Check } from "@mui/icons-material";

export const FilterCheckbox = ({ label, checked, onChange }) => (
  <label
    className="flex items-center space-x-3 cursor-pointer group"
    onClick={onChange}
  >
    <div
      className={`w-4.5 h-4.5 border-2 rounded flex items-center justify-center transition-all duration-300 ${
        checked
          ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-600/25"
          : "border-slate-300 bg-white group-hover:border-blue-400"
      }`}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </div>
    <span
      className={`text-sm transition-colors duration-200 ${checked ? "font-semibold text-slate-800" : "text-slate-500 group-hover:text-slate-700"}`}
    >
      {label}
    </span>
  </label>
);

export const RenderFilters = ({
  type,
  config,
  activeFilters,
  onToggleFilter,
}) => {
  if (!config || !config[type]) return null;

  return (
    <>
      {config[type].sections.map((section) => (
        <div
          key={section.id}
          className="mb-6 border-b border-slate-100 pb-6 last:border-b-0 last:pb-0 last:mb-0"
        >
          <h4 className="font-bold text-slate-700 mb-3">{section.title}</h4>
          <div className="space-y-3">
            {section.options.map((opt) => (
              <FilterCheckbox
                key={opt}
                label={opt}
                checked={activeFilters[section.id]?.has(opt) || false}
                onChange={() => onToggleFilter(section.id, opt)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
