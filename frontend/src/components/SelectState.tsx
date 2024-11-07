import { TextField, Autocomplete } from '@mui/material';
import { states } from '../utils/stateOptions';
import { useState } from 'react';

interface SelectStateProps {
  onStateChange: (state: string) => void;
}

const SelectState: React.FC<SelectStateProps> = ({ onStateChange }) => {
  const [selectedState, setSelectedState] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent, newState: string | null) => {
    setSelectedState(newState || '');
    if (newState) {
      onStateChange(newState);
    } else {
      onStateChange('');
    }
  };

  return (
    <Autocomplete
      value={selectedState}
      onChange={handleChange}
      options={states.map((state) => state.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select or type your state"
          variant="outlined"
          required
          InputLabelProps={{ shrink: false }}
          sx={{ backgroundColor: 'white', borderRadius: 2 }}
          InputProps={{
            ...params.InputProps,
            style: {
              padding: '5px',   
            }
          }}
        />
      )}
      disableClearable
      freeSolo
    />
  );
};

export default SelectState;