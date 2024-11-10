import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Favorite: React.FC = () => {
    return (
        <Container>
        <Row className='text-center mt-5'>
            <Col>
            <h2 className='result-title'>Favorite Cities</h2>
            </Col>
        </Row>
        </Container>
    );
    };  
export default Favorite;