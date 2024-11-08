import React from 'react';
import TextField from '@mui/material/TextField';

interface StreetInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled: boolean;
  error: boolean;
}

const StreetInput: React.FC<StreetInputProps> = ({ value, onChange,  onBlur, disabled, error }) => {
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur} 
      fullWidth
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
        style: {
            backgroundColor: disabled ? '#f0f0f0' : 'white', 
        },
      }}
      disabled={disabled}
      required
    />
  );
};

export default StreetInput;
