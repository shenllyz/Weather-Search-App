import React from 'react';
import Table from 'react-bootstrap/Table';
import { getWeatherDescription, DailyWeather } from '../utils/weatherUtils';
import { formatSunset, formatSunrise } from '../utils/formatDate';
interface DetailPaneProps {
  weatherData: DailyWeather;
}

const DetailPane: React.FC<DetailPaneProps> = ({weatherData}) => {
  return (
    <Table hover responsive>
      <tbody className='text-start'>
        <tr>
          <th>Status</th>
          <td>{getWeatherDescription(weatherData.weatherCode)}</td>
        </tr>
        <tr>
          <th>Max Temperature</th>
          <td>{weatherData.temperatureMax}°F</td>
        </tr>
        <tr>
          <th>Min Temperature</th>
          <td>{weatherData.temperatureMin}°F</td>
        </tr>
        <tr>
          <th>Apparent Temperature</th>
          <td>{weatherData.temperatureApparent}°F</td>
        </tr>
        <tr>
          <th>Sun Rise Time</th>
          <td>{formatSunrise(weatherData.sunriseTime)}</td>
        </tr>
        <tr>
          <th>Sun Set Time</th>
          <td>{formatSunset(weatherData.sunsetTime)}</td>
        </tr>
        <tr>
          <th>Humidity</th>
          <td>{weatherData.humidity}%</td>
        </tr>
        <tr>
          <th>Wind Speed</th>
          <td>{weatherData.windSpeed}mph</td>
        </tr>
        <tr>
          <th>Visibility</th>
          <td>{weatherData.visibility}mi</td>
        </tr>
        <tr>
          <th>Cloud Cover</th>
          <td>{weatherData.cloudCover}%</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DetailPane;