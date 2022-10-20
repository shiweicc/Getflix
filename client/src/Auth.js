import React, { Component } from 'react';
import getJwt from './getJwt';
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Authenticated: false,
    };
  }
    withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }

    return ComponentWithRouterProp;
  }
  componentDidMount() {
    const { history } = this.props;
    const jwt = getJwt();
    if (!jwt) {
      history.push('/login');
    } else {
      this.setState({ Authenticated: true });
    }
  }

  render() {
    const { children } = this.props;
    const { Authenticated } = this.state;
    if (Authenticated === false) {
      return (
        <div>loading....</div>
      );
    }
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default withRouter(Auth);