import restaurantBgUrl from "../assets/restaurant.jpg"
import textImg from "../assets/biteandblisstext.png"

export default function Header() {
  return (
    <header
      id="home"
      className="pt-24 bg-cover bg-center min-h-screen md:min-h-screen flex items-center justify-center md:justify-end"
      style={{ backgroundImage: `url(${restaurantBgUrl})` }}
    >
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center md:justify-end">
        <img
          src={textImg}
          alt="Bite and Bliss Text"
          className="hidden lg:block h-150 object-contain mr-0 md:mr-8"
        />
      </div>
    </header>
  );
}
