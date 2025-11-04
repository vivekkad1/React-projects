function formatTimeFromUnix(unixSeconds) {
  if (!unixSeconds) return "--:--";
  return new Date(unixSeconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const CurrentWeather = ({ data }) => {
  const name = data?.name || "—";
  const weather0 = data?.weather?.[0];
  const icon = weather0?.icon;
  const description = weather0?.description || "—";
  const main = data?.main || {};
  const wind = data?.wind || {};
  const sys = data?.sys || {};

  return (
    <div className="current-weather">
      <div className="weather-main">
        <h2>{name}</h2>
        <p className="description">{description}</p>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
          />
        )}
      </div>

      <div className="weather-temp">
        <p className="temp">
          {Number.isFinite(main.temp) ? Math.round(main.temp) : "—"}&deg;C
        </p>
        <p className="feels-like">
          Feels like{" "}
          {Number.isFinite(main.feels_like) ? Math.round(main.feels_like) : "—"}
          &deg;C
        </p>
      </div>

      <div className="weather-details">
        <div>
          <span>{Number.isFinite(main.humidity) ? main.humidity : "—"}%</span>
          <br />
          <span>Humidity</span>
        </div>
        <div>
          <span>{Number.isFinite(wind.speed) ? wind.speed : "—"} m/s</span>
          <br />
          <span>Wind</span>
        </div>
        <div>
          <span>
            {Number.isFinite(main.pressure) ? main.pressure : "—"} hPa
          </span>
          <br />
          <span>Pressure</span>
        </div>
        <div>
          <span>{formatTimeFromUnix(sys.sunrise)}</span>
          <br />
          <span>Sunrise</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
