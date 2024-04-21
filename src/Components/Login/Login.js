import React from 'react';
import { useAuth } from '../../AuthContext';
import LoginForm from './LoginForm';

const Login = () => {
  const { authenticated } = useAuth();

  return (
    <div>
      {!authenticated && <LoginForm />}
      
    </div>
  );
};

export default Login;
