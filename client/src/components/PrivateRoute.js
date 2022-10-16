import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

function PrivateRoute({ component: Component, userid, ...rest }) {

  const { id } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        return id ? <Component userid={userid} {...props} /> : <Navigate to="/login"/>
      }}
    />
  )
}

export default PrivateRoute