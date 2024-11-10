import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ProgressBarComponentProps {
  progress: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({ progress }) => {
  return (
    <Container>
      <Row className="mt-2">
        <Col xs={12}>
          <ProgressBar animated now={progress} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProgressBarComponent;