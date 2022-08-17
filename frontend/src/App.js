import React from "react";
import './App.css';
// import Form from './Form/Form';
import Auth from "./Component/Auth/Auth";
import Home from "./Component/Home/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Container} from '@material-ui/core'

function App() {
  return (
    <BrowserRouter>
        <Container disableGutters={true}>
            <Routes>
                <Route path="/" exact element={<Auth />} />
                <Route path="/home" exact element={<Home />} />
            </Routes>
        </Container>
    </BrowserRouter>
  );
}

export default App;
