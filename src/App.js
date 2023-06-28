import React from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";

import {Navigation} from "./components/Navigation";
import FormBuilder from "./components/FormBuilder";
import "react-nestable/dist/styles/index.css";


import {MuiThemeProvider} from "@material-ui/core";
import {createTheme} from "@mui/material";

// Or Create your Own theme:
const theme = createTheme({
    palette: {
        warning:{
            light:'#ba68c8',
            main: '#B400B4',
            dark: '#4a148c'
        },

        background:{
            default: '#B400B4'
        },
        primary:{
            light:'#ba68c8',
            main: '#B400B4',
            dark: '#4a148c'
        },
        secondary: {
            light:'#FF0000',
            main: '#D50000',
            dark: '#AC0202'
        },
        info:{
            light:'#ba68c8',
            main: '#B400B4',
            dark: '#4a148c'
        },
        success:{
            light:'#ba68c8',
            main: '#B400B4',
            dark: '#4a148c'
        }
    }
});

function App() {
    const location= useLocation()
    const isLoggedInn = !!localStorage.getItem('token')
    //const isTokenHasExpired = (isLoggedInn ? jwtDecode(localStorage.getItem('token')).exp < Date.now() / 1000 : true)

    if (!isLoggedInn && location.pathname !==`/register`) {
        console.log(location.pathname)
        return <LoginPage/>
    }
    if (!isLoggedInn && location.pathname ===`/register`) {
        return <RegisterPage/>
    }

  return (
      <MuiThemeProvider theme={theme}>
        <Navigation/>
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/register" element={ <RegisterPage/>} />
          <Route path="/create" element={ <FormBuilder/> }/>
          <Route path="/edit/:id" element={<FormBuilder/>}/>
        </Routes>
      </MuiThemeProvider>
  );
}
export default App;
