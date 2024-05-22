import React from 'react';

const Loading = () => {
  return (
    <div className="body-principal">
      <div style={{display:"flex", alignItems:"center", alignContent:"center",justifyContent:"center", height:"70%"}}>
        <div className="loading-spinner">
        </div>
      </div>
    </div>
  );
};

export default Loading;