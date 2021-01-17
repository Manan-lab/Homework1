import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './registerStyle.module.css';
import { connect } from 'react-redux';
import { register } from '../../../store/userActions';
import { Link } from 'react-router-dom'



function Register(props) {


    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
    });


    const handleSubmit = () => {
        const { name, surname, email, password, confirmPassword } = values;
        let valid = true;

        let passwordMessage = null;

        if (password.length < 6) {
            passwordMessage = '*Password must be at least 6 characters long'
        }

        if (!confirmPassword) {
            passwordMessage = '*Password is required';
            valid = false;
        }
        else if (password !== confirmPassword) {
            passwordMessage = "*Passwords didn't match";
            valid = false;
        }

        setErrors({
            name: name ? null : '*please, add your name',
            surname: surname ? null : '*please, add your surname',
            email: email ? null : '*Email is required',
            confirmPassword: passwordMessage,
            password: password ? null : '*Password is required'
        });

        if (valid) {
            props.register(values);
        }
    }

    const handleChange = ({ target: { name, value } }) => {

        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        })
    }


    



    return (
        <div className={styles.main}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Register</h3>

                            <Form.Group>
                                <Form.Control
                                    className={errors.name ? styles.invalid : ''}
                                    type="text"
                                    placeholder="Enter your name"
                                    value={values.name}
                                    onChange={handleChange}
                                    name="name"
                                />

                                {
                                    <Form.Text className="text-danger"
                                    >
                                        {errors.name}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group>

                                <Form.Control
                                    className={errors.surname ? styles.invalid : ''}
                                    type="text"
                                    placeholder="Enter your surname"
                                    value={values.surname}
                                    onChange={handleChange}
                                    name="surname"
                                />

                                {
                                    <Form.Text className="text-danger"
                                    >
                                        {errors.surname}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group>

                                <Form.Control
                                    className={errors.email ? styles.invalid : ''}
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger"
                                    >
                                        {errors.email}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    className={errors.password ? styles.invalid : ''}
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                />

                                {
                                    <Form.Text className="text-danger"
                                    >
                                        {errors.password}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    className={errors.confirmPassword ? styles.invalid : ''}
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                />

                                {
                                    <Form.Text className="text-danger"
                                    >
                                        {errors.confirmPassword}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <div className={styles.submitContainer}>
                                <Button variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Register
                                </Button>
                            </div>
                                <Link
                                  to='/login'>Already registred? Try to login
                                </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}


const mapDispatchToProps = {
    register
}

export default connect(null, mapDispatchToProps)(Register);
