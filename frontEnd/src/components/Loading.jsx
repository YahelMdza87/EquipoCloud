import React from 'react';
import User from "../assets/user.png";
import Logo from "../assets/logo-domoticloud.png";

const Loading = () => {
  return (
    <div className="body-principal">
      <div className="header-principal">
            <h2 className="header-title-principal">Domoticloud</h2>
            <img src={User} alt="" className="user-image-principal" />
            <img src={Logo} alt="" className="add-icon-principal" />
      </div>
      <div style={{display:"flex", alignItems:"center", alignContent:"center",justifyContent:"center", height:"70%"}}>
        <div className="loading-spinner">
        </div>
      </div>
    </div>
  );
};

export default Loading;