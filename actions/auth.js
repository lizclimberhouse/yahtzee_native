import axios from 'axios';
import { AUTH_URL } from '../utils/urls';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';

export const login = (email, password, history) => {
  return (dispatch) => {
    axios.post(`${AUTH_URL}/sign_in`, { email, password })
    .then( ({ data, headers}) => {
      dispatch(user(data,headers))
      history.push('/')
    }) //need to install react router now
  }
}

export const register = (email, password, password_confirmation, history) => {
  return (dispatch) => {
    axios.post(`${AUTH_URL}`, { email, password, password_confirmation } )
    .then( ({ data, headers }) => {
      dispatch(user(data, headers))
      history.push('/')
    })
  }
}

export const logout = (history) => {
  return (dispatch) => {
    axios.delete(`${AUTH_URL}/sign_out`)
    .then( res => dispatch({ type: LOGOUT }) )
  }
}

export const validateToken = (cb = () => {}) => { //this is another way to do the f fucniton that does no hwere. can also write this as cb = (f) => {} 
  return (dispatch) => {
    dispatch({ type: VALIDATE_TOKEN })
    const headers = axios.defaults.headers.common
    axios.get(`${AUTH_URL}/validate_token`, headers)
      .then( ({ data, headers }) => {
        dispatch(user(data, headers))
        cb()
      }).catch(() => cb())
  }
}

const user = (res, headers) => {
  return { type: LOGIN, user: res.data, headers } // not exported its like a private function
// devise needs data.data so we had to change it to res.data...? 
}