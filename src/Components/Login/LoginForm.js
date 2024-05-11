import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import CustomAlert from './CustomAlert';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import './LoginForm.css';
// import RegistrationForm from './RegistrationForm';
import ForgotPasswordForm from './ForgotPasswordForm';

  const LoginForm = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  // useEffect(() => {
  //   const registeredUsername = localStorage.getItem('registeredUsername');
  //   if (registeredUsername) {
  //     setUsername(registeredUsername);
  //   }
  // }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

     
        login();
      } else {
        const errorData = await response.json();
        console.error('Error during login:', errorData);
        if (errorData.error === 'Invalid credentials') {
          setInvalidUsername(true);
          setInvalidPassword(true);
          setShowAlert(true);
        } else {
          alert('An error occurred during login. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleRegisterClick = () => {
    setShowRegistration(true);
  };

  const handleRegisterSuccess = ({ firstname , lastname , username, email, password }) => {
    setUsername(username); 
    setPassword('');

    localStorage.setItem('registeredFirstname', firstname);
    localStorage.setItem('registeredLastname', lastname);
    localStorage.setItem('registeredUsername', username);
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    setShowRegistration(false);
    setInvalidUsername(false);
    setInvalidPassword(false);
  };

  const handleBackToLogin = () => {
    setShowRegistration(false);
    setShowForgotPassword(false);
    setShowAlert(false); 
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleResetPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className="login-container">
      <div className="login-form form-inner">
        <h2 className="form-title">{showRegistration ? '' : 'Log in'}</h2>
        {showRegistration ? (
        //   <RegistrationForm onRegisterSuccess={handleRegisterSuccess} onBackButtonClick={handleBackToLogin} />
        // ) : showForgotPassword ? (
          <ForgotPasswordForm onResetPassword={handleResetPassword} onBackToLogin={handleBackToLogin} />
        ) : (
          <>
            <form>
              <label className="form-label">
              <PersonIcon  className="icon" /> 
                <input
                  className={`form-input ${invalidUsername ? 'invalid' : ''}`}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Username"

                />
                {invalidUsername && <p className="error-message">Invalid username</p>}
              </label>
              <br />
              <label className="form-label">
                <div className="password-input-container">
                <LockIcon className="icon"/> 
                  <input
                    className={`form-input ${invalidPassword ? 'invalid' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="toggle-password-buttons"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {invalidPassword && <p className="error-message">Invalid password</p>}
              </label>
              <br />
              <div className="remember-forgot-container">
                <label className="remember-password">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                </label>
                Remember me
                {/* <button className="forgot-password" onClick={handleForgotPasswordClick}>
                  Forgot password?
                </button> */}
              </div>
              <br />
              <button className="form-button" type="button" onClick={handleLogin}>
                LOG IN
              </button>
              <br />
              {/* <p className="register-message">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="register-button"
                  onClick={handleRegisterClick}
                >
                  SIGN UP
                </button> 
              </p> */}
            </form>
            {showAlert && (
              <CustomAlert
                message="Sorry to tell you that due to the website update, you need to reset your password to log in to the website (Click: Forgot Password), please understand, thank you again!"
                onClose={handleBackToLogin} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
