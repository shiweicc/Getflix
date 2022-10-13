import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main/main.js";
import Signup from './components/signup/Signup.js';
import { useCookies } from 'react-cookie';
import {
  Router,
  Route,
} from "react-router-dom";
export const AuthContext = React.createContext();

function App(){
  return (
    // <Routes>
    //   <Route exact path='/signup' element = {<Signup/>}/>
    //   {/* <Route exact path='/login' element = {<Chris' component/>}/> */}
    //   <Route element {<ReqAuth/>}>
    //     {/* <Route exact path='/shiwei' element = {<Shiwei's component/>}/> */}
    //     {/* <Route exact path='/gene' element = {<Gene's component/>}/> */}
    //     {/* <Route exact path='/david' element = {<David's component/>}/> */}
    //     {/* <Route exact path='/andrew' element = {<Andrew's component/>}/> */}
    //   </Route>
    // </Routes>
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login login={this.handleLogin}/>
        </Route>

        <Route exact path="/signup">
          <Register login={this.handleLogin}/>
        </Route>

        <AuthContext.Provider value={this.state} >
          <PrivateRoute exact path="/" component={Main} userId={id} />
          <PrivateRoute exact path="/" component={Main} userId={id} />
          <PrivateRoute exact path="/" component={Main} userId={id} />
          <PrivateRoute exact path="/" component={Main} userId={id} />
        </AuthContext.Provider>

        <Route path="/">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;2