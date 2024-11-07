import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

interface SearchButtonProps {
  onSubmit: () => void;
  disabled: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSubmit, disabled  }) => {
  const handleClick = () => {
    onSubmit();
  };

  return (
    <Button
      variant="primary"
      className="btn btn-primary p-2 m-2"
      size="lg"
      onClick={handleClick}
      disabled={disabled}
    >
      <i className="bi bi-search fst-normal fs-5 m-2">Search</i>
    </Button>
  );
};

export default SearchButton;