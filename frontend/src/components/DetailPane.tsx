import React from 'react';
import Table from 'react-bootstrap/Table';
import { getWeatherDescription, DailyWeather } from '../utils/weatherUtils';
import {  formatDate, formatSunset, formatSunrise } from '../utils/formatDate';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DetailPaneMap from './DetailPaneMap';
interface DetailPaneProps {
  weatherData: DailyWeather;
  geoData:{
        street?: string;
        city: string;
        state: string;
        latitude: number;
        longitude: number;
  }
  onBackToListClick: () => void;
}

const DetailPane: React.FC<DetailPaneProps> = ({weatherData, geoData, onBackToListClick}) => {
    const handleTwitterShare = () => {
        let tweetPost = `The temperature in `;
        (geoData.street && geoData.street.trim())!== ''? tweetPost += `${geoData.street}, ` : tweetPost += '';            
        tweetPost += `${geoData.city}, ${geoData.state} `;
        tweetPost += `on ${formatDate(weatherData.date)} `;
        tweetPost += `is ${weatherData.temperatureApparent}°F. `;
        tweetPost += `The weather conditions are ${getWeatherDescription(weatherData.weatherCode)} `;
        tweetPost += `#CSCI571WeatherSearch`;

        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetPost)}`;
        window.open(url, '_blank');
      };
  
    return (
    <Container> 
        <Row className='text-start mt-5'>
            <Col xs={2}>
                <Button  variant="outline-secondary" className="pe-3 ps-2 py-2 mb-4" onClick={onBackToListClick}>
                    <i><ArrowBackIosNewIcon/></i> 
                    <span className='ms-2 fs-5'>List</span>
                </Button>
            </Col>
            <Col xs={8} className='text-center'>
                <h3 className='fw-bold'>{formatDate(weatherData.date)}</h3>
            </Col>
            <Col xs={2} className='text-end'>
                <Button  variant="outline-secondary" className="px-3 py-1 mb-4"  onClick={handleTwitterShare}>
                        <i className="bi bi-twitter-x fs-3"></i>
                </Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table striped hover responsive>
                <tbody className='text-start'>
                    <tr>
                    <th className="col-3 p-3">Status</th>
                    <td className="col-8 p-3">{getWeatherDescription(weatherData.weatherCode)}</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Max Temperature</th>
                    <td className="col-8 p-3">{weatherData.temperatureMax}°F</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Min Temperature</th>
                    <td className="col-8 p-3">{weatherData.temperatureMin}°F</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Apparent Temperature</th>
                    <td className="col-8 p-3">{weatherData.temperatureApparent}°F</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Sun Rise Time</th>
                    <td className="col-8 p-3">{formatSunrise(weatherData.sunriseTime)}</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Sun Set Time</th>
                    <td className="col-8 p-3">{formatSunset(weatherData.sunsetTime)}</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Humidity</th>
                    <td className="col-8 p-3">{weatherData.humidity}%</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Wind Speed</th>
                    <td className="col-8 p-3">{weatherData.windSpeed}mph</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Visibility</th>
                    <td className="col-8 p-3">{weatherData.visibility}mi</td>
                    </tr>
                    <tr>
                    <th className="col-4 p-3">Cloud Cover</th>
                    <td className="col-8 p-3">{weatherData.cloudCover}%</td>
                    </tr>
                </tbody>
                </Table>
            </Col>
        </Row> 
        <Row>
            <Col>
                <DetailPaneMap latitude={geoData.latitude} longitude={geoData.longitude} />
            </Col>
        </Row>
    </Container>

     
  );
};

export default DetailPane;
