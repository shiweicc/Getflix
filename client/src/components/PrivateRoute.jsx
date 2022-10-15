import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
const AuthContext = React.createContext();

function PrivateRoute({ component: Component, userId, handleBalanceUpdate, ...rest }) {

  const { id } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        return id ? <Component userId={userId} {...props} /> : <Navigate to="/login"/>
      }}
    />
  )
}

export default PrivateRoute