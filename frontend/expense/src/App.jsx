import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from "react";

import{

  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";

//import Root from "./pages/Dashboard/Root";


//import the different pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";

import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import { Toast } from 'bootstrap';



import {Toaster} from 'react-hot-toast'

const App = () => {
  //const [count, setCount] = useState(0)

  return (
    <UserProvider>

      <div>
            <Router>

              <Routes>

                <Route path="/" element={<Root/>} />

                <Route path="/login" exact element={<Login />} />

                <Route path="/signUp" exact element={<SignUp />} />

                <Route path="/dashboard" exact element={<Home />} />

                <Route path="/income" exact element={<Income />} />

                <Route path="/expense" exact element={<Expense />} />



              </Routes>

            </Router>

            
        </div>


        <Toaster toastOption = {{className: "", style: {fontSize: '13px'},}} />



    </UserProvider>

  );

};

export default App


const Root = () => {

  const isAuth = !!localStorage.getItem("token");

  //if authenticated then go to dashboard, otherwise to login
  return isAuth ? (

    <Navigate to = "/dashboard" />

  ) : (

    <Navigate to = "/login" />
  );

};
