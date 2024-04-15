import React, { useState, useEffect } from "react";
import { Drawer, Select, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import WeatherCard from "./WeatherCard";

const { Option } = Select;

const Background = () => {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const data = await response.json();
      setCountries(data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchCities = async () => {
    if (selectedCountry) {
      try {
        const countryData = countries.find(
          (country) => country.iso2 === selectedCountry
        );
        if (countryData) {
          setCities(countryData.cities);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    if (selectedCity && !selectedCities.includes(selectedCity)) {
      setSelectedCities([...selectedCities, selectedCity]);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [selectedCountry]);

  const onRemoveCity = (cityToRemove) => {
    setSelectedCities((prevCities) =>
      prevCities.filter((city) => city !== cityToRemove)
    );
  };

  return (
    <>
      <div className="my-card text-white relative">
        <div
          className="max-w bg-white bg-opacity-75 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
          style={{ height: "300px", overflow: "hidden" }}
        >
          <img
            src="sunny.jpg"
            alt="Sunny"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center p-5">
            <div className="flex flex-col justify-end space-y-3">
              <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
                Şehir Seçerek hava durumunu öğrenebilirsiniz.
              </h5>
              <p className="font-normal text-white dark:text-white">
                Şehrini seç ve hava durumunu öğren.
              </p>
              <div className="flex justify-start">
                <button
                  onClick={showDrawer}
                  className="bg-white text-black font-bold py-2 px-4 rounded"
                >
                  <div className="flex items-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="mr-2"
                    >
                      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                    </svg>
                    <span>Şehir Ekle</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <span>Şehir ekle</span>
            <Button onClick={onClose} type="text" icon={<CloseOutlined />} />
          </div>
        }
        placement="right"
        onClose={onClose}
        closable={false}
        visible={open}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              İptal
            </Button>
            <Button onClick={onSave} type="primary">
              Kaydet
            </Button>
          </div>
        }
      >
        <div>
          <label>Ülke</label>
          <Select
            placeholder="Ülke Seçiniz"
            style={{ width: "100%" }}
            onChange={handleCountryChange}
          >
            {countries.map((country) => (
              <Option key={country.iso2} value={country.iso2}>
                {country.country}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ marginTop: "16px" }}>
          <label>Şehir</label>
          <Select
            placeholder="Şehir Seçiniz"
            style={{ width: "100%" }}
            onChange={handleCityChange}
            disabled={!selectedCountry}
          >
            {cities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </div>
      </Drawer>
      <div className="flex flex-wrap">
        {selectedCities.map((city) => (
          <WeatherCard
            key={city}
            selectedCity={city}
            onRemove={() => onRemoveCity(city)}
          />
        ))}
      </div>
    </>
  );
};

export default Background;
