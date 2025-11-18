import MENU_DATA from "../data/data";
import Article from "./Article";

export default function Menu() {
  return (
    <section id="menu" className="bg-[#dedbd2] mt-8 p-4 md:p-8 rounded-lg scroll-mt-25">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6">Menu</h2>

      <div className="space-y-6">
        <Article title="Starters & Appetizers" items={MENU_DATA.starters} />
        <Article title="Salads" items={MENU_DATA.salads} />
        <Article title="Soups" items={MENU_DATA.soups} />
        <Article title="Main Course Curries" items={MENU_DATA.mains} />
        <Article title="Breads & Rice" items={MENU_DATA.breads} />
        <Article title="Vegetarian & Vegan" items={MENU_DATA.veg} />
        <Article title="Desserts" items={MENU_DATA.desserts} />
      </div>
    </section>
  );
}