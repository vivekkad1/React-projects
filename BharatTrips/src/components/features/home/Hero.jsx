import FadeIn from "../../common/FadeIn";
import SearchWidget from "../search/SearchWidget";

const Hero = () => {
  return (
    <div className="relative min-h-dvh flex flex-col justify-center items-center z-0 pt-24 pb-12">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <img
          src="https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-900/50 to-slate-950/85" />
      </div>

      <FadeIn delay={100}>
        <div className="text-center mb-6 px-4">
          <p className="text-blue-300 text-sm font-medium tracking-wide mb-3 uppercase">
            Flights · Hotels · Trains · Buses · Cabs
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Where do you want to go?
          </h1>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="w-full px-2 sm:px-4">
          <SearchWidget className="mt-2" />
        </div>
      </FadeIn>
    </div>
  );
};

export default Hero;
