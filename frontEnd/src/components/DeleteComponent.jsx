import "../App.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const RouteDeleteZone = import.meta.env.VITE_ADD_CUARTO || "http://localhost:3000/delete/zona"

export default function DeleteComponent({onClose, id}){
    const navigate = useNavigate();
    function handleCancel(){
        onClose();
        console.log(id)
    }
    function handleSuccess(){
        fetch(`${RouteDeleteZone}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idzona: JSON.stringify(id.idZone)
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            alert("Zona eliminada exitosamente")
            onClose();
            navigate("/principal")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return(
        <div className="background-principal" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div className="login-email-password">
                    <h2 style={{fontSize:"5.3vw", marginBottom:"6%"}} className="title-login">¿Estas seguro?</h2>
                    <div style={{display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
                    <button style={{marginRight:"4%", backgroundColor:"#DDCBFF"}} className="btn-submit-data-user" type="button" onClick={handleCancel}>No, cancelar</button>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Sí, eliminar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}