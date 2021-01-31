import * as actionTypes from './userActionTypes';
import {LOADING} from './actionTypes';
import { checkLoginStatus } from './../helpers/auth';


const defaultState = {
  registerSuccess: false,
  loading: false,
  successMessage: null,
  error: null,
  isAuthenticated: checkLoginStatus(),
  userInfo: null,
  addMessageSuccess: false,
  sendFormSuccess:false
};


export const authReducer = (state = defaultState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    addMessageSuccess: false,
    error: null,
  };


  switch (action.type) {
    case actionTypes.AUTH_LOADING: return loadingState;

    case LOADING: return {
      ...state,
      successMessage: null,
      error: null,
    };


    case actionTypes.AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        sendFormSuccess:false
      };
    }

    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: '🎉 You have successfully registered!!!'
      };
    }

    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    }


    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...defaultState,
        isAuthenticated: false
      }
    }


    case actionTypes.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo
      };
    }


    case actionTypes.ADD_MESSAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        sendFormSuccess:true,
        successMessage: 'Your message is sent successfully'
      }
    }

    default: return state;
  }

};