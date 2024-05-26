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
                <div style={{display:"grid"}}><img className="close-create" src={toOut} alt="" onClick={onClose} /></div>
                <div className="div-create-component">
                    <h2 className="title-create-component">¿Estas seguro de cerrar sesión? {name}</h2>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                        <button style={{marginRight:"4%"}} className="btn-submit-create-component only-button" type="button" onClick={onClose}>Cancelar</button>
                        <button className="btn-submit-create-component" type="button" onClick={handleSuccess}>Cerrar sesión</button>
                    </div>
                </div>

            </div>
        </div>
    )
}