// MyComponent.js
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const MyComponent = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div>
      {isMobile ? <p>Mobile view</p> : <p>Desktop view</p>}
    </div>
  );
};

export default MyComponent;
