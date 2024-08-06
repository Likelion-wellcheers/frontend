import React from 'react';

const StatusButton = ({ finish }) => {
  const buttonStyle = {
    backgroundColor: finish ? 'rgba(93, 95, 239, 1)' : 'rgba(238, 235, 232, 1)',
    color: finish ? 'white' : 'rgba(97, 93, 103, 1)',
    padding: '5px 10px',
    border: '1px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  };

  const buttonText = finish ? '해결완료' : '대기중';
  const buttonImage = finish ? '/images/smiling.png' : '/images/load.png';

  return (
    <button style={buttonStyle}>
      <img src={buttonImage} alt="status icon" style={{ width: '10px', height: '10px', marginRight: '8px' }} />
      {buttonText}
    </button>
  );
};

export default StatusButton;
