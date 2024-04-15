// CityWeatherDetails.jsx
import React, { useEffect, useState } from 'react';

const CityWeatherDetails = ({ cityName }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e28c4972540ee957319d58a96783ad41`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching weather:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [cityName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!weatherData) return null;

    const currentTemp = weatherData.main.temp - 273.15;
    const feelsLikeTemp = weatherData.main.feels_like - 273.15;

    return (
        <div>
            <h2>{weatherData.name}</h2>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Current Temp: {currentTemp.toFixed(1)}°C</p>
            <p>Feels Like: {feelsLikeTemp.toFixed(1)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
    );
};

export default CityWeatherDetails;
