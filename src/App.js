// reference:
// https://www.w3schools.com/jsref/jsref_getdate.asp d.getDate(), 
// getDay(), getFullYear(), new Date() methods
import ReactHover, { Trigger, Hover } from 'react-hover';
import React, { useState } from 'react';

//reference: https://www.npmjs.com/package/react-hover
const optionsCursorTrueWithMargin = {
  followCursor: true,
  //set the hover's location
  shiftX: -150,
  shiftY: -150,
}

// import api from openweathermap website, api key and api url.
const api = {
  key: "de3d009eb3c97b79a28dfaec046b96eb",
  base: "http://api.openweathermap.org/data/2.5/"
}

//get the infomation dynatmically and employ it.
function App() {
  const [query, setQuery]= useState('');
  const [weather, setWeather]= useState({}); //empthy object

// add a function that could get our weather
const search = evt => {
  if (evt.key === "Enter"){
    //simple fetch get the request from the api. 
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    //get the jason form response
    .then(res => res.json())
    //json promise pass to another promise, then we set the weather equal to the result.
    .then(result => {
      setWeather(result);
      // when we submitted it we can then start type in a different place again.
      setQuery(''); 
      console.log(result);
    });
  }
}

  // an array function which takes d equals to date.
  // add 2 separate arraies here which include all the months and all the days.
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                  "September", "October", "November", "December"];
    let days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    // return a number between 1 and 7 or 0 and 6 will get the day today out of the days.
    let day = days[d.getDay()];
    // get the today's date from 1-5
    let date = d.getDate();
    //get the month from 1-11 that list above.
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    //return value in template strings.
    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={
      // check for the type of weather
      (typeof weather.main != "undefined")
      ? ((weather.main.temp >16) 
        ? 'app warm' 
        : 'app')
      : 'app'}>
      <main> 
         {/* create a search box */}
        <div className="search-box"> 
          {/* we use className not class because class is the every certain name in js */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            // get value of this input we've typed in
            onChange={e => setQuery(e.target.value)}
            //bind this value equal to the query
            value={query}
            onKeyPress={search}
          />
        </div> 
        {(typeof weather.main!="undefined") ? (
          //add an empaty div to hold this information
        <div>
        {/* under the search box, add a container */}
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          {/* use dateBuilder function that can pass data to date */}
          <div className="date">{dateBuilder(new Date())}</div>
          
        </div>
        {/* create another box called weather-box */}
        <div className="weather-box">
           {/* set the weather and round it up */}
          <div className="temp"><ReactHover options={optionsCursorTrueWithMargin}>
            <Trigger type="trigger">
              {/* set the hover on me target*/}
               <h1 style={{ background: 'none', width: '200px' }}> {Math.round(weather.main.temp)}°c </h1>
           </Trigger>
           <Hover type="hover">
             {/* add the hover */}
              <div id = "hover-text" ><h1>Feels Like:{weather.main.feels_like}°c </h1></div>
           </Hover>
        </ReactHover>        
          </div>
          {/* get the weather, return what the weather is */}
          <div className="weather"> {weather.weather[0].main}</div>
        </div>
        </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;

