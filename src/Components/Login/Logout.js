import React, { useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/'); 
  }, [logout, navigate]);

  return null;
};

export default Logout;
