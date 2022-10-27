import axios from 'axios'

const API = axios.create({baseURL: "http://127.0.0.1:5000"})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})


export const getPosts = () => API.get('/post')
export const getMorePosts = (skip) => API.post('/postMore', skip)
export const postStatus = (postData) => API.post('/post', postData)
export const deletePost = (id) => API.delete(`${'/post'}/${id}`)
export const updatePost = (id, postData) => API.post(`${'/post'}/${id}`, postData)

export const signUpApi = (form) => API.post('/user/signUp', form)
export const signInApi = (form) => API.post('/user/signIn',form)

export const editAccount = (form) => API.post('/user/editAccount',form)