import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

interface SearchButtonProps {
  onSubmit: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSubmit }) => {
  const handleClick = () => {
    onSubmit();
  };

  return (
    <Button
      variant="primary"
      className="btn btn-primary p-2 m-2"
      size="lg"
      onClick={handleClick}
    >
      <i className="bi bi-search fst-normal fs-5 m-2">Search</i>
    </Button>
  );
};

export default SearchButton;