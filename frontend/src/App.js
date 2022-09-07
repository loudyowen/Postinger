import React from "react";
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from "./Component/Auth/Auth";
import Home from "./Component/Home/Home";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Container} from '@material-ui/core'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (

     <ThemeProvider theme={darkTheme}>
     <CssBaseline />
     <BrowserRouter>
        <Container disableGutters={true} maxWidth='false'>
            <Routes>
                <Route path="/" exact element={<Auth />} />
                <Route path="/home" exact element={<Home />} />
            </Routes>
        </Container>
    </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
