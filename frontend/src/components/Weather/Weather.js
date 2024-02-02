import React from 'react';


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

    let apiKey = "eea3015b0aa80bdcc1872a6c045cb80f";

    const search = async () => {
        const element = document.getElementsByClassName("search-bar");

        console.log('element', element)
        if (element[0].value === " ") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?${element[0].value}&units=imperial&appid=${apiKey}`

        const response = await fetch(url);
        console.log('response', response.json())

        const humidity = document.getElementsByClassName("humid-rate")
        const wind = document.getElementsByClassName("wind-rate")
        const temperature = document.getElementsByClassName("temp")
        const location = document.getElementsByClassName("location")

        // humidity[0].innerHTML = response.main.humidity;
        // wind[0].innerHTML = response.main.wind.gust;
        // temperature[0].innerHTML = response.main.temp;
        // temperature[1].innerHTML = response.main.feels_like;
        // location[0].innerHTML = response.name;

    }

    return (
        <div className="weather-container">
            <div className="search-bar" onClick={() => search()}>
                <input type="text" className="city-search" placeholder='Search'/>
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
