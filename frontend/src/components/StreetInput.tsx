import React from 'react';
import TextField from '@mui/material/TextField';

interface StreetInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const StreetInput: React.FC<StreetInputProps> = ({ value, onChange, disabled }) => {
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root.Mui-disabled': {
          '& fieldset': {
            borderColor: '#d3d3d3',  
          },
          borderRadius: 2,
        },
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
