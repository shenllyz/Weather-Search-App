import React, { useState } from 'react';
import SelectState from './SelectState';
import SearchButton from './SearchButton';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../styles/customCheckbox.scss';
import { fetchIpInfo, fetchGeocodingData } from '../utils/formHandlers';

const SearchForm: React.FC = () => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleSubmit = async () => {
    if (useCurrentLocation) {
      await fetchIpInfo();
    } else {
      const address = encodeURIComponent(`${street}, ${city}, ${state}`);
      await fetchGeocodingData(address);
    }
  }; 

  return (
    <Container className="bg-light p-4 rounded shadow-lg">
      <h2 className="header text-center mb-4">Weather Search ⛅</h2>
      <form>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group className="d-flex flex-column flex-md-row align-items-md-center">
              <Form.Label htmlFor="street" className="me-md-2 mb-2 mb-md-0">Street<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                type="text"
                id="street"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group className="d-flex flex-column flex-md-row align-items-md-center">
              <Form.Label htmlFor="city" className="me-md-2 mb-2 mb-md-0">City<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group className="d-flex flex-column flex-md-row align-items-md-center">
              <Form.Label htmlFor="state" className="me-md-2 mb-2 mb-md-0">State<span style={{ color: 'red' }}>*</span></Form.Label>
              <SelectState onStateChange={setState} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group className="d-flex flex-column flex-md-row align-items-md-center">
              <Form.Label htmlFor="autodetect-location" className='me-3'>
                Autodetect Location<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Check
                type="checkbox"
                id="autodetect-location"
                name="autodetect-location"
                className="custom-checkbox"
                checked={useCurrentLocation}
                onChange={(e) => setUseCurrentLocation(e.target.checked)}
              />
              <Form.Label htmlFor="current-location" className="form-check-label">Current Location</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <SearchButton onSubmit={handleSubmit} />
            <Button variant="outline-light" className="p-2" size="lg">
              <i className="bi bi-list-nested fst-normal text-secondary fs-5 m-2">Clear</i>
            </Button>
          </Col>
        </Row>
      </form>
      <input type="checkbox" className='custom-checkbox'/>
    </Container>
  );
};

export default SearchForm;
