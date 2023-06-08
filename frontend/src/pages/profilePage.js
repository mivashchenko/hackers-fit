import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {UserSection} from "../components/sections/userSection";

export const ProfilePage = () => {
    return <Container fluid>
        <Row>
            <Col>
                <UserSection/>
            </Col>
        </Row>
    </Container>
}