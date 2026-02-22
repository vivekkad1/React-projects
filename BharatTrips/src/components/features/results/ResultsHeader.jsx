import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ResultsHeader = ({ searchParams, dateInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-r from-slate-900 to-slate-800 py-5 shadow-lg relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              {searchParams.type === "hotels" ? "City" : "From"}
            </span>
            <span className="font-bold text-base sm:text-lg text-white truncate max-w-25 sm:max-w-37.5">
              {searchParams.from?.name || searchParams.from}
            </span>
          </div>
          {searchParams.type !== "hotels" && (
            <>
              <ArrowForward className="w-5 h-5 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  To
                </span>
                <span className="font-bold text-base sm:text-lg text-white truncate max-w-25 sm:max-w-37.5">
                  {searchParams.to?.name || searchParams.to}
                </span>
              </div>
            </>
          )}
          <div className="w-px h-8 bg-white/10 mx-4 hidden md:block"></div>
          <div className="flex flex-col xs:flex">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              {searchParams.type === "hotels" ? "Check-in" : "Depart"}
            </span>
            <span className="font-bold text-base sm:text-lg text-white whitespace-nowrap">
              {dateInfo.dayNum} {dateInfo.monthYear}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm backdrop-blur-sm"
        >
          Modify Search
        </button>
      </div>
    </div>
  );
};

export default ResultsHeader;
