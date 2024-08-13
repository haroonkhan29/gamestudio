import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const ForgotPasswordForm = ({ onResetPassword, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://18.217.96.83:3001/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        toast.success('Password reset successful', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        onResetPassword();
      } else {
        const errorData = await response.json();
        console.error('Error during password reset:', errorData);

        toast.error(`Error: ${errorData.message || 'Unknown error'}`, {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error during password reset:', error);

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
    <div>
      {/* <h2 className="form-title1">Forgot Password</h2> */}
      <form>
        <label className="form-label">
        <AlternateEmailIcon  className="icon2" />      
          Email:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <br />
        <label className="form-label">
        <LockIcon className="icon2"/> 
          New Password:
          <input
            className="form-input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
          />
          
        </label>
        
        <br />
        {/* <button className="form-button" type="button" onClick={handleResetPassword}>
          Reset Password
        </button> */}
        <br />
        {/* <p className="or-text">OR</p> */}
        <br />
        {/* <button className="form1-button" type="button" onClick={onBackToLogin}>
          Back to Login
        </button> */}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
