import React from 'react';
import Table from 'react-bootstrap/Table';
import { getWeatherDescription, getWeatherIcon, DailyWeather } from '../../../utils/weatherUtils';
import { formatDate } from '../../../utils/formatDate';

interface DailyViewProps {
  weatherData: DailyWeather[];
  onDetailsClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => void;
}

const DailyView: React.FC<DailyViewProps> = ({ weatherData,  onDetailsClick }) => {
  return (
    <Table hover responsive>
      <thead>
        <tr className='text-start fs-6 fw-bolder'>
          <th className='py-3'>#</th>
          <th className='py-3'>Date</th>
          <th className='py-3'>Status</th>
          <th className='py-3'>Temp. High (°F)</th>
          <th className='py-3'>Temp. Low (°F)</th>
          <th className='py-3'>Wind Speed (mph)</th>
        </tr>
      </thead>
      <tbody className='text-start '>
        {weatherData.map((data, index) => (
          <tr key={index} >
            <td className='pb-4'>{index + 1}</td>
            <td className='pb-4'>
            <a href="#" onClick={(e) => onDetailsClick(e, index)}>{formatDate(data.date)}</a>
            </td>
            <td className='pb-4'>
              <div className="d-flex align-items-center">
                <img
                  src={getWeatherIcon(data.weatherCode)}
                  alt={`${getWeatherDescription(data.weatherCode)} icon`}
                  style={{ width: '32px', height: '32px', marginRight: '8px' }}
                  onError={(e) => { console.error(`Image not found: ${getWeatherIcon(data.weatherCode)}`); }}
                />
                {getWeatherDescription(data.weatherCode)}
              </div>
            </td>
            <td className='pb-4'>{data.temperatureMax.toFixed(2)}</td>
            <td className='pb-4'>{data.temperatureMin.toFixed(2)}</td>
            <td className='pb-4'>{data.windSpeed.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DailyView;