import React, { useState } from "react";
import Header from "./components/Header";
// Putting the api key into a base and a key inside an object
// **********************************************************
const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  // setting query and weather to their defaults using useState
  // **********************************************************
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // handling the search with aysnc await
  // *************************************
  const search = async (evt) => {
    if (evt.key === "Enter") {
      try {
        const results = await fetch(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        );
        const resultsJSON = await results.json();
        setWeather(resultsJSON);
        setQuery("");
      } catch (error) {
        console.error(error);
      }
    }
  };
  // handling the dates to be displayed by passing in NewDate as d
  // *************************************************************

  // todo: use the format options on the getDate & new Date calls instead of using months
  // and days arrays
  const dateBuilder = (unformattedDate) => {

    // Setting the date format by using toLocaleDateString with options
    // *****************************************************************
    const day = unformattedDate.toLocaleDateString("en-US", { weekday: 'long' });
    const date = unformattedDate.toLocaleDateString("en-US", { day: 'numeric' });
    const month = unformattedDate.toLocaleDateString("en-US", { month: 'long' });
    const year = unformattedDate.toLocaleDateString("en-US", { year: 'numeric' });
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    // handling the weather display to show different backgrounds depending on temperatures
    // ************************************************************************************
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    // main jsx for the app
    //************************
    >
      <Header></Header>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {
          // if a location is found display the following jsx
          //*************************************************
          typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())} </div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">
                  Current conditions: {weather.weather[0].description}
                </div>
                <div className="wind">
                  Wind: {Math.round(weather.wind.speed * 3.6)} km/h
                </div>
              </div>
            </div>
          ) : // handle an unknown location
            // ******************************
            weather.cod === "404" ? (
              <div className="weather-box">
                <div className="error"> {weather.message}!</div>
              </div>
            ) : (
              // display no search results upon load or no search results when enter is hit
              // **************************************************************************
              ""
            )
        }
      </main>
    </div>
  );
};

export default App;
