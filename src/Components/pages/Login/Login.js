import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './loginStyles.module.css';




function Login (props){

    return(
        <div className={styles.main}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Login</h3>

                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="name"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="surname"
                                />

                            </Form.Group>
                            <div  className={styles.loginContainer}>
                                <Button variant="primary"
                                    // onClick={handleSubmit}
                                >
                                    LogIn
                                </Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login