import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import '../styles/customFontstyle.scss'; 

interface FavoriteProps {
  city: string;
  state: string;
  lat: number | null;
  lng: number | null;
  _id: string;
}

interface FavoriteComponentProps {
  setShowNoRecordsAlert: (show: boolean) => void;
}

const Favorite: React.FC<FavoriteComponentProps> = ({ setShowNoRecordsAlert }) => {
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://csci571asgm3backend.wl.r.appspot.com/get_all_favorites_locations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Favorites:', data);
        setFavorites(data);
        setShowNoRecordsAlert(data.length === 0);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setShowNoRecordsAlert(true);
      }
    };

    fetchFavorites();
  }, [setShowNoRecordsAlert]);

  const handleRemove = async (id: string) => {
    try {
      await fetch(`https://csci571asgm3backend.wl.r.appspot.com/delete_favorite_location/${id}`, {
        method: 'DELETE',
      });
      const updatedFavorites = favorites.filter(favorite => favorite._id !== id);
      setFavorites(updatedFavorites);
      setShowNoRecordsAlert(updatedFavorites.length === 0);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <Container className='mt-5'>
      <hr className='divider' />
      <Table hover responsive>
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
            <tr key={index} className="text-start">
              <td className='pt-3'>{index + 1}</td> 
              <td className='pt-3'> <a href="#">{favorite.city}</a></td>
              <td className='pt-3'><a href="#">{favorite.state}</a></td>
              <td>
                <Nav.Link href="#" onClick={(e) => { e.preventDefault(); handleRemove(favorite._id); }}>
                  <i className="bi bi-trash fs-3"></i>
                </Nav.Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Favorite;