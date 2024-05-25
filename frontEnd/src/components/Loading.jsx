import React from 'react';

const Loading = () => {
  return (
    <div className="body-principal">
      <div style={{display:"flex", alignItems:"center", alignContent:"center",justifyContent:"center", minHeight:"800px"}}>
        <div className="loading-spinner">
        </div>
      </div>
    </div>
  );
};

export default Loading;