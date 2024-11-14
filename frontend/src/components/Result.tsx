import React, { useState, useEffect } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/customFontstyle.scss";
import { DailyWeather, HourlyWeather } from '../utils/weatherUtils';
import DetailPane from './DetailPane';
import Slide from '@mui/material/Slide';
import ResultContent from './ResultContent';
 
interface FavoriteProps {
  city: string;
  state: string;
  lat: number;
  lng: number;
  _id: string;
}

interface ResultProps {
  street?: string;
  city: string;
  state: string;
  dailyWeatherData: DailyWeather[];
  hourlyWeatherData: HourlyWeather[];
  lat: number;
  lng: number;
}

const Result: React.FC<ResultProps> = ({street, city, state, dailyWeatherData, hourlyWeatherData, lat, lng,}) => {
  const [activeTab, setActiveTab] = useState<string>('dailyView');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showDetailPane, setShowDetailPane] = useState<boolean>(false);
  const [selectedWeatherIndex, setSelectedWeatherIndex] = useState<number>(0);
  const [fromListButton, setFromListButton] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://csci571asgm3backend.wl.r.appspot.com/get_all_favorites_locations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFavorites(data);

        const favorite = data.find((fav: FavoriteProps) => fav.city === city && fav.state === state);
        if (favorite) {
          setIsFavorite(true);
          setFavoriteId(favorite._id);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [city, state]);


  const handleFavoriteClick = async () => {
    if (isFavorite) {
      // Remove from favorites
      if (favoriteId) {
        await handleRemove(favoriteId);
      }
    } else {
      // Add to favorites
      try {
        const response = await fetch('https://csci571asgm3backend.wl.r.appspot.com/add_favorite_location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city, state, lat, lng }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newFavorite = await response.json();
        setFavorites([...favorites, newFavorite]);
        setIsFavorite(true);
        setFavoriteId(newFavorite._id);
      } catch (error) {
        console.error('Error adding favorite:', error);
      }
    }
  };


  const handleRemove = async (id: string) => {
    try {
      await fetch(`https://csci571asgm3backend.wl.r.appspot.com/delete_favorite_location/${id}`, {
        method: 'DELETE',
      });
      const updatedFavorites = favorites.filter(favorite => favorite._id !== id);
      setFavorites(updatedFavorites);
      setIsFavorite(false);
      setFavoriteId(null);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
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
    street,
    city,
    state,
    latitude: lat,
    longitude: lng,
  };

  return (
    <Container className='px-0'>
        <div>
          <Slide direction="right" in={!showDetailPane && fromListButton} mountOnEnter unmountOnExit timeout={2000}>
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
          <Slide direction="left" in={showDetailPane} mountOnEnter unmountOnExit timeout={2000}>
            <div>
              <DetailPane weatherData={selectedWeather} geoData={geoData} onBackToListClick={handleBackToListClick} />
            </div>
          </Slide>
        </div>
    </Container>
  );
};

export default Result;