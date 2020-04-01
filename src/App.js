import React from "react";

const api = {
  key: process.env.weatherApiKey,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return  `${day} ${date} ${month} ${year}`
  }
  <div className="app">
  return (
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="location-box">
          <div className="location">New York City, Us</div>
          <div className="date">{dateBuilder(new Date())} </div>
           
        </div>
      </main>
    </div>
  );
}

export default App;
