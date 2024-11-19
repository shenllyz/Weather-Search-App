import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import '../../styles/customFontstyle.scss'; 
import ProgressBarComponent from '../alerts/ProgressBarComponent';
import { fetchWeatherData } from '../../utils/formDataHandlers';
import { parseDailyWeather, parseHourlyWeather, DailyWeather, HourlyWeather } from '../../utils/weatherUtils';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export interface FavoriteProps {
  city: string;
  state: string;
  lat: number;
  lng: number;
  _id: string;
}

interface FavoriteComponentProps {
  setShowNoRecordsAlert: (show: boolean) => void;
  setSelectedButton: (button: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setDailyWeatherData: (data: DailyWeather[]) => void;
  setHourlyWeatherData: (data: HourlyWeather[]) => void;
  setShowResult: (show: boolean) => void;
  favorites: FavoriteProps[];
  setFavorites: (favorites: FavoriteProps[]) => void;
}

const Favorite: React.FC<FavoriteComponentProps> = ({
  setShowNoRecordsAlert,
  setSelectedButton,
  setCity,
  setState,
  setLat,
  setLng,
  setDailyWeatherData,
  setHourlyWeatherData,
  setShowResult,
  favorites,
  setFavorites,
}) => {
  const [showProgressBar, setShowProgressBar] = useState(false); 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setShowProgressBar(true);
        setProgress(30); 
        const response = await fetch(`${BACKEND_URL}/get_all_favorites_locations`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        setFavorites(data);
        setShowNoRecordsAlert(data.length === 0);
        setProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setShowNoRecordsAlert(true);
      } finally {
        setShowProgressBar(false);
      }
    };

    fetchFavorites();
  }, [setShowNoRecordsAlert, setShowProgressBar, setProgress, setFavorites]);

  const handleRemove = async (id: string) => {
    try {
      await fetch(`${BACKEND_URL}/delete_favorite_location/${id}`, {
        method: 'DELETE',
      });
      const updatedFavorites = favorites.filter(favorite => favorite._id !== id);
      setFavorites(updatedFavorites);
      setShowNoRecordsAlert(updatedFavorites.length === 0);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleRowClick = async (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, favorite: FavoriteProps) => {
    
    if ((event.target as HTMLElement).closest('.nav-link')) {
      return;
    }

    try {
      setShowProgressBar(true);
      setProgress(50);
      const weatherData = await fetchWeatherData(favorite.lat, favorite.lng);
      const dailyData = parseDailyWeather(weatherData);
      const hourlyData = parseHourlyWeather(weatherData);
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCity(favorite.city);
      setState(favorite.state);
      setLat(favorite.lat);
      setLng(favorite.lng);
      setDailyWeatherData(dailyData);
      setHourlyWeatherData(hourlyData);
      setShowResult(true);
      setSelectedButton('result');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setShowProgressBar(false);
    }
  };

  return (
    <Container className='mt-5'>
      {showProgressBar && <ProgressBarComponent progress={progress} />}
      {!showProgressBar && (
        <>
          <hr className='divider mb-1' />
            <Table hover responsive className='mt-1'>
              <thead>
                <tr className="text-start">
                  <th className="fw-bold">#</th>
                  <th className="fw-bold">City</th>
                  <th className="fw-bold">State</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite, index) => (
                  <tr key={index} className="text-start" onClick={(e) => handleRowClick(e, favorite)}>
                    <td className='pt-3'>{index + 1}</td> 
                    <td className='pt-3'> <a href="#">{favorite.city}</a></td>
                    <td className='pt-3'><a href="#">{favorite.state}</a></td>
                    <td>
                      <Nav.Link href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleRemove(favorite._id); }}>
                        <i className="bi bi-trash fs-3"></i>
                      </Nav.Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </>
      )}
    </Container>
  );
};

export default Favorite;