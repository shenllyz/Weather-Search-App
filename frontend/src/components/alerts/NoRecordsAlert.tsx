import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NoRecordsAlert: React.FC = () => {
  return (
    <Container style={{ backgroundColor: '#fef0c5' }} className="mt-5 p-3 rounded">
      <Row>
        <Col xs={8} className="text-start" style={{ color: 'black' }}>
          Sorry. No records found.
        </Col>
      </Row>
    </Container>
  );
};

export default NoRecordsAlert;