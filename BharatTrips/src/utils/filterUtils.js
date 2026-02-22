export const getTimeSlot = (timeStr) => {
  const hour = parseInt(timeStr.split(":")[0], 10);
  if (hour >= 6 && hour < 12) return "Morning (6AM–12PM)";
  if (hour >= 12 && hour < 18) return "Afternoon (12PM–6PM)";
  if (hour >= 18 && hour < 24) return "Evening (6PM–12AM)";
  return "Night (12AM–6AM)";
};

export const parsePriceRange = (rangeStr) => {
  const numbers = rangeStr.replace(/[₹,]/g, "").match(/\d+/g);
  if (!numbers) return [0, Infinity];
  if (rangeStr.startsWith("Under")) return [0, parseInt(numbers[0], 10)];
  if (rangeStr.startsWith("Above")) return [parseInt(numbers[0], 10), Infinity];
  return [parseInt(numbers[0], 10), parseInt(numbers[1], 10)];
};

export const applyFilters = (items, activeFilters, type) => {
  if (Object.values(activeFilters).every((s) => !s || s.size === 0))
    return items;

  return items.filter((item) => {
    // Generic Price Filter
    const priceFilters = activeFilters.price;
    if (priceFilters?.size > 0) {
      const match = [...priceFilters].some((r) => {
        const [min, max] = parsePriceRange(r);
        return item.price >= min && item.price < max;
      });
      if (!match) return false;
    }

    // Type-specific filters
    switch (type) {
      case "flights": {
        const airlineFilters = activeFilters.airline;
        if (airlineFilters?.size > 0 && !airlineFilters.has(item.airline))
          return false;

        const depFilters = activeFilters.departure;
        if (
          depFilters?.size > 0 &&
          !depFilters.has(getTimeSlot(item.departureTime))
        )
          return false;
        break;
      }
      case "hotels": {
        const ratingFilters = activeFilters.rating;
        if (ratingFilters?.size > 0) {
          const match = [...ratingFilters].some(
            (r) => item.rating >= parseFloat(r),
          );
          if (!match) return false;
        }
        break;
      }
      case "trains": {
        const classFilters = activeFilters.class;
        if (classFilters?.size > 0) {
          const trainClasses = item.classes.split(",").map((c) => c.trim());
          const match = [...classFilters].some((f) => trainClasses.includes(f));
          if (!match) return false;
        }
        const depFilters = activeFilters.departure;
        if (
          depFilters?.size > 0 &&
          !depFilters.has(getTimeSlot(item.departureTime))
        )
          return false;
        break;
      }
      case "buses": {
        const busTypeFilters = activeFilters.busType;
        if (busTypeFilters?.size > 0) {
          const typeStr = item.type.toLowerCase();
          const match = [...busTypeFilters].some((f) =>
            typeStr.includes(f.toLowerCase()),
          );
          if (!match) return false;
        }
        const depFilters = activeFilters.departure;
        if (
          depFilters?.size > 0 &&
          !depFilters.has(getTimeSlot(item.departureTime))
        )
          return false;
        break;
      }
      case "cabs": {
        const cabTypeFilters = activeFilters.cabType;
        if (cabTypeFilters?.size > 0) {
          const match = [...cabTypeFilters].some((f) =>
            item.type.toLowerCase().includes(f.toLowerCase()),
          );
          if (!match) return false;
        }
        break;
      }
      default:
        break;
    }

    return true;
  });
};
