import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem('authenticated')) || false;
  });
  const [userType, setUserType] = useState(() => {
    return JSON.parse(localStorage.getItem('userType')) || '';
  });

  const login = (type) => {
    setAuthenticated(true);
    setUserType(type);
  };

  const logout = () => {
    setAuthenticated(false);
    setUserType('');
  };

  useEffect(() => {
    localStorage.setItem('authenticated', JSON.stringify(authenticated));
    localStorage.setItem('userType', JSON.stringify(userType));
  }, [authenticated, userType]);

  return (
    <AuthContext.Provider value={{ authenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
