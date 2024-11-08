import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';

interface CityInputProps {
  value: string;
  onCityChange: (value: string) => void;
  onBlur?: () => void;
  disabled: boolean;
  error: boolean;
}

interface CityState {
  city: string;
  state: string;
}

const CityInput: React.FC<CityInputProps> = ({ value, onCityChange, onBlur, disabled, error }) => {
  const [options, setOptions] = useState<string[]>([]);

  const fetchOptions = async (inputValue: string) => {
    if (!inputValue) {
      setOptions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://csci571asgm3backend.wl.r.appspot.com/autocomplete?input=${inputValue}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch autocomplete options');
      }
      const data: CityState[] = await response.json();
      const cityNames = data.map((item) => item.city);
      const uniqueCityNames = Array.from(new Set(cityNames));
      setOptions(uniqueCityNames);
    } catch (error) {
      console.error('Error fetching autocomplete options:', error);
    }
  };

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    onCityChange(newInputValue);
    fetchOptions(newInputValue);
  };

  return (
    <Autocomplete
      value={value}
      inputValue={value}
      onInputChange={handleInputChange}
      onBlur={onBlur}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          required
          sx={{
            '& .MuiOutlinedInput-root.Mui-disabled': {
              '& fieldset': {
                borderColor: '#d3d3d3',
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: error ? 'red' : 'rgba(0, 0, 0, 0.23)',
              },
            },
            borderRadius: 2,
          }}
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: disabled ? '#f0f0f0' : 'white',
            },
          }}
        />
      )}
      disableClearable
      freeSolo
      disabled={disabled}
    />
  );
};

export default CityInput;
