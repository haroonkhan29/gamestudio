import React from 'react';
const DateFilterInput = ({ selectedDate, handleDateChange }) => {
  return (
    <div className="date-filter">
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="custom-date-input"
      />
    </div>
  );
};

export default DateFilterInput;
