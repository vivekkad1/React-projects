import { useMemo, useCallback } from "react";
import { FilterList, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { formatDateInfo } from "../utils/dateUtils";
import { FILTER_CONFIG } from "../config/filters";
import { useSearchFilters } from "../hooks/useSearchFilters";
import { RenderFilters } from "../components/features/results/FilterComponents";
import FlightCard from "../components/features/results/cards/FlightCard";
import HotelCard from "../components/features/results/cards/HotelCard";
import TrainCard from "../components/features/results/cards/TrainCard";
import BusCard from "../components/features/results/cards/BusCard";
import CabCard from "../components/features/results/cards/CabCard";
import ResultsHeader from "../components/features/results/ResultsHeader";
import EmptyState from "../components/features/results/EmptyState";

const SearchResults = () => {
  const searchParams = useSelector((state) => state.app.searchParams);
  const dateInfo = useMemo(
    () => formatDateInfo(searchParams.date),
    [searchParams.date],
  );

  const {
    results,
    activeFilters,
    activeFilterCount,
    showMobileFilters,
    setShowMobileFilters,
    handleToggleFilter,
    handleResetAll,
  } = useSearchFilters(searchParams);

  const renderResultCard = useCallback(
    (item) => {
      const cardProps = { key: item.id };
      switch (searchParams.type) {
        case "flights":
          return (
            <FlightCard
              {...cardProps}
              flight={item}
              fromCode={searchParams.from?.code}
              toCode={searchParams.to?.code}
            />
          );
        case "hotels":
          return <HotelCard {...cardProps} hotel={item} />;
        case "trains":
          return <TrainCard {...cardProps} train={item} />;
        case "buses":
          return <BusCard {...cardProps} bus={item} />;
        case "cabs":
          return <CabCard {...cardProps} cab={item} />;
        default:
          return null;
      }
    },
    [searchParams.type, searchParams.from?.code, searchParams.to?.code],
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ResultsHeader searchParams={searchParams} dateInfo={dateInfo} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:hidden">
          <button
            onClick={() => setShowMobileFilters((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            <FilterList className="w-4 h-4 text-blue-500" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div
          className={`w-full lg:w-1/4 ${showMobileFilters ? "block" : "hidden"} lg:block`}
        >
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center">
                <FilterList className="w-5 h-5 mr-2 text-blue-500" /> Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetAll}
                  className={`text-xs font-semibold transition-all duration-300 ${activeFilterCount > 0 ? "text-blue-600 hover:text-blue-700 cursor-pointer" : "text-slate-300 cursor-default"}`}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Close className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
            <RenderFilters
              type={searchParams.type}
              config={FILTER_CONFIG}
              activeFilters={activeFilters}
              onToggleFilter={handleToggleFilter}
            />
          </div>
        </div>

        <div className="w-full lg:w-3/4 space-y-4">
          <h2 className="text-xl font-extrabold text-slate-800 mb-4 capitalize">
            {searchParams.type} Results{" "}
            <span className="text-slate-400 font-medium text-base">
              ({results.length})
            </span>
          </h2>

          {results.length > 0 ? (
            searchParams.type === "hotels" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((item) => renderResultCard(item))}
              </div>
            ) : (
              results.map((item) => renderResultCard(item))
            )
          ) : (
            <EmptyState
              searchParams={searchParams}
              activeFilterCount={activeFilterCount}
              onResetFilters={handleResetAll}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
