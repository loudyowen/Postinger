import React from "react";
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./Component/Auth/Auth";
import Home from "./Component/Home/Home";
import Testing from "./Component/Testing/Testing"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {Container} from '@material-ui/core'
import Profile from "./Component/Profile/Profile";
import AccountSetting from "./Component/AccountSetting/AccountSetting";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const userData = JSON.parse(localStorage.getItem('profile'))
  return (

     <ThemeProvider theme={darkTheme}>
     <CssBaseline />
     <BrowserRouter>
        <Container disableGutters={true} maxWidth={false}>
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
        </Container>
    </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
