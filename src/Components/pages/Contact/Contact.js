import React, { useState, useEffect } from 'react';
import styles from './contactUs.module.css';
import { contactUs } from '../../../store/userActions';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';




function ContactUs(props) {



    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });


    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    });

    useEffect(() => {
        if (props.sendFormSuccess) {
            setValues({
                name: '',
                email: '',
                message: ''
            });
        }
    }, [props.sendFormSuccess]);


    const handleSubmit = () => {
        const { name, email, message } = values;

        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailReg.test(email)) {
            setErrors({
                ...errors,
                email: '*Email is not valid'
            });
            return;
        }



        if (name && email && message) {
            props.contactUs(values);

        }

        else {
            setErrors({
                name: name ? null : 'Name is required',
                email: email ? null : 'Email is required',
                message: message ? null : 'Message is required'
            });
        }
    };

    const handleChange = ({ target: { name, value } }) => {

        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        });
    };


    return (
        <div className={styles.contact}>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={10}>

                        <div className={styles.contactUs}>

                            <div className={styles.form}>
                                <h1>Contact Us</h1>
                                <p>Feel free to contact us any time.We will get back to you as soon as we can </p>

                                <input
                                    type="name"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.name}
                                    </Form.Text>
                                }


                                <input
                                    type="email"
                                    placeholder="Enter you email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.email}
                                </Form.Text>



                                <textarea
                                    className={styles.message}
                                    type="message"
                                    placeholder="Enter your message"
                                    name="message"
                                    value={values.message}
                                    onChange={handleChange}
                                >
                                </textarea>

                                <button
                                    className={styles.feedback}
                                    onClick={handleSubmit}
                                >S E N D</button>
                            </div>

                            <div className={styles.contactDetails}>
                                <div className={styles.contactPic}></div>

                                <ul>
                                    <li>
                                        <FontAwesomeIcon
                                            className={styles.icons}
                                            icon={faMobileAlt}
                                        />
                                        <span>     +374 11 11 11</span>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className={styles.icons}
                                        /> 
                                        <span>   contactus@gmail.com</span>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faMapMarkerAlt}
                                            className={styles.icons}
                                        />
                                        <span>    102 Street 2714 Don</span>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </Col>
                </Row>
            </Container>


        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        sendFormSuccess: state.authReducer.sendFormSuccess,

    }
}



const mapDispatchToProps = {
    contactUs
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)