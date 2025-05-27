import React from 'react';

const NoDataMessage = ({ children, height }) => {
  const containerHeight = height || 220;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: containerHeight,
        width: '100%',
        fontSize: '1rem',
        color: '#666',
      }}
    >
      {children || 'Not Found Anything :('}
    </div>
  );
};

export default NoDataMessage;
