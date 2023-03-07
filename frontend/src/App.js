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

import {Container} from '@material-ui/core'
import Profile from "./Component/Profile/Profile";
import AccountSetting from "./Component/AccountSetting/AccountSetting";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const userData = JSON.parse(localStorage.getItem('profile'))
  const [cookies, setCookies] = useCookies(['token'])
  const cookie = Cookies.get('token')
  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/">
          <Container disableGutters={true} maxWidth={false}>
              <Routes>
                  { userData==null ?
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    :
                    <Route path="/" element={<Navigate to="/home" replace />} />
                  }
                  <Route path="/"  element={<Auth />} />  
                  <Route path="/home"  element={<Home />} />
                  <Route path="/profile" exact element={<Profile />} />
                  <Route path="/accountSetting" exact element={<AccountSetting />} />
              </Routes>
          </Container>
      </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
