import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';

interface CityInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

interface CityState {
  city: string;
  state: string;
}

const CityInput: React.FC<CityInputProps> = ({ value, onChange, disabled }) => {
  const [options, setOptions] = useState<string[]>([]);

  const fetchOptions = async (inputValue: string) => {
    if (!inputValue) {
      setOptions([]);
      return;
    }
    try {
      const response = await fetch(`https://csci571asgm3backend.wl.r.appspot.com/autocomplete?input=${inputValue}`);
      if (!response.ok) {
        throw new Error('Failed to fetch autocomplete options');
      }
      const data: CityState[] = await response.json();
      const cityNames = data.map(item => item.city); // Extract city names from the response
      const uniqueCityNames = Array.from(new Set(cityNames)); // Ensure unique city names
      setOptions(uniqueCityNames);
    } catch (error) {
      console.error('Error fetching autocomplete options:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    onChange(newInputValue);
    fetchOptions(newInputValue);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string | null) => {
    onChange(newValue || '');
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      inputValue={value}
      onInputChange={handleInputChange}
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
