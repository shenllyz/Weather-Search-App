import './App.scss';
import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import Result from './components/Result';
import MenuButtons from './components/MenuButtons';
import ErrorAlert from './components/ErrorAlert';
import NoRecordsAlert from './components/NoRecordsAlert';
import Favorite from './components/Favorite';
import ProgressBarComponent from './components/ProgressBarComponent';
import { DailyWeather, HourlyWeather } from './utils/weatherUtils';

export interface FavoriteProps {
  city: string;
  state: string;
  lat: number;
  lng: number;
  _id: string;
}

function App() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>('result');
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [apiError, setApiError] = useState(false);
  const [showNoRecordsAlert, setShowNoRecordsAlert] = useState(false);
  const [dailyWeatherData, setDailyWeatherData] = useState<DailyWeather[]>([]);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<HourlyWeather[]>([]);
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://csci571asgm3backend.wl.r.appspot.com/get_all_favorites_locations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFavorites(data);
        setShowNoRecordsAlert(data.length === 0);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setShowNoRecordsAlert(true);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    setShowNoRecordsAlert(favorites.length === 0);
  }, [favorites]);

  const handleSearch = (
    street: string,
    city: string,
    state: string,
    dailyData: DailyWeather[],
    hourlyData: HourlyWeather[],
    lat: number,
    lng: number
  ) => {
    setStreet(street);
    setCity(city);
    setState(state);
    setLat(lat);
    setLng(lng);
    setDailyWeatherData(dailyData);
    setHourlyWeatherData(hourlyData);
    setShowResult(true);
  };

  const handleClear = () => {
    setStreet('');
    setCity('');
    setState('');
    setLat(0);
    setLng(0);
    setDailyWeatherData([]);
    setHourlyWeatherData([]);
    setShowResult(false);
  };

  const handleClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="App">
      <SearchForm
        setStreet={setStreet}
        setCity={setCity}
        setState={setState}
        onSearch={handleSearch}
        onClear={handleClear}
        setShowProgressBar={setShowProgressBar}
        setProgress={setProgress}
        setApiError={setApiError}
        setNoRecordsAlert={setShowNoRecordsAlert}
      />
      <MenuButtons selectedButton={selectedButton} handleClick={handleClick} />
      {showProgressBar && <ProgressBarComponent progress={progress} />}
      {apiError && <ErrorAlert />}
      {showResult && selectedButton === 'result' && (
        <Result
          street={street}
          city={city}
          state={state}
          dailyWeatherData={dailyWeatherData}
          hourlyWeatherData={hourlyWeatherData}
          lat={lat}
          lng={lng}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
      {showNoRecordsAlert && selectedButton === 'favorite' && <NoRecordsAlert />}
      {!showNoRecordsAlert && selectedButton === 'favorite' && (
        <Favorite
          setShowNoRecordsAlert={setShowNoRecordsAlert}
          setSelectedButton={setSelectedButton}
          setCity={setCity}
          setState={setState}
          setLat={setLat}
          setLng={setLng}
          setDailyWeatherData={setDailyWeatherData}
          setHourlyWeatherData={setHourlyWeatherData}
          setShowResult={setShowResult}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
    </div>
  );
}

export default App;