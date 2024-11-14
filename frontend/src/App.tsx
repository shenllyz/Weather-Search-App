import './App.scss';
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import Result from './components/Result';
import MenuButtons from './components/MenuButtons';
import ErrorAlert from './components/ErrorAlert';
import NoRecordsAlert from './components/NoRecordsAlert';
import Favorite from './components/Favorite';
import ProgressBarComponent from './components/ProgressBarComponent';
import { DailyWeather, HourlyWeather} from './utils/weatherUtils';

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

  const handleSearch = (city: string, state: string, dailyData: DailyWeather[], hourlyData: HourlyWeather[], lat: number, lng: number) => {
    setCity(city);
    setState(state);
    setLat(lat);
    setLng(lng);
    setDailyWeatherData(dailyData);
    setHourlyWeatherData(hourlyData);
    setShowResult(true);
  };

  const handleClear = () => {
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
          city={city} 
          state={state} 
          dailyWeatherData={dailyWeatherData}  
          hourlyWeatherData={hourlyWeatherData} 
          lat={lat} 
          lng={lng}  
        />
      )}
      {showNoRecordsAlert && selectedButton === 'favorite'  && <NoRecordsAlert />}
      {!showNoRecordsAlert && selectedButton === 'favorite' && <Favorite setShowNoRecordsAlert={setShowNoRecordsAlert} />}
    </div>
  );
}

export default App;