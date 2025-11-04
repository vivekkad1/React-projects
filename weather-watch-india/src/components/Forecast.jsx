const Forecast = ({ data }) => (
  <div className="forecast">
    <h3>5-Day Forecast</h3>
    <div className="forecast-container">
      {data.map((day, index) => (
        <div key={index} className="forecast-item">
          <p className="day">
            {new Date(day.dt * 1000).toLocaleDateString([], {
              weekday: "short",
            })}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <p className="temp">{Math.round(day.main.temp)}&deg;C</p>
        </div>
      ))}
    </div>
  </div>
);

export default Forecast;