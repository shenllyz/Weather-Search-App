import React, { useState } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/customFontstyle.scss";
import { DailyWeather, HourlyWeather } from '../utils/weatherUtils';
import DetailPane from './DetailPane';
import Slide from '@mui/material/Slide';
import ResultContent from './ResultContent';

interface ResultProps {
  city: string;
  state: string;
  dailyWeatherData: DailyWeather[];
  hourlyWeatherData: HourlyWeather[];
  lat: number;
  lng: number;
}

const Result: React.FC<ResultProps> = ({ city, state, dailyWeatherData, hourlyWeatherData, lat, lng,}) => {
  const [activeTab, setActiveTab] = useState<string>('dailyView');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showDetailPane, setShowDetailPane] = useState<boolean>(false);
  const [selectedWeatherIndex, setSelectedWeatherIndex] = useState<number>(0);
  const [fromListButton, setFromListButton] = useState<boolean>(false);

  const handleFavoriteClick = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

  const handleDetailsClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    event.preventDefault();
    setSelectedWeatherIndex(index);
    setShowDetailPane(true);
    setFromListButton(false);
  };

  const handleDefaultDetailsClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setShowDetailPane(true);
    setFromListButton(false);
  };

  const handleBackToListClick = () => {
    setShowDetailPane(false);
    setFromListButton(true);
  };

  const selectedWeather = dailyWeatherData[selectedWeatherIndex];
  const geoData = {
    city,
    state,
    latitude: lat,
    longitude: lng,
  };

  return (
    <Container className='px-0'>
      <Row>
        <Col>
          <Slide direction="right" in={!showDetailPane && fromListButton} mountOnEnter unmountOnExit>
            <div>
              <ResultContent
                city={city}
                state={state}
                dailyWeatherData={dailyWeatherData}
                hourlyWeatherData={hourlyWeatherData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isFavorite={isFavorite}
                handleFavoriteClick={handleFavoriteClick}
                handleDefaultDetailsClick={handleDefaultDetailsClick}
                handleDetailsClick={handleDetailsClick}
              />
            </div>
          </Slide>
          
          {!fromListButton && !showDetailPane && (
            <div>
              <ResultContent
                city={city}
                state={state}
                dailyWeatherData={dailyWeatherData}
                hourlyWeatherData={hourlyWeatherData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isFavorite={isFavorite}
                handleFavoriteClick={handleFavoriteClick}
                handleDefaultDetailsClick={handleDefaultDetailsClick}
                handleDetailsClick={handleDetailsClick}
              />
            </div>
          )}
        </Col>
        
        <Col xs={12}>
          <Slide direction="left" in={showDetailPane} mountOnEnter unmountOnExit timeout={500}>
            <div>
              <DetailPane weatherData={selectedWeather} geoData={geoData} onBackToListClick={handleBackToListClick} />
            </div>
          </Slide>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;