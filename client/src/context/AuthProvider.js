import {createContext, useState} from 'react';

const AuthContext = createContext({});

// components inside auth provider
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value = {{auth, setAuth}}>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthContext;