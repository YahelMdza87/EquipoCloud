import "../App.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const RouteDeleteZone = import.meta.env.VITE_DELETE_ZONA || "http://localhost:3000/delete/zona";
const RouteDeleteRoom = import.meta.env.VITE_DELETE_CUARTO || "http://localhost:3000/delete/cuarto";
const RouteDeleteSensor = import.meta.env.VITE_DELETE_SENSOR || "http://localhost:3000/delete/sensor";
const RouteDeleteComunity = import.meta.env.VITE_DELETE_COMUNIDAD || "http://localhost:3000/delete/comunidad";
const RouteDeleteCollaborator = import.meta.env.VITE_DELETE_COLABORADOR || "http://localhost:3000/delete/colaborador";
export default function DeleteComponent({onClose, id, wich}){
    const navigate = useNavigate();
    function handleCancel(){
        onClose();
        console.log(id)
    }
    function handleSuccess(){
        console.log(wich.localStorageWichComponent)
        console.log(id);
        if(wich.localStorageWichComponent==="room"){
            fetch(`${RouteDeleteRoom}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idcuarto: JSON.stringify(id.idRoom)
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un problema al realizar la solicitud.');
                }
                return response.json();
            })
            .then(data => {
                alert("Cuarto eliminada exitosamente")
                onClose();
                navigate("/principal")
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        else if (wich==="zone"){
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
        else if (wich==="comunity"){
            fetch(`${RouteDeleteComunity}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idcomu: JSON.stringify(id.idZone)
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
        else if (wich==="sensor"){
            fetch(`${RouteDeleteSensor}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idsensor: JSON.stringify(id.idZone)
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
        else if (wich==="collaborator"){
            fetch(`${RouteDeleteCollaborator}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idcolab: JSON.stringify(id.idZone)
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