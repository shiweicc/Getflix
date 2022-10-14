import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import {
  Router,
  Route,
} from "react-router-dom";
export const AuthContext = React.createContext();

class App extends React.Component{
  constructor(props) {
    super(props);
    this.
    this.state = {
      email: this.props.data?.email || '',
      username: this.props.data?.username || '',
      id: this.props.data?.id || ''
    }
  }
  handleAuthorization(userData) {
    for(var keys in userData) {
      this.setState({
        [keys]: userData[keys] === null ? 0 : userData[keys]
      })
    }
  }

  return () {
    const { id } = this.state;

    <Router>
      <Switch>
        <Route exact path="/login">
          <Login login={this.handleAuthorization}/>
        </Route>

        <Route exact path="/signup">
          <Register signup={this.handleAuthorization}/>
        </Route>

        <AuthContext.Provider value={this.state} >
          <PrivateRoute exact path="/" component={Main} userId={id} />
          <PrivateRoute exact path="/" component={Profile} userId={id} />
        </AuthContext.Provider>

        <Route path="/">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </Router>
  }
}

export default App;