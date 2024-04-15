import React, { useEffect, useState } from "react";

const WeatherCard = ({ selectedCity, onRemove }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false);

  useEffect(() => {
    if (!selectedCity) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=e28c4972540ee957319d58a96783ad41`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [selectedCity]);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDetailClick = () => {
    setShowDetailPage(true);
  };

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (showDetailPage) {
    return (
      <div>{/* Implement code to navigate to detailed weather page */}</div>
    );
  }
  if (!weatherData) return null;

  const currentTemp = weatherData.main.temp - 273.15;
  const feelsLikeTemp = weatherData.main.feels_like - 273.15;

  return (
    <div className="max-w-md mx-auto mt-6 relative">
      <div className="absolute top-0 right-0 z-10">
        {showDropdown && (
          <div className="bg-white shadow-md rounded-md mt-2 mr-2">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={handleDetailClick}
            >
              Detaya Git
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={handleRemoveClick}
            >
              Kaldır
            </button>
          </div>
        )}
        <button
          className="absolute top-0 right-0 mt-2 mr-2 z-10 text-sm text-white border border-white px-3 py-1 rounded-md bg-transparent hover:bg-white hover:text-gray-800"
          onClick={handleDropdown}
        >
          ...
        </button>
      </div>
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-800 to-gray-600 text-white">
        <img className="w-full" src="/mountain.jpg" alt="Mountain" />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center p-4">
          <div className="font-bold text-xl mb-2">{weatherData.name}</div>
          <div className="text-base mb-2">
            {weatherData.weather[0].description}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-lg font-semibold">Current Temp.</p>
              <p className="text-xl">{currentTemp.toFixed(1)}°C</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Feels Like</p>
              <p className="text-xl">{feelsLikeTemp.toFixed(1)}°C</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Humidity</p>
              <p className="text-xl">{weatherData.main.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
