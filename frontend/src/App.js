import React from "react";
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./Component/Auth/Auth";
import Home from "./Component/Home/Home";


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {Container} from '@material-ui/core'
import Profile from "./Component/Profile/Profile";

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
                {!userData.token ?
                <Route path="/" exact element={<Auth />} />  
                :  
                <Route
                    path="/"
                    element={<Navigate to="/home" replace />}
                />
                }
                <Route path="/home" exact element={<Home />} />
                <Route path="/profile" exact element={<Profile />} />
            </Routes>
        </Container>
    </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
