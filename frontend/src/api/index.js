import axios from 'axios'

const API = axios.create({baseURL: "http://127.0.0.1:5000"})

export const signUpApi = (form) => API.post('/user/signUp', form)
export const signInApi = (form) => API.post('/user/signIn',form)