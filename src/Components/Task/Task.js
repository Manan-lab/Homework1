import React, { PureComponent } from 'react';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck,faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { removeTask ,changeTaskStatus} from '../../store/actions';
import { formatDate, shortString } from '../../helpers/utils';
import { connect } from 'react-redux';

class Task extends PureComponent {
    state = {
        checked: false
    };

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        });

        this.props.onCheck();
    };

    render() {
        const { data, removeTask, onEdit, disabled } = this.props;
        const { checked } = this.state;

        const cardClasses = ['card', styles.task];
        if (checked) {
            cardClasses.push(styles.checked);
        };

        if (data.status === 'active') {
            cardClasses.push(styles.active);
        } else {
            cardClasses.push(styles.done)
        }

        return (
            <Card
                className={cardClasses.join(' ')}
            >
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    onClick={this.toggleCheckbox}
                />
                <Card.Body>
                    <Link
                        to={`/task/${data._id}`}>
                        <Card.Title>{data.title}</Card.Title>
                    </Link>
                    <Card.Text>
                        Description: {shortString(data.description, 8)}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(data.date)}
                    </Card.Text>
                    <Card.Text>
                        Created: {formatDate(data.created_at)}
                    </Card.Text>
                    <Card.Text>
                        Status: {data.status}
                    </Card.Text>



                    {
                        data.status === "active" ?
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip>
                                        <strong>Mark as done</strong>
                                    </Tooltip>
                                }
                            >
                                <Button
                                    title='Mark as done'
                                    className='m-1'
                                    variant="success"
                                    onClick={() => this.props.changeTaskStatus(data._id, { status: 'done' })}
                                    disabled={disabled}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button>
                            </OverlayTrigger>
                            :
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip>
                                        <strong>Mark as active</strong>
                                    </Tooltip>
                                }
                            >
                                <Button
                                    title='Mark as active'
                                    className='m-1'
                                    variant="warning"
                                    onClick={() => this.props.changeTaskStatus(data._id, { status: 'active' })}
                                    disabled={disabled}
                                >
                                    <FontAwesomeIcon icon={faHistory} />
                                </Button>
                            </OverlayTrigger>
                    }

                    
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip>
                                <strong>Edit</strong>
                            </Tooltip>
                        }
                    >


                        <Button
                            title='Edit'
                            className='m-1'
                            variant="info"
                            onClick={onEdit}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </OverlayTrigger>


                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip>
                                <strong>Delete</strong>
                            </Tooltip>
                        }
                    >
                        <Button
                            title='Remove'
                            className='m-1'
                            variant="danger"
                            onClick={() => removeTask(data._id)}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </OverlayTrigger>
                </Card.Body>
            </Card>
        );
    }
}


Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

const mapDispatchToProps = {
    removeTask,
    changeTaskStatus
}

export default connect(null, mapDispatchToProps)(Task);