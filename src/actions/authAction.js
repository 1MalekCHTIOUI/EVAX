import axios from "axios";
import {returnErrors} from './errorAction'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

export const register = ({first_name, last_name, email, password}) => dispatch => {
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    const body = JSON.stringify({first_name, last_name, email, password});
    axios.post('https://vaxiq.herokuapp.com/users/signup', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .then(()=>{window.location.pathname = "/dashboard"})
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    const body = JSON.stringify({email, password});
    axios.post('https://vaxiq.herokuapp.com/auth/signin', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .then(()=>{window.location.pathname = "/"})
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}





export const logout = () => {
    return (
        window.location.pathname="/",
        {
            type: LOGOUT_SUCCESS,
        }
    )
}




export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING})
    const token = getState().auth.token;
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    if(token) {
        config.headers['x-auth-token'] = token
    }

    axios.get('https://vaxiq.herokuapp.com/auth/user', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}
