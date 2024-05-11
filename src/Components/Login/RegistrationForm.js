import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Person3Icon from '@mui/icons-material/Person3';
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationForm.css';

const RegistrationForm = ({ onRegisterSuccess, onBackButtonClick }) => {
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [type, setGender] = useState('admin'); 


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    if (!newFirstName) {
      setFirstNameError('First name is required');
      return;
    }

    if (!newLastName) {
      setLastNameError('Last name is required');
      return;
    }

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
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: newFirstName,
          lastname: newLastName,
          username: newUsername,
          email: newEmail,
          password: newPassword,
          type: type, 
        }),
      });

      if (response.ok) {
        setRegistrationSuccess(true);
        onRegisterSuccess({
          firstname: newFirstName,
          lastname: newLastName,
          username: newUsername,
          email: newEmail,
          password: newPassword,
          type: type, 
        });
        toast.success('Registration successful!', {
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
  
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-form">
      <h2 className="form-titles">SIGN UP</h2>
        <form>
          <div class="form-container">
          <label className="form-labels">
            <PersonIcon className="icons" />
            <input
              className="form-inputs"
              type="text"
              value={newFirstName}
              onChange={(e) => {
                setNewFirstName(e.target.value);
                setFirstNameError('');
              }}
              placeholder="First Name"
              onKeyPress={handleKeyPress}
            />
            <span className="error-messages">{firstNameError}</span>
          </label>
          <br />
          <label className="form-labels">
            <PersonIcon className="icons" />
            <input
              className="form-inputs"
              type="text"
              value={newLastName}
              onChange={(e) => {
                setNewLastName(e.target.value);
                setLastNameError('');
              }}
              placeholder="Last Name"
              onKeyPress={handleKeyPress}
            />
            <span className="error-messages">{lastNameError}</span>
          </label>
          <br />
          <label className="form-labels">
            <Person3Icon className="icons" />
            <input
              className="form-inputs"
              type="text"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                setUsernameError('');
              }}
              placeholder="Username"
              onKeyPress={handleKeyPress}
            />
            <span className="error-messages">{usernameError}</span>
          </label>
          <br />
          <label className="form-labels">
            <AlternateEmailIcon className="icons" />
            <input
              className="form-inputs"
              type="email"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="Email"
              onKeyPress={handleKeyPress}
            />
            <span className="error-messages">{emailError}</span>
          </label>
          <br />
          <label className="form-labels">
            <div className="password-input-containers">
              <LockIcon className="icons" />
              <input
                className="form-inputs"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Passwords"
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <span className="error-messages">{passwordError}</span>
          </label>
          <br />
          <div className="gender-selection">
          <label className="gender-label" style={{ color: '#3498db', fontFamily: 'Arial' , fontSize: '15px'}}>Type</label>
  <label className="gender-label">
    <input
      type="radio"
      value="admin"
      checked={type === 'admin'}
      onChange={() => setGender('admin')}
      className="radio-input"
    />
    Admin
  </label>
  <label className="gender-label">
    <input
      type="radio"
      value="user"
      checked={type === 'user'}
      onChange={() => setGender('user')}
      className="radio-input"
    />
    User
  </label>
</div>

              <br/>
          <button className="register-buttons" type="button" onClick={handleRegister}>
            Create Account
          </button>
          {registrationSuccess && (
 <div className="success-message-container">
 <span className="success-message">Account successfully created!</span>
</div>        )}
          </div>
          <br />
        </form>
    </div>
  );
};

export default RegistrationForm;
