import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import {calculateBMI} from "../../../utils/calculateBMI";
import {calculateBMR} from "../../../utils/calculateBMR";
import {calculateGoalWeight} from "../../../utils/calculateGoalWeight";

export const UserSection = () => {

    const [formData, setFormData] = useState({});
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [bmiData, setBmiData] = useState({});
    const [bmrData, setBmrData] = useState();
    const [goalWeightData, setGoalWeightData] = useState();

    const {weight, height, gender, age, goalBmi} = formData;

    // BMI
    useEffect(() => {
        if (height && weight) {
            const result = calculateBMI({height, weight});
            setBmiData(result);
        }
    }, [height, weight])

    // BMR
    useEffect(() => {
        if (weight && height && age && gender) {
            const result = calculateBMR({weight, height, age, gender});
            setBmrData(result);
        }
    }, [height, weight, age, gender])

    // GOAL WEIGHT
    useEffect(() => {
        if (height) {
            const _goalBmi = goalBmi || 22;
            const result = calculateGoalWeight({height, goalBmi: _goalBmi});
            setGoalWeightData(result);
        }
    }, [height, goalBmi, calculateGoalWeight])

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


    console.log(formData)
    return <Container fluid>
        <Row>
            <Col>
                <Form onSubmit={onFormSubmit}>
                    <Card className={'mb-3'}>
                        <Card.Body>
                            <Form.Group as={Row} className={'mb-3'} controlId="gender">
                                <Form.Label column sm={4}>
                                    Пол
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Check
                                        inline
                                        label="женский"
                                        name="group1"
                                        type={'radio'}
                                        id={`female`}
                                        value={'female'}
                                        onChange={handleFormFieldChange('gender')}
                                    />
                                    <Form.Check
                                        inline
                                        label="мужской"
                                        name="group1"
                                        type={'radio'}
                                        id={`male`}
                                        value={'male'}
                                        onChange={handleFormFieldChange('gender')}
                                    />
                                </Col>
                            </Form.Group>

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

                            <Form.Group as={Row} className="mb-3" controlId="goalBmi">
                                <Form.Label column sm={4}>
                                    Целевой BMI
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Введите число"
                                                  onChange={handleFormFieldChange('goalBmi')}/>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="goalWeight">
                                <Form.Label column sm={4}>
                                    Целевой вес
                                </Form.Label>
                                <Col sm={8}>
                                    <span>{goalWeightData}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className={'mb-3'} controlId="extraWeight">
                                <Form.Label column sm={4}>
                                    Лишний вес
                                </Form.Label>
                                <Col sm={8}>
                                    <span>{(weight - goalWeightData) > 0 ?  (weight - goalWeightData) : '0'}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="deficitWeight">
                                <Form.Label column sm={4}>
                                    Дефицит
                                </Form.Label>
                                <Col sm={8}>
                                    <span>{bmrData && formData.pal && bmiData.category !== "Нормальный вес 😍" ? Math.round(bmrData * formData.pal * 0.2) : ''}</span>
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
                                        <option value="1">Выберите вариант</option>
                                        <option value="1.2">1.2</option>
                                        <option value="1.375">1.375</option>
                                        <option value="1.55">1.55</option>
                                        <option value="1.725">1.725</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="bmi">
                                <Form.Label column sm={4}>
                                    BMI
                                </Form.Label>
                                <Col sm={8}>
                                    {Boolean(bmiData.bmi) && <span
                                        style={{color: bmiData.color || '#333333'}}>{`${bmiData.bmi} ${bmiData.category}`}</span>}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="bmr">
                                <Form.Label column sm={4}>
                                    BMR
                                </Form.Label>
                                <Col sm={8}>
                                    <span>{bmrData ? bmrData : ''}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="bmr">
                                <Form.Label column sm={4}>
                                    TDEE
                                </Form.Label>
                                <Col sm={8}>
                                    <span>{bmrData && formData.pal ? Math.round(bmrData * formData.pal) : ''}</span>
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