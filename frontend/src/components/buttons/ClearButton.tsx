import React from 'react';
import Button from 'react-bootstrap/Button';

interface ClearButtonProps {
  onClear: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <Button variant="outline-secondary" className="p-2" size="lg" onClick={onClear}>
      <i className="bi bi-list-nested fst-normal fs-5 m-2">Clear</i>
    </Button>
  );
};

export default ClearButton;