import React, {useEffect, useState } from 'react';

//img
import search_icon from '../../assets/weather/search.png';
import clear_icon from '../../assets/weather/clear.png';
import clound_icon from '../../assets/weather/cloud.png';
import drizzle_icon from '../../assets/weather/drizzle.png';
import humidity_icon from '../../assets/weather/humidity.png';
import rain_icon from '../../assets/weather/rain.png';
import snow_icon from '../../assets/weather/snow.png'
import wind_icon from '../../assets/weather/wind.png'


import './Weather.css'

const Weather  = () => {
    const [location, setLocation] = useState("Chicago");

    let apiKey = process.env.REACT_APP_API_KEY
   
    const search = async () => {

        let url = `https://api.openweathermap.org/data/2.5/weather?${location}&units=imperial&appid=${apiKey}`

        const response = await fetch(url);
        console.log('response', response.json())



    }

    return (
        <div className="weather-container">
            <div className="search-bar" onClick={() => search()}>
                <input
                type="text"
                className="city-search"
                placeholder='Search'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
                <div className="search-icon">
                    <img src={search_icon} alt='search-icon'/>
                </div>
            </div>
            <div className="temp">
                    <img src={clear_icon} alt="clear-sky" />
            </div>
            <div className="location">
                    <h3>Chicago</h3>
            </div>
            <div className="humid-wind-container">
                <div className="humid-rate">
                    <img src={humidity_icon} alt="humidity-rate" />
                </div>
                <div className="wind-rate">
                    <img src={wind_icon} alt="wind-rate"/>
                </div>
            </div>
        </div>
    )
}


export default Weather;
