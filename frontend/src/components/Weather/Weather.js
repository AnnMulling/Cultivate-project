// import React, { useEffect, useState } from 'react';


// import './Weather.css'

// const Weather = () => {
//     const [location, setLocation] = useState("");
//     const [weatherData, setWeatherdata] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false)
//     const [lat, setLat] = useState([])
//     const [lng, setLng] = useState([])


//     useEffect(() => {


//         const getUserlocation = async () => {

//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setLat(position.coords.latitude)
//                     setLng(position.coords.longitude)

//             })


//             let locationUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
//             // console.log("Latitude is:", lat)
//             // console.log("Longitude is:", lng)

//             await fetch(locationUrl)
//             //application render "return" before API is made
//                 //checking res.ok too will make sure that respons is successfully receieved before proceed
//                 .then((res) => res.ok && res.json())
//                 .then((data) => {
//                     setWeatherdata(data)
//                     console.log('location user data', data)
//                 }).then(() => {
//                     setIsLoaded(true)
//                 })

//                 .catch(error => console.error(error));
//         }

//         getUserlocation();

//     }, [lat, lng])


//     const fetchWeahterData = async () => {

//         let url = `${process.env.REACT_APP_API_URL}/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

//         try {

//             location && await fetch(url)
//                 .then((res) => res.ok && res.json())
//                 .then((data) => {
//                     console.log('data', data);
//                     setWeatherdata(data)
//                     setLocation("")

//                 }).then(() => {
//                     setIsLoaded(true)
//                 });

//         } catch (error) {
//             console.log(error)
//         }

//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchWeahterData();
//     };

//     return isLoaded && (
//        <div className="weather-container">
//             <div className="search-bar" onClick={handleSubmit}>
//                     <input
//                         type="text"
//                         id="city-search"
//                         placeholder="Enter city name"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                     />

//                 <div className="search-icon">
//                     <i className="fa-solid fa-magnifying-glass"></i>
//                 </div>
//             </div>
//             {weatherData ? (
//                 <div className="weather-details" style={{ width: "100%", textAlign: "center" }}>
//                     <div className="location">
//                         <p><span style={{ fontWeight: "bolder" }}>{weatherData.name}</span> | {weatherData.weather[0].description}</p>
//                         <p style={{ display: "flex", alignItems: "center"}}>
//                             <img src={`${process.env.REACT_APP_ICON_URL}/${weatherData.weather[0]?.icon}.png`} alt="weather-img" style={{ marginRight: "5px"}}/>
//                             {weatherData.main.temp} &deg;F
//                         </p>
//                     </div>
//                     <div className="humid-wind-container">
//                         <div className="details">
//                             <p><i className="fa-solid fa-water" style={{ marginRight: "10px" }}></i>{weatherData.main?.humidity}</p>
//                             <p>HUMIDITY %</p>
//                         </div>
//                         <div className="details">
//                             <p><i className="fa-solid fa-temperature-three-quarters" style={{ marginRight: "10px" }}></i>{weatherData.main?.feels_like}</p>
//                             <p>Feels Like </p>
//                         </div>
//                         <div className="details">
//                             <p><i className="fa-solid fa-wind" style={{ marginRight: "10px" }}></i>{weatherData.wind?.speed} </p>
//                             <p>WIND MPH</p>
//                         </div>
//                     </div>
//                 </div>
//             ) :
//                 <div className="weather-details">
//                     <div className="location">
//                         <p> Location | Sunny</p>
//                         <p>Temp &deg;F</p>
//                     </div>
//                     <div className="humid-wind-container">
//                         <div className="details">
//                             <p><i className="fa-solid fa-water" style={{ marginRight: "10px" }}></i>100</p>
//                             <p>HUMIDITY %</p>
//                         </div>
//                         <div className="details">
//                             <p><i className="fa-solid fa-temperature-three-quarters" style={{ marginRight: "10px" }}></i>100</p>
//                             <p>Feels Like </p>
//                         </div>
//                         <div className="details">
//                             <p><i className="fa-solid fa-wind" style={{ marginRight: "10px" }}></i>100</p>
//                             <p>WIND MPH</p>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }


// export default Weather;
