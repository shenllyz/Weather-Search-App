import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DailyView from './DailyView';
import DailyTempChart from './DailyTempChart';
import "../styles/customFontstyle.scss";
import { DailyWeather } from '../utils/weatherUtils';

interface ResultProps {
  city: string;
  state: string;
  dailyWeatherData: DailyWeather[];
}

const Result: React.FC<ResultProps> = ({ city, state, dailyWeatherData }) => {
  const [activeTab, setActiveTab] = useState<string>('dailyView');
  
  return (
    <Container>
      <Row className='text-center mt-5'>
        <Col>
          <h2 className='result-title'>Forecast at {city}, {state}</h2>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
          <Tabs 
            defaultActiveKey="dailyView" 
            id="result-tabs" 
            dir='rtl'
            onSelect={(v) => setActiveTab(v || 'dailyView')}
          >
            <Tab eventKey="meteogram" title="Meteogram">
              <div>Meteogram Content</div>
            </Tab>
            <Tab eventKey="dailyTempChart" title="Daily Temp. Chart">
            {activeTab === 'dailyTempChart' && <DailyTempChart weatherData={dailyWeatherData} />}
            </Tab>
            <Tab eventKey="dailyView" title="Daily View">
              <DailyView weatherData={dailyWeatherData} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;