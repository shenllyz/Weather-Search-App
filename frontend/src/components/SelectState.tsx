import { TextField, Autocomplete } from '@mui/material';
import { states } from '../utils/stateOptions';

interface SelectStateProps {
  value: string;
  onStateChange: (state: string) => void;
  disabled: boolean;
}

const SelectState: React.FC<SelectStateProps> = ({ value, onStateChange, disabled }) => {
  const handleChange = (event: React.SyntheticEvent, newState: string | null) => {
    onStateChange(newState || '');
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      options={states.map((state) => state.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select or type your state"
          variant="outlined"
          required
          InputLabelProps={{ shrink: false }}
          sx={{  
            '& .MuiOutlinedInput-root.Mui-disabled': {
              '& fieldset': {
                borderColor: '#d3d3d3',  
              },
              borderRadius: 2,
            },
          }}
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: disabled ? '#f0f0f0' : 'white', 
              padding: '10px',
            },
          }}
        />
      )}
      disabled={disabled}
      disableClearable
      freeSolo
    />
  );
};

export default SelectState;