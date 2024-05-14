import "../App.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const RouteDeleteZone = import.meta.env.VITE_DELETE_ZONA || "http://localhost:3000/delete/zona";
const RouteDeleteRoom = import.meta.env.VITE_DELETE_CUARTO || "http://localhost:3000/delete/cuarto";
const RouteDeleteSensor = import.meta.env.VITE_DELETE_SENSOR || "http://localhost:3000/delete/sensor";
const RouteDeleteComunity = import.meta.env.VITE_DELETE_COMUNIDAD || "http://localhost:3000/delete/comunidad";
const RouteDeleteCollaborator = import.meta.env.VITE_DELETE_COLABORADOR || "http://localhost:3000/delete/colaborador";
export default function DeleteComponent({onClose}){
    const navigate = useNavigate();
    function handleCancel(){
        onClose();
    }
    function handleSuccess(){
        onClose();
        localStorage.clear()
        navigate("/")
    }

    return(
        <div className="background-principal" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div className="login-email-password">
                    <h2 style={{fontSize:"5.3vw", marginBottom:"6%"}} className="title-login">¿Estas seguro de cerrar sesión? {name}</h2>
                    <div style={{display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
                    <button style={{marginRight:"4%", backgroundColor:"#DDCBFF"}} className="btn-submit-data-user" type="button" onClick={handleCancel}>No, cancelar</button>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Sí, cerrar sesión</button>
                    </div>
                </div>

            </div>
        </div>
    )
}