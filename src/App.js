import React, { useState } from "react";

// Putting the api key into a base and a key inside an object
//********************************************************** */
const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // handling the search with aysnc await
  //*************************************
  async function search(evt) {
    if (evt.key === "Enter") {
      try {
        let results = await fetch(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        );
        let resultsJSON = await results.json();
        console.log("weather is ", resultsJSON);
        setWeather(resultsJSON);
        setQuery("");
      } catch (error) {
        console.error(error);
      }
    }
  }
  // handling the dates to be displayed
  //**********************************
  const dateBuilder = d => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    // handling the weather display to show different backgrounds depending on temperatures
    //*************************************************************************************
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
      // main html ffor the app
      //************************
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())} </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">Current conditions: {weather.weather[0].description}</div>
              <div className="wind">
                Wind: {Math.round(weather.wind.speed * 3.6)} km/h {weather.wind.direction}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
