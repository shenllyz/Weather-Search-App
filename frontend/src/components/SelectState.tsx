import { TextField, Autocomplete } from '@mui/material';
import { states } from '../utils/stateOptions';

interface SelectStateProps {
  value: string;
  onStateChange: (state: string) => void;
  onBlur?: () => void;
  disabled: boolean;
  error: boolean;
}

const SelectState: React.FC<SelectStateProps> = ({ value, onStateChange, onBlur, disabled, error }) => {
  
  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    onStateChange(newInputValue);
  };

  return (
    <Autocomplete
      freeSolo
      options={states.map((state) => state.name)}
      inputValue={value}
      onInputChange={handleInputChange}
      onBlur={onBlur}
      disabled={disabled}
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
              padding: '10px',
            },
          }}
        />
      )}
    />
  );
};

export default SelectState;