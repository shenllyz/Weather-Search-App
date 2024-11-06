import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { states } from '../utils/stateOptions';

interface SelectStateProps {
  onStateChange: (state: string) => void;
}

const SelectState: React.FC<SelectStateProps> = ({ onStateChange }) => {
  const [selectedState, setSelectedState] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value;
    setSelectedState(newState);
    onStateChange(newState);
  };

  return (
    <Form.Group controlId="state">
      <Form.Select value={selectedState} onChange={handleChange} required>
        <option value="">Select your state</option>
        {states.map((state) => (
          <option key={state.value} value={state.value}>
            {state.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectState;