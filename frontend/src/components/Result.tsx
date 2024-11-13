import React, { useState } from 'react'; 
import {  Row, Col, Nav, Tab } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import DailyView from './DailyView';
import DailyTempChart from './DailyTempChart';
import MeteogramComponent from './Meteogram';
import "../styles/customFontstyle.scss";
import { DailyWeather, HourlyWeather } from '../utils/weatherUtils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteButton from './FavoriteButton';
import DetailPane from './DetailPane';
import Slide from '@mui/material/Slide';

interface ResultProps {
  city: string;
  state: string;
  dailyWeatherData: DailyWeather[];
  hourlyWeatherData: HourlyWeather[];
  lat: number | null;
  lng: number | null;
}

const Result: React.FC<ResultProps> = ({ city, state, dailyWeatherData, hourlyWeatherData, lat, lng,}) => {
  const [activeTab, setActiveTab] = useState<string>('dailyView');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showDetailPane, setShowDetailPane] = useState<boolean>(false);
  const [selectedWeatherIndex, setSelectedWeatherIndex] = useState<number>(0);

  const handleFavoriteClick = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

  const handleDetailsClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    event.preventDefault();
    setSelectedWeatherIndex(index);
    setShowDetailPane(true);
  };

  const handleDefaultDetailsClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setShowDetailPane(true);
  };

  const selectedWeather = dailyWeatherData[selectedWeatherIndex];

  return (
    <Container className='px-0'>
      <Slide direction="right" in={!showDetailPane} mountOnEnter unmountOnExit>
        <div>
          <Row className='text-center mt-5'>
          <Col>
            <h2 className='result-title fs-3 fs-md-2'>Forecast at {city}, {state}</h2>
          </Col>
        </Row>

        <Row className=' mt-3'>
          <Col className='text-end'>
            <FavoriteButton 
              onClick={handleFavoriteClick} 
              isFavorite={isFavorite}
            />
            <a href="#" className='text-dark' onClick={handleDefaultDetailsClick}>
              <span className='m-2'>Details<ArrowForwardIosIcon/></span>
            </a>  
          </Col>
        </Row>

        <Row className='mt-4' id='res'>
          <Col>
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'dailyView')}>
              <Nav variant="tabs" dir='rtl' className='px-0'>
                <Nav.Item>
                  <Nav.Link  eventKey="meteogram" href="#res">Meteogram</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dailyTempChart" href="#res">Daily Temp. Chart</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dailyView" href="#res">Day View</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className='mt-3'>
                <Tab.Pane eventKey="meteogram" unmountOnExit>
                  <MeteogramComponent weatherData={hourlyWeatherData} />
                </Tab.Pane>
                <Tab.Pane eventKey="dailyTempChart" unmountOnExit>
                  <DailyTempChart weatherData={dailyWeatherData} />
                </Tab.Pane>
                <Tab.Pane eventKey="dailyView" unmountOnExit>
                  <DailyView weatherData={dailyWeatherData} onDetailsClick={handleDetailsClick} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
        </div>
        
      </Slide>
      
      <Slide direction="left" in={showDetailPane} mountOnEnter unmountOnExit timeout={500}>
        <div>
          <DetailPane weatherData={selectedWeather}/>
        </div>
           
      </Slide>
    </Container>
  );
};

export default Result;