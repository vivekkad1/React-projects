import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";

function App() {
  const CITIES = [
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Lucknow",
  ];

  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env?.VITE_OPENWEATHER_KEY;

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);
    document.body.className = "";

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )},IN&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) {
        throw new Error(
          `Could not find weather for "${cityName}". Check spelling or try another city.`
        );
      }
      const weather = await weatherRes.json();
      setWeatherData(weather);

      const main = weather?.weather?.[0]?.main?.toLowerCase() || "default";
      const map = {
        clear: "clear",
        clouds: "clouds",
        rain: "rain",
        drizzle: "rain",
        thunderstorm: "thunderstorm",
        snow: "snow",
        mist: "mist",
        fog: "mist",
        haze: "mist",
        smoke: "mist",
      };
      document.body.className = `weather-${map[main] || "default"}`;

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          cityName
        )},IN&appid=${API_KEY}&units=metric`
      );
      if (!forecastRes.ok) throw new Error("Failed to load forecast.");
      const forecast = await forecastRes.json();

      const list = Array.isArray(forecast?.list) ? forecast.list : [];
      const daily = list.filter((_, idx) => idx % 8 === 0);
      setForecastData(daily);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      document.body.className = "";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const handleSearchSubmit = (typed) => {
    if (typed.trim()) setSelectedCity(typed.trim());
  };

  return (
    <div className="weather-app">
      <Header />
      <SearchForm
        cities={CITIES}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
        onSearchSubmit={handleSearchSubmit}
      />

      <main>
        {loading && <p className="loading-message">Loading forecast...</p>}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {weatherData && <CurrentWeather data={weatherData} />}

        {forecastData && forecastData.length > 0 && (
          <Forecast data={forecastData} />
        )}
      </main>
    </div>
  );
}

export default App;
