import React from 'react';

const LiquidBar = ({ value, color }) => {
  const containerStyle = {
    width: '200px',
    height: '20px',
    border: '1px solid #000',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    marginRight: '8px',
    fontSize: '16px',
  };

  const liquidStyle = {
    width: `${value}%`,
    height: '100%',
    backgroundColor: color,
    position: 'absolute',
    top: '0',
    left: '0',
    transition: 'width 0.5s ease-in-out',
  };

  let icon;
  switch (color) {
    case 'blue':
      icon = '💧'; // Water droplet emoji
      break;
    case 'red':
      icon = '🔥'; // Fire emoji
      break;
    case 'green':
      icon = '🍃'; // Leaf emoji
      break;
    default:
      icon = '';
  }

  return (
    <div style={containerStyle}>
      <span style={iconStyle}>{icon}</span>
      <div style={liquidStyle}></div>
    </div>
  );
};

export default LiquidBar;
