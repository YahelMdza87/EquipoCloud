import "../App.css"
import React from 'react';
import { useNavigate } from "react-router-dom";
import toOut from "../assets/to-out.png"
export default function DeleteComponent({onClose}){
    const navigate = useNavigate();

    //Si hace click al botón de cancelar, se cierra la ventana de cerrar sesión
    function handleCancel(){
        onClose();
    }
    //Si hace click al botón de cerrar sesión, se cierra la ventana de cerrar sesión
    function handleSuccess(){
        onClose();
        localStorage.clear()
        navigate("/")
    }

    return(
        <div className="background-principal fade-in" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div style={{display:"grid"}}><img style={{width:"10%", justifySelf:"left", cursor:"pointer"}} src={toOut} alt="" onClick={onClose} /></div>
                <div className="login-email-password">
                    <h2 style={{marginBottom:"6%"}} className="title-login">¿Estas seguro de cerrar sesión? {name}</h2>
                    <div style={{display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
                        <button style={{marginRight:"4%"}} className="btn-submit-data-user only-button" type="button" onClick={handleCancel}>No, cancelar</button>
                        <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Sí, cerrar sesión</button>
                    </div>
                </div>

            </div>
        </div>
    )
}