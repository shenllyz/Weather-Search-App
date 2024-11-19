import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import DailyView from './DailyView';
import DailyTempChart from './DailyTempChart';
import MeteogramComponent from './Meteogram';
import { DailyWeather, HourlyWeather } from '../../../utils/weatherUtils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteButton from '../../buttons/FavoriteButton';

interface ResultContentProps {
  city: string;
  state: string;
  dailyWeatherData: DailyWeather[];
  hourlyWeatherData: HourlyWeather[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isFavorite: boolean;
  handleFavoriteClick: () => void;
  handleDefaultDetailsClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  handleDetailsClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => void;
}

const ResultContent: React.FC<ResultContentProps> = ({
  city,
  state,
  dailyWeatherData,
  hourlyWeatherData,
  activeTab,
  setActiveTab,
  isFavorite,
  handleFavoriteClick,
  handleDefaultDetailsClick,
  handleDetailsClick
}) => {
  return (
    <>
      <Row className='text-center mt-5'>
        <Col>
          <h2 className='result-title fs-3 fs-md-2' id="title">Forecast at {city}, {state}</h2>
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

      <Row className='mt-4'>
        <Col>
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'dailyView')}>
            <Row className="justify-content-end">
              <Col xs="auto">
                <Nav variant="tabs" className='px-0'>
                  <Nav.Item>
                  <Nav.Link eventKey="dailyView" href="#bottom">
                    <span className='responsive-text'>
                      <span className="text-part">Day</span>
                      <span className="text-part">View</span>
                    </span>
                  </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="dailyTempChart" href="#bottom">
                      <span className='responsive-text'>
                        <span className="text-part">Daily</span>
                        <span className="text-part">Temp.</span>
                        <span className="text-part">Chart</span>
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="meteogram" href="#bottom"><span className='responsive-text'>Meteogram</span></Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Tab.Content className='mt-1'>
              <Tab.Pane eventKey="meteogram" unmountOnExit>
                <MeteogramComponent weatherData={hourlyWeatherData} />
              </Tab.Pane>
              <Tab.Pane eventKey="dailyTempChart" unmountOnExit>
                <DailyTempChart weatherData={dailyWeatherData} />
              </Tab.Pane>
              <Tab.Pane eventKey="dailyView" unmountOnExit>
                <DailyView weatherData={dailyWeatherData} onDetailsClick={handleDetailsClick} />
              </Tab.Pane>
              <div id="bottom"></div> 
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </>
  );
};

export default ResultContent;