import Agregar from "../assets/add-device.png"
import Logo from "../assets/logo-domoticloud.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function Principal({userData}) {
  const navigate = useNavigate();
  
  //Usamos localStorage para obtener el usuario guardado en cookies
  const localStorageUser = JSON.parse(localStorage.getItem('userData'));
  if (localStorageUser){
    userData=localStorageUser;
  }
  function toUserAccount(){
    navigate('/UserAccount')
  }
  function toIndex(){
    navigate('/Principal')
  }

  


  return (
    <div className="body-principal">
      <div className="header-principal">
        <h2 className="header-title-principal">Domoticloud</h2>
        <img src={userData.image} alt="" className="user-image-principal" onClick={toUserAccount}/>
        <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
      </div>
      <div className="section-user-principal">
        <h2 className="hello-user-principal" >Hola {userData.name}</h2>
      </div>
      <div className="section-devices-principal">
        <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Zonas</h1>
        <div className="div-add-zone-principal">
          <img className="add-zone-icon-principal" src={Agregar} alt="" />
          <h3 className="add-zone-text-principal">Agregar area</h3>
        </div>
        
      </div> 
    </div>
  );
}
