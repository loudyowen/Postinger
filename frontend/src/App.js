import React from "react";
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./Component/Auth/Auth";
import Home from "./Component/Home/Home";
import Testing from "./Component/Testing/Testing"

import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Profile from "./Component/Profile/Profile";
import AccountSetting from "./Component/AccountSetting/AccountSetting";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const userData = JSON.parse(localStorage.getItem('profile'))
  const [cookies, setCookies] = useCookies(['token'])
  // Cookies.set('token', 'bar')
  const cookie = Cookies.get('token')
  console.log(cookies)
  console.log(cookie)
  return (
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
              <Routes>
                  {userData ?
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    :
                    <Route path="/home" element={<Navigate to="/" replace />} />
                  }
                  <Route path="/" exact element={<Auth />} />  
                  <Route path="/home" exact element={<Home />} />
                  <Route path="/profile" exact element={<Profile />} />
                  <Route path="/accountSetting" exact element={<AccountSetting />} />
                  <Route path="/testing" exact element={<Testing/>}/>
              </Routes>
      </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
