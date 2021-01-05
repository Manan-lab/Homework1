import React, { PureComponent } from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../../EditTaskModal';
import { getTask, removeTask, changeTaskStatus } from '../../../store/actions';
import { formatDate } from '../../../../src/helpers/utils'
import { connect } from 'react-redux'



const styles = {
    height: '83vh',
    fontSize: '30px',
    fontWeight: '700',
    color: 'azure',
    padding: '20px',
    marginTop: '35px',
}

class SingleTask extends PureComponent {
    state = {
        isEdit: false
    };

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getTask(taskId);
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
            this.props.history.push('/')
        }

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.toggleEditModal();
        }
    }



    handleRemove = () => {
        const taskId = this.props.task._id;
        this.props.removeTask(taskId, 'single');
    }

    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }


    render() {
        const { isEdit } = this.state;
        const { task } = this.props;


        return (
            <>
                {
                    task ?
                        <div
                            style={styles}
                        >
                            <p>Title: {task.title}</p>
                            <p>Description: {task.description}</p>
                            <p>Date: {task.date.slice(0, 10)}</p>
                            <p>Created: {formatDate(task.created_at)}</p>
                            <p>Status : {task.status}</p>
                            {
                                task.status === "active" ?
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
                                            onClick={() => this.props.changeTaskStatus(task._id, { status: 'done'},'single')}
                                        // disabled={disabled}
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
                                            onClick={() => this.props.changeTaskStatus(task._id, { status: 'active' },'single')}
                                        // disabled={disabled}
                                        >
                                            <FontAwesomeIcon icon={faHistory} />
                                        </Button>
                                    </OverlayTrigger>
                            }

                            <OverlayTrigger
                                placement="top"
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
                                    onClick={this.toggleEditModal}

                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </OverlayTrigger>


                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip>
                                        <strong>Remove</strong>
                                    </Tooltip>
                                }
                            >
                                <Button
                                    title='Remove'
                                    className='m-1'
                                    variant="danger"
                                    onClick={this.handleRemove}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </OverlayTrigger>

                            {isEdit &&
                                <EditTaskModal
                                    data={task}
                                    onCancel={this.toggleEditModal}
                                    from='single'
                                />
                            }
                        </div> :
                        <div>There is no task</div>
                }
            </>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        task: state.task,
        removeTaskSuccess: state.removeTaskSuccess,
        editTaskSuccess: state.editTaskSuccess
    }
}

const mapDispatchToProps = {
    getTask,
    removeTask,
    changeTaskStatus
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);