import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Signup from "./components/signup/Signup.js";
// import Profile from "./components/profile/Profile.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// export const AuthContext = React.createContext();
import AuthContextProvider from "./AuthContext.js";
// import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => {

  return (
    <main className = 'App'>
      <Signup />
    </main>
  );
}

export default App;