import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/customFontstyle.scss';

interface FavoriteButtonProps {
    onClick: () => void;
    isFavorite: boolean;
  }
  
  const FavoriteButton: React.FC<FavoriteButtonProps> = ({ onClick, isFavorite }) => {
    return (
      <Button variant="outline-secondary" className="p-0" size="lg" onClick={onClick}>
        {isFavorite ? (
          <i className="bi bi-star-fill mx-3 fs-2 star-fill-yellow"></i>
        ) : (
          <i className="bi bi-star mx-3 fs-2 star-stroke-black"></i>
        )}
      </Button>
    );
  };
  
  export default FavoriteButton;