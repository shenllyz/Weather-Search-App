import React, { useState, useEffect } from 'react';
import SelectState from './SelectState';
import SearchButton from './SearchButton';
import ClearButton from './ClearButton';
import StreetInput from './StreetInput';
import CityInput from './CityInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../styles/customCheckbox.scss';
import '../styles/customContainer.scss';
import { fetchIpInfo, fetchGeocodingData, fetchWeatherData } from '../utils/formDataHandlers';
import { states } from '../utils/stateOptions';

interface SearchFormProps {
  setCity: (city: string) => void;
  setState: (state: string) => void;
  onSearch: (city: string, state: string) => void;
  onClear: () => void;
  setShowProgressBar: (show: boolean) => void;
  setProgress: (progress: number) => void;
  setApiError: (error: boolean) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  setCity,
  setState,
  onSearch,
  onClear,
  setShowProgressBar,
  setProgress,
  setApiError,
}) => {
  const [street, setStreet] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [errors, setErrors] = useState<{ street?: string; city?: string; state?: string }>({});
  const [touchedFields, setTouchedFields] = useState<{ street?: boolean; city?: boolean; state?: boolean }>({});

  useEffect(() => {
    if (useCurrentLocation) {
      setIsFormValid(true);
    } else {
      const isValid =
        !errors.street &&
        !errors.city &&
        !errors.state &&
        street.trim() !== '' &&
        cityInput.trim() !== '' &&
        stateInput.trim() !== '';
      setIsFormValid(isValid);
    }
  }, [errors, street, cityInput, stateInput, useCurrentLocation]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseCurrentLocation(isChecked);
    setInputsDisabled(isChecked);

    if (isChecked) {
      setStreet('');
      setCityInput('');
      setStateInput('');
      setErrors({});
      setTouchedFields({});
      setIsFormValid(true);
    }
  };

  const validateField = (fieldName: 'street' | 'city' | 'state', value: string) => {
    let errorMessage = '';

    if (value.trim() === '') {
      if (fieldName !== 'state') {
        errorMessage = `Please enter a valid ${fieldName}`;
      } else {
        errorMessage = 'Please select a state';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const handleCitySelect = (selectedCityState: { city: string; state: string }) => {
    setCityInput(selectedCityState.city);
    const selectedState = states.find((stateObj) => stateObj.value === selectedCityState.state);
    if (selectedState) {
      setStateInput(selectedState.name);
    }
  };

  const handleSubmit = async () => {
    let latitude: number;
    let longitude: number;
    let city: string;
    let state: string;
    setApiError(false);
    if (useCurrentLocation) {
      try {
        const ipinfo = await fetchIpInfo();
        latitude = parseFloat(ipinfo.latitude);
        longitude = parseFloat(ipinfo.longitude);
        city = ipinfo.city;
        state = ipinfo.state;
      } catch (error) {
        console.error('Error fetching IP info:', error);
        setApiError(true);
        setShowProgressBar(false);
        return;
      } finally {
        setShowProgressBar(false);
      }
    } else {
      setTouchedFields({ street: true, city: true, state: true });
      if (!isFormValid) {
        setShowProgressBar(false);
        return;
      }

      const address = encodeURIComponent(`${street}, ${cityInput}, ${stateInput}`);
      try {
        const geocodingResult = await fetchGeocodingData(address);
        latitude = geocodingResult.latitude;
        longitude = geocodingResult.longitude;
        city = cityInput;
        state = stateInput;
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        setApiError(true);
        setShowProgressBar(false);
        return;
      } finally {
        setShowProgressBar(false);
      }
    }

    try {
      setShowProgressBar(true);
      setProgress(50);
      const weatherData = await fetchWeatherData(latitude, longitude);
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCity(city);
      setState(state);
      onSearch(city, state);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setApiError(true);
    } finally {
      setShowProgressBar(false);
    }
  };

  const handleClear = () => {
    setUseCurrentLocation(false);
    setStreet('');
    setCityInput('');
    setStateInput('');
    setIsFormValid(false);
    setInputsDisabled(false);
    setApiError(false);
    setErrors({});
    setTouchedFields({});
    setShowProgressBar(false);
    setProgress(0);
    onClear();
  };

  return (
    <section>
      <Container className="customContainer p-4 rounded shadow-md text-center mt-3 ">
        <h3 className="header text-center mb-4">Weather Search ⛅</h3>
        <form>
          <Form.Group as={Row} className="align-items-center mb-0">
            <Col md={1}></Col>
            <Col xs={12} md={2} className="text-start">
              <Form.Label htmlFor="street" className="mt-0 mb-0 fs-5">
                Street<span style={{ color: 'red' }}>*</span>
              </Form.Label>
            </Col>
            <Col xs={12} md={8}>
              <StreetInput
                value={street}
                onStreetChange={(value) => {
                  setStreet(value);
                  validateField('street', value);
                }}
                onBlur={() => {
                  setTouchedFields((prev) => ({ ...prev, street: true }));
                  validateField('street', street);
                }}
                disabled={inputsDisabled}
                error={!!errors.street}
              />
              {touchedFields.street && errors.street && (
                <div className="text-danger text-md-start">{errors.street}</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="align-items-center mb-0">
            <Col md={1}></Col>
            <Col xs={12} md={2} className="text-start">
              <Form.Label htmlFor="city" className="mt-0 mb-0 fs-5">
                City<span style={{ color: 'red' }}>*</span>
              </Form.Label>
            </Col>
            <Col xs={12} md={8}>
              <CityInput
                error={!!errors.city}
                value={cityInput}
                onCityChange={(value) => {
                  setCityInput(value);
                  validateField('city', value);
                }}
                onCitySelect={handleCitySelect}
                onBlur={() => {
                  setTouchedFields((prev) => ({ ...prev, city: true }));
                  validateField('city', cityInput);
                }}
                disabled={inputsDisabled}
              />
              {touchedFields.city && errors.city && (
                <div className="text-danger text-md-start">{errors.city}</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="align-items-center mb-3">
            <Col md={1}></Col>
            <Col xs={12} md={2} className="text-start">
              <Form.Label htmlFor="state" className="mt-0 mb-0 fs-5">
                State<span style={{ color: 'red' }}>*</span>
              </Form.Label>
            </Col>
            <Col xs={12} md={4}>
              <SelectState
                value={stateInput}
                onStateChange={(newState) => {
                  setStateInput(newState);
                  validateField('state', newState);
                }}
                onBlur={() => {
                  setTouchedFields((prev) => ({ ...prev, state: true }));
                  validateField('state', stateInput);
                }}
                disabled={inputsDisabled}
                error={!!errors.state}
              />
            </Col>
          </Form.Group>
          <Row className="mt-3">
            <Col xs={12} md={8}>
              <hr style={{ border: '1px solid black', width: '100%' }} />
            </Col>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label htmlFor="autodetect-location" className="me-3">
                  Autodetect Location<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <input
                  type="checkbox"
                  id="autodetect-location"
                  name="autodetect-location"
                  className="mb-2 me-1 custom-checkbox"
                  checked={useCurrentLocation}
                  onChange={handleCheckboxChange}
                />
                <Form.Label htmlFor="current-location" className="form-check-label">
                  Current Location
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <SearchButton onSubmit={handleSubmit} disabled={!isFormValid} />
              <ClearButton onClear={handleClear} />
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default SearchForm;