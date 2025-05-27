import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = ({ height }) => {
  const containerHeight = height || 220;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: containerHeight,
        width: '100%',
      }}
    >
      <AiOutlineLoading3Quarters
        style={{
          fontSize: 30,
          color: '#3498db',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
