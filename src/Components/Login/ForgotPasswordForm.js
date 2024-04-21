import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPasswordForm = ({ onResetPassword, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://35.184.241.89:3000/user/forgot-password', {
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
      <h2 className="form-title1">Forgot Password</h2>
      <form>
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          New Password:
          <input
            className="form-input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="form-button" type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
        <br />
        <p className="or-text">OR</p>
        <br />
        <button className="form1-button" type="button" onClick={onBackToLogin}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
