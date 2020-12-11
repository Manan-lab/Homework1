import React, { PureComponent } from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../../EditTaskModal';
import { getTask,removeTask } from '../../../store/actions';
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


    componentDidUpdate(prevProps){
        if(!prevProps.removeTaskSuccess && this.props.removeTaskSuccess){
            this.props.history.push('/')
        }
    }

    
    handleRemove = ()=>{
        const taskId = this.props.task._id;
        this.props.removeTask(taskId, 'single');
    }

    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }




    // handleSave = (taskId, data) => {
    //     fetch(`http://localhost:3001/task/${taskId}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-Type": 'application/json',
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((editedTask) => {

    //             if (editedTask.error) {
    //                 throw editedTask.error;
    //             }
    //             this.setState({
    //                 task: data,
    //                 isEdit: true
    //             });

    //             this.toggleEditModal()
    //         })
    //         .catch((err) => {
    //             console.log('err', err);
    //         });
    // };



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

    }
}

const mapDispatchToProps = {
    getTask,
    removeTask
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);