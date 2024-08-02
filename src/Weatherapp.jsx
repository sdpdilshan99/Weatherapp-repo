import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const Weatherapp = () => {
    const [input, setInput] = useState("");
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    })

    const handleOverlayClick = () => {
        window.location.reload(); 
    };

    const toDate = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];
        const currentDate = new Date();
        const date = ` ${currentDate.getDate()} ${months[currentDate.getMonth()]} `;
        return date;
    }

    const search = (event) => {
        if(event.key === "Enter") {
            setInput('');
            setWeather({...weather, loading: true})
            axios.get('https://api.openweathermap.org/data/2.5/weather',{
                params: {
                    q: input, 
                    units: "metric",
                    appid: "7c77c32f8c9578c0e3e6ce5fa9833f8b"
                }
            }).then( res => {
                console.log(res)
                setWeather({data: res.data, loading:false, error:false})
            }).catch( error => {
                setWeather({...weather, data: {}, error: true})
            })
        }
    }

  return (
    <div className='weather-app'>
        <div className="city-search">
            <input type="text" className="city" placeholder='Enter City Name' 
            value={input} onChange={ (e) => setInput(e.target.value)}
            onKeyDown={search}/>
        </div>
        <br/>
        {
            weather.loading && (
                <Oval type="Oval" color="green" height={70} width={70}></Oval>
            )
        }
        {weather.error && (
                <div className="error-overlay" onClick={handleOverlayClick}>
                    <div className="error-message">
                        <span>{weather.error.message || "City Not Found"}</span>
                    </div>
                </div>
            )}
        {
            weather && weather.data && weather.data.main && (
                <div>
                    <div className="city-name">
                        <h2>
                            {weather.data.name},
                            <span> {weather.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span> {toDate()} </span>
                    </div>
                    <div className="icon-temp">
                        <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="" />
                        {Math.round(weather.data.main.temp)}
                        <sup className='deg'>°C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed}</p>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Weatherapp