import { useCallback } from "react";

export const useCarousel = () => {
  const scrollCarousel = useCallback((ref, amount) => {
    if (ref.current) {
      ref.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  }, []);

  return { scrollCarousel };
};

export default useCarousel;
