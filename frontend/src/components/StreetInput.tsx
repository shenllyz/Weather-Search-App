import React from 'react';
import TextField from '@mui/material/TextField';

interface StreetInputProps {
  value: string;
  onStreetChange: (value: string) => void;
  onBlur?: () => void;
  onChange?: () => void;
  disabled: boolean;
  error: boolean;
}

const StreetInput: React.FC<StreetInputProps> = ({ value, onStreetChange,  onBlur, onChange, disabled, error }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onStreetChange(event.target.value);
        if (onChange) {
          onChange();
        }
      };
  
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={handleChange}
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
