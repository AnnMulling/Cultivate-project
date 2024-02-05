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
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherdata] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState("")
    const apiKey = process.env.REACT_APP_API_KEY



    const fetchWeahterData = async () => {

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`

        try {

            location && await fetch(url)
            .then((res) => res.ok && res.json())
            .then((data) => {
                // console.log('data', data);
                setWeatherdata(data)
                setLocation("")
                // console.log('weatherData', weatherData)
            })

        }catch (error) {
            console.log(error)
        }

    };


    const handleSubmit  = (e) => {
        e.preventDefault();
        fetchWeahterData();
    }

    return (
        <div className="weather-container">
            <div className="search-bar" onClick={handleSubmit}>
                <input
                type="text"
                className="city-search"
                placeholder= "Enter city name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
                <div className="search-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            {weatherData ? (
                <div className="weather-details"  style={{width: "100%", textAlign: "center"}}>
                    {/* <div className="temp">
                            <img src={weatherIcon} alt="clear-sky" />
                    </div> */}
                    <div className="location">
                            <h3>{weatherData.name}</h3>
                    </div>
                    <div className="humid-wind-container">
                        <div className="details">
                           <i className="fa-solid fa-water"></i>
                            <p>HUMIDITY {weatherData.main?.humidity}%</p>
                        </div>
                        <div className="details">
                            <i className="fa-solid fa-temperature-three-quarters"></i>
                            <p>Feels Like {weatherData.main?.feels_like}</p>
                        </div>
                        <div className="details">
                            <i className="fa-solid fa-wind"></i>
                            <p>WIND {weatherData.wind?.speed} MPH</p>
                        </div>
                    </div>
                </div>
            ) :
                <div className="weather-details">
                <div className="temp">
                        <img src={clear_icon} alt="clear-sky" />
                </div>
                <div className="location" style={{width: "100%", textAlign: "center"}}>
                     <h3>{weatherData} Location</h3>
                </div>
                <div className="humid-wind-container">
                    <div className="details">
                        <p><i className="fa-solid fa-water" style={{ marginRight: "10px"}}></i>100</p>
                         <p>HUMIDITY {weatherData}%</p>
                    </div>
                    <div className="details">
                        <p><i className="fa-solid fa-temperature-three-quarters" style={{ marginRight: "10px"}}></i>100</p>
                        <p>Feels Like {weatherData}</p>
                    </div>
                    <div className="details">
                        <p><i className="fa-solid fa-wind" style={{ marginRight: "10px"}}></i>100</p>
                        <p>WIND {weatherData} MPH</p>
                    </div>
                </div>
                </div>
            }
        </div>
    )
}


export default Weather;
