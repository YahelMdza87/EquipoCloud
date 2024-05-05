import Logo from "../assets/logo-domoticloud.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CreateZoneForm from "./CreateZoneForm";
export default function SeeZone({selectedZone,userData}){
    const navigate = useNavigate();
    const localStorageSelectedZone = JSON.parse(localStorage.getItem("idZona"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    if(localStorageSelectedZone){
        selectedZone = localStorageSelectedZone;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    function toUserAccount(){
        navigate('/UserAccount')
      }
      function toIndex(){
        navigate('/Principal')
      }
    
    return(
        <div className="body-principal">
             <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
            </div>
            <h1>{selectedZone.nameZone  }</h1>
            <div className="section-image-zone">
                <img style={{objectFit:"cover", width:"100%", borderRadius:"20px"}} src="https://planner5d.com/blog/content/images/2022/06/sidekix-media-iu4K1XPnNAY-unsplash.jpg" alt="" />
            </div>
            <div className="section-devices-zone">
            </div>
            <div className="section-rooms-zone">
            </div>
        </div>
    )
}