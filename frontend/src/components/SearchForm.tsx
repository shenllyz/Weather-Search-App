import React, { useState } from 'react';
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
import { fetchIpInfo, fetchGeocodingData } from '../utils/formHandlers';
 

const SearchForm: React.FC = () => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseCurrentLocation(isChecked);
    setInputsDisabled(isChecked);

    if (isChecked) {
      setStreet('');
      setCity('');
      setState('');
      setIsFormValid(true);
    } else {
      setIsFormValid(street !== '' && city !== '' && state !== '');
    }
  };

  const handleInputChange = () => {
    setIsFormValid(useCurrentLocation || (street !== '' && city !== '' && state !== ''));
  };

  const handleSubmit = async () => {
    if (useCurrentLocation) {
      await fetchIpInfo();
    } else {
      const address = encodeURIComponent(`${street}, ${city}, ${state}`);
      await fetchGeocodingData(address);
    }
  };

  const handleClear = () => {
    setUseCurrentLocation(false);
    setStreet('');
    setCity('');
    setState('');
    setIsFormValid(false);
    setInputsDisabled(false);
  };
  return (
    <Container className="customContainer p-4 rounded shadow-lg text-center mt-3">
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
            onChange={(newValue) => {
              setStreet(newValue);
              handleInputChange();
            }}
            disabled={inputsDisabled}
          />
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
                value={city}
                onChange={(value) => {
                  setCity(value);
                  handleInputChange();
                }}
                disabled={inputsDisabled}
              />
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
              value={state}
               onStateChange={(newState) => {
                setState(newState);
                handleInputChange();
              }}
              disabled={inputsDisabled}
            />
          </Col>
           
        </Form.Group>
         <Row className='mt-3'>
            <Col xs={12} md={8}>
                <hr style={{ border: '1px solid black', width: '100%' }}/>
            </Col>
         </Row>
        <Row className="mb-3 justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="autodetect-location" className='me-3'>
                Autodetect Location<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <input
                type="checkbox"
                id="autodetect-location"
                name="autodetect-location"
                className='mb-2 me-1 custom-checkbox'
                checked={useCurrentLocation}
                onChange={handleCheckboxChange}
              />
              <Form.Label htmlFor="current-location" className="form-check-label">Current Location</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <SearchButton onSubmit={handleSubmit} disabled={!isFormValid}/>
            <ClearButton onClear={handleClear} />
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default SearchForm;
