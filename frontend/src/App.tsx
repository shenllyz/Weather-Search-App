import './App.scss';
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import Result from './components/Result';
import MenuButtons from './components/MenuButtons';
import ErrorAlert from './components/ErrorAlert';
import Favorite from './components/Favorite';
import ProgressBarComponent from './components/ProgressBarComponent';
import { DailyWeather, HourlyWeather} from './utils/weatherUtils';

function App() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>('result');
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [apiError, setApiError] = useState(false);
  const [dailyWeatherData, setDailyWeatherData] = useState<DailyWeather[]>([]); 
  const [hourlyWeatherData, setHourlyWeatherData] = useState<HourlyWeather[]>([]);
  const handleSearch = (city: string, state: string, dailyData: DailyWeather[], hourlyData: HourlyWeather[]) => {
    setCity(city);
    setState(state);
    setDailyWeatherData(dailyData);
    setHourlyWeatherData(hourlyData);
    setShowResult(true);
  };

  const handleClear = () => {
    setCity('');
    setState('');
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
      />
      <MenuButtons selectedButton={selectedButton} handleClick={handleClick} />
      {showResult && selectedButton === 'result' && <Result city={city} state={state} dailyWeatherData={dailyWeatherData}  hourlyWeatherData={hourlyWeatherData}/>}
      {selectedButton === 'favorite' && <Favorite />}
      {showProgressBar && <ProgressBarComponent progress={progress} />}
      {apiError && <ErrorAlert />}
    </div>
  );
}

export default App;