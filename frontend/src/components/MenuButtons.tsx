import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../styles/customMenuButton.scss';
const MenuButtons: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('result');

  const handleClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <Container>
    <Row className="text-center mt-4">
      <Col>
        <Button
          variant={'primary'}
          className={`btn ps-3 pe-3 m-2 ${selectedButton === 'result' ? '' : 'custom-button'}`}
          size="lg"
          onClick={() => handleClick('result')}
        >
          Result
        </Button>
        <Button
          variant={'primary'}
          className={`btn ps-2 pe-2 m-2 ${selectedButton === 'favorite' ? '' : 'custom-button'}`}
          size="lg"
          onClick={() => handleClick('favorite')}
        >
          Favorite
        </Button>
      </Col>
    </Row>
    </Container>
  );
};

export default MenuButtons;