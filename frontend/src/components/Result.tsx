import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import "../styles/customFontstyle.scss";

interface ResultProps {
  city: string;
  state: string;
}

const Result: React.FC<ResultProps> = ({ city, state }) => {
  return (
    <Container>
      <Row className='text-center mt-5'>
        <Col>
          <h2 className='result-title'>Forecast at {city}, {state}</h2>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
          <Tabs defaultActiveKey="dailyView" id="result-tabs" dir="rtl">
            <Tab eventKey="meteogram" title="Meteogram">
              <div>Meteogram Content</div>
            </Tab>
            <Tab eventKey="dailyTempChart" title="Daily Temp. Chart">
              <div>Daily Temp. Chart Content</div>
            </Tab>
            <Tab eventKey="dailyView" title="Daily View">
              <div>Daily View Content</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;