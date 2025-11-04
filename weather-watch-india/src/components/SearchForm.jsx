import { useState } from "react";

function SearchForm({
  cities = [],
  selectedCity,
  onCitySelect,
  onSearchSubmit,
}) {
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(cityInput);
    setCityInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Or type a city name..."
        aria-label="Type a city name"
      />

      <select
        value={selectedCity}
        onChange={(e) => onCitySelect(e.target.value)}
        aria-label="Choose a city"
      >
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
