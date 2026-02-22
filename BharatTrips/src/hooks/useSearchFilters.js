import { useState, useMemo, useCallback } from "react";
import { applyFilters } from "../utils/filterUtils";
import {
  mockFlights,
  mockHotels,
  mockTrains,
  mockBuses,
  mockCabs,
} from "../data/mockData";

export const useSearchFilters = (searchParams) => {
  const [activeFilters, setActiveFilters] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleToggleFilter = useCallback((sectionId, value) => {
    setActiveFilters((prev) => {
      const sectionSet = new Set(prev[sectionId] || []);
      if (sectionSet.has(value)) {
        sectionSet.delete(value);
      } else {
        sectionSet.add(value);
      }
      return { ...prev, [sectionId]: sectionSet };
    });
  }, []);

  const handleResetAll = useCallback(() => {
    setActiveFilters({});
  }, []);

  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).reduce(
      (sum, s) => sum + (s?.size || 0),
      0,
    );
  }, [activeFilters]);

  const baseResults = useMemo(() => {
    switch (searchParams.type) {
      case "flights":
        return mockFlights;
      case "hotels": {
        const cityName = searchParams.from?.name || searchParams.from;
        if (!cityName) return mockHotels;
        return mockHotels.filter(
          (h) => h.city?.toLowerCase() === cityName.toLowerCase(),
        );
      }
      case "trains":
        return mockTrains;
      case "buses":
        return mockBuses;
      case "cabs":
        return mockCabs;
      default:
        return [];
    }
  }, [searchParams.type, searchParams.from]);

  const results = useMemo(() => {
    return applyFilters(baseResults, activeFilters, searchParams.type);
  }, [baseResults, activeFilters, searchParams.type]);

  return {
    results,
    activeFilters,
    activeFilterCount,
    showMobileFilters,
    setShowMobileFilters,
    handleToggleFilter,
    handleResetAll,
  };
};

export default useSearchFilters;
