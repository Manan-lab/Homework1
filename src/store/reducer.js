import * as actionTypes from './actionTypes'


const defaultState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  addTaskSuccess: false,
  removeTasksSuccess: false,
  removeTaskSuccess: false,
  editTaskSuccess: false,
  successMessage: null
};



export const mainReducer = (state = defaultState, action) => {


  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null
  }


  switch (action.type) {

    case actionTypes.LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case actionTypes.GET_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: action.tasks
      }
    }



    case actionTypes.ADDING_TASK: {
      return {
        ...state,
        loading: true,
        addTaskSuccess: false,
        successMessage: null,
        error: null
      };
    }

    case actionTypes.ADD_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true,
        successMessage: 'New Task added successfully'
      }
    }

    case actionTypes.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }




    case actionTypes.EDITING_TASK: {
      return {
        ...state,
        loading: true,
        editTaskSuccess: false,
        successMessage: null,
        error: null
      };
    }



    case actionTypes.EDIT_TASK_SUCCESS: {
      const tasks = [...state.tasks];
      const foundIndex = tasks.findIndex(task => task._id === action.editedTask._id);
      tasks[foundIndex] = action.editedTask;

      return {
        ...state,
        loading: false,
        tasks: tasks,
        editTaskSuccess: true,
        successMessage: 'Task edited successfully',
      }
    }




    case actionTypes.REMOVING_TASKS: 
    return {
      ...loadingState,
      removeTasksSuccess: false,
    };


    case actionTypes.REMOVE_TASKS_SUCCESS: {
      let newTasks = [...state.tasks];

      action.taskIds.forEach(taskId => {
        newTasks = newTasks.filter(task => task._id !== taskId);
      });

      return {
        ...state,
        loading: false,
        tasks: newTasks,
        removeTasksSuccess: true,
        successMessage: 'Tasks removed successfully!'
      };
    }




    case actionTypes.GET_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        task: action.task,
        successMessage:false
      }
    }



    
    case actionTypes.REMOVING_TASK:  
    return {
      ...loadingState,
      removeTaskSuccess: false,
    };



    case actionTypes.REMOVE_TASK_SUCCESS: {
      if (action.from === 'single') {
        return {
          ...state,
          loading: false,
          task: null,
          successMessage: 'Task removed successfully',
          removeTaskSuccess:true
        }
      } else {
        const newTask = state.tasks.filter(task => task._id !== action.taskId);
        return {
          ...state,
          loading: false,
          tasks: newTask,
          successMessage: 'Task removed successfully'
        }
      }
    }


    default: return state;
  }
};