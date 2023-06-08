import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import {calculateBMI} from "../../utils/calculateBMI";

export const UserSection = () => {

    const [formData, setFormData] = useState({});
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {weight, height} = formData;

    useEffect(() => {
        const result  = calculateBMI({height, weight});
        console.log(result);
    }, [height, weight])

    const updateFormDataField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:5555/get-bju', requestOptions)
            .then(response => response.json())
            .then(response => {
                setResult(response.data);
                setIsLoading(false)
            }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        });
    }

    const handleFormFieldChange = (field) => (e) => {
        const value = e.target.value;
        updateFormDataField(field, value);
    }

    return <Container fluid>
        <Row>
            <Col>
                <Form onSubmit={onFormSubmit}>
                    <Card className={'mb-3'}>
                        <Card.Body>
                            <Form.Group as={Row} className={'mb-3'} controlId="age">
                                <Form.Label column sm={4}>
                                    Возраст
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('age')}/>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="height">
                                <Form.Label column sm={4}>
                                    Рост
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('height')}/>
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className={'mb-3'}>
                        <Card.Body>
                            <Form.Group as={Row} className={'mb-3'} controlId="weight">
                                <Form.Label column sm={4}>
                                    Вес
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('weight')}/>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="goalWeight">
                                <Form.Label column sm={4}>
                                    Целевой вес
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('goalWeight')}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className={'mb-3'} controlId="extraWeight">
                                <Form.Label column sm={4}>
                                    Лишний вес
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('extraWeight')}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="deficitWeight">
                                <Form.Label column sm={4}>
                                    Дефицит
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('deficitWeight')}/>
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className={'mb-3'}>
                        <Card.Body>
                            <Form.Group as={Row} className={'mb-3'} controlId="pal">
                                <Form.Label column sm={4}>
                                    PAL
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control as={'select'} onChange={handleFormFieldChange('pal')}>
                                        <option value="1">1</option>
                                        <option value="1.5">1.5</option>
                                        <option value="2">2</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="bmi">
                                <Form.Label column sm={4}>
                                    BMI
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('bmi')}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="bmr">
                                <Form.Label column sm={4}>
                                    BMR
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('bmr')}/>
                                </Col>
                            </Form.Group>
                            <Button type="submit">Отправить</Button>
                        </Card.Body>
                    </Card>
                </Form>
            </Col>
            <Col>
                <h3>Result:</h3>
                <Card>
                    <Card.Body>
                        {isLoading ? <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> : result}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
}