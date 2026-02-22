import { SearchOff } from "@mui/icons-material";

const EmptyState = ({ searchParams, activeFilterCount, onResetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
        <SearchOff className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-xl font-extrabold text-slate-700">
        No Results Found
      </h3>
      <p className="text-slate-400 mt-2 max-w-sm text-sm">
        {activeFilterCount > 0
          ? "Try adjusting your filters to see more results."
          : `We couldn't find any ${searchParams.type} matching your search.`}
      </p>
      {activeFilterCount > 0 && (
        <button
          onClick={onResetFilters}
          className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
