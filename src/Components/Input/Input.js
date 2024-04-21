import React, { useState } from 'react';

const Input = ({ id, name, type, value, label, placeholder, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div style={{ ...wrapper, borderColor: isFocused ? 'MediumBlue' : 'black' }}>
      <label style={labelStyle} htmlFor={id}>
        {label}
      </label>
      <input
        style={{
          ...inputStyle,
          borderBottom: isFocused ? '2px solid MediumBlue' : '1px solid black',
        }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Input;

const wrapper = {
  display: 'flex',
  justifyContent: 'left',
  margin: '30px 25px',
  flexDirection: 'column',
};

const labelStyle = {
  fontSize: '15px',
  color: 'gray',
  fontWeight: '400',
};

const inputStyle = {
  border: 'none',
  outline: 'none',
  padding: '8px',
  fontSize: '15px',
  textAlign: 'center',
  fontWeight: '500',
  borderRadius: '3px ',
  transition: 'border-color 0.8s ease', 
};
