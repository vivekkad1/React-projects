import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import FadeIn from "../../common/FadeIn";
import { useCarousel } from "../../../hooks/useCarousel";
import {
  handpickedCollections,
  lesserKnownWonders,
} from "../../../data/mockData";

const CollectionsSection = () => {
  const handpickedRef = useRef(null);
  const wondersRef = useRef(null);
  const { scrollCarousel } = useCarousel();

  return (
    <>
      <div className="max-w-300 mx-auto px-4 mt-12 mb-20">
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Handpicked Collections
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Curated destinations our team actually visited
                </p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => scrollCarousel(handpickedRef, -320)}
                  className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel(handpickedRef, 320)}
                  className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2 snap-x snap-mandatory"
              ref={handpickedRef}
            >
              {handpickedCollections.map((item) => (
                <div
                  key={item.id}
                  className="relative min-w-55 h-70 rounded-xl overflow-hidden cursor-pointer group shrink-0 snap-center"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                    <span className="bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-2">
                      {item.top}
                    </span>
                    <h3 className="text-white font-bold text-[15px] leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-300 mx-auto px-4 mt-12 mb-20">
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Hidden Gems
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Places you probably haven&apos;t heard of — yet
                </p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => scrollCarousel(wondersRef, -220)}
                  className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel(wondersRef, 220)}
                  className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2 snap-x snap-mandatory"
              ref={wondersRef}
            >
              {lesserKnownWonders.map((item) => (
                <div
                  key={item.id}
                  className="relative min-w-45 h-57.5 rounded-xl overflow-hidden cursor-pointer group shrink-0 snap-center"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-3 z-10">
                    <h3 className="text-white font-bold text-[14px] leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default CollectionsSection;
