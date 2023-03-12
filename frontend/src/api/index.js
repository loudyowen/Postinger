import axios from 'axios'
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../constant/actionType';
import { useNavigate } from 'react-router-dom';

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// const API = axios.create({baseURL: "https://backend-ogmwfxnr5q-as.a.run.app/"})
const API = axios.create({baseURL: "http://127.0.0.1:5000"})


API.interceptors.request.use((req)=>{
    const cookie = getCookie('token');
    if(document.cookie){
        req.headers.authorization = cookie;
    }
    
    return req;
})


export const getPosts = () => API.get('/post')
export const getPostsProfile = (id) => API.get(`${'/post'}/${id}`)
export const getMorePosts = (skipId) => API.post('/postMore', skipId)
export const postStatus = (postData) => API.post('/post', postData)
export const postComment = (postData) => API.post('/commentPost', postData)

export const deletePost = (id) => API.delete(`${'/post'}/${id}`)
export const updatePost = (id, postData) => API.post(`${'/post'}/${id}`, postData)

export const signUpApi = (form) => API.post('/user/signUp', form)
export const signInApi = (form) => API.post('/user/signIn',form)

export const editAccount = (form) => API.post('/user/editAccount',form)