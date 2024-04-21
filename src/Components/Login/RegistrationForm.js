import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationForm.css';

const RegistrationForm = ({ onRegisterSuccess, onBackButtonClick }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = async () => {
    if (!newUsername) {
      setUsernameError('Username is required');
      return;
    }

    if (!newEmail) {
      setEmailError('Email is required');
      return;
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(newEmail)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!newPassword) {
      setPasswordError('Password is required');
      return;
    }

    try {
      const response = await fetch('http://35.184.241.89:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          password: newPassword,
        }),
      });

      if (response.ok) {
        setRegistrationSuccess(true);
        onRegisterSuccess({
          username: newUsername,
          email: newEmail,
          password: newPassword,
        });

        toast.success('Registration successful! Now you can log in with your new account.', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const errorData = await response.json();
        console.error('Error during registration:', errorData);
        if (errorData.error === 'User already exists') {
          toast.error('Username or email already exists. Please choose a different one.', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error('An error occurred during registration. Please try again.', {
            position: 'bottom-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An unexpected error occurred. Please try again.', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  return (
    <div className="registration-form">
      <h2 className="form-title">SIGN UP</h2>
      {registrationSuccess ? (
        <div>
          <p>Registration successful!</p>
          <p>Now you can log in with your new account.</p>
        </div>
      ) : (
        <form>
          <label className="form-label">
          <PersonIcon  className="icon" /> 
            <input
              className="form-input"
              type="text"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                setUsernameError('');
              }}
              placeholder="Username"
            />
            <span className="error-message">{usernameError}</span>
          </label>
          <br />
          <label className="form-label">
          <AlternateEmailIcon  className="icon" />          
            <input
              className="form-input"
              type="email"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="Email"

            />
            <span className="error-message">{emailError}</span>
          </label>
          <br />
          <label className="form-label">
            <div className="password-input-container">
            <LockIcon className="icon"/> 
              <input
                className="form-input"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Password"
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <span className="error-message">{passwordError}</span>
          </label>
          <br />
          <br />

          <button className="form-button" type="button" onClick={handleRegister}>
            Create Account
          </button>
          <br />
          <p className="or-text">OR</p>
          <br />

          <button className="form1-button" type="button" onClick={onBackButtonClick}>
            Back to Login
          </button>
        </form>
      )}
    </div>
  );
};


export default RegistrationForm;
