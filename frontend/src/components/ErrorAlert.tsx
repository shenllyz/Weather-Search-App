import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ErrorAlert: React.FC = () => {
  return (
    <Container style={{ backgroundColor: '#FADBD8' }} className="mt-3 p-3 rounded">
      <Row>
        <Col xs={8} className="text-start" style={{ color: 'black' }}>
          An error occurred, please try again later.
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorAlert;