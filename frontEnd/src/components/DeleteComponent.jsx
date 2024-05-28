import "../App.css"
import React from 'react';
import { useNavigate } from "react-router-dom";
import toOut from "../assets/to-out.png"
const RouteDeleteZone = import.meta.env.VITE_DELETE_ZONA || import.meta.env.VITE_DELETE_ZONA_LH;
const RouteDeleteRoom = import.meta.env.VITE_DELETE_CUARTO || import.meta.env.VITE_DELETE_CUARTO_LH;
const RouteDeleteSensor = import.meta.env.VITE_DELETE_SENSOR || import.meta.env.VITE_DELETE_SENSOR_LH;
const RouteDeleteComunity = import.meta.env.VITE_DELETE_COMUNIDAD || import.meta.env.VITE_DELETE_COMUNIDAD_LH;
const RouteDeleteCollaborator = import.meta.env.VITE_DELETE_COLABORADOR || import.meta.env.VITE_DELETE_COLABORADOR_LH;
export default function DeleteComponent({onClose, id, wich}){
    const navigate = useNavigate();
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    //Si hace click al botón de cancelar, se cierra la ventana de cerrar sesión
    function handleCancel(){
        onClose();
    }
    //Una vez de haberle picado al botón de eliminar, entrará aquí y comprobara cual componente eliminara
    function handleSuccess(){
        if(localStorageWichComponent==="room"){
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
                alert("Cuarto eliminado exitosamente")
                onClose();
                navigate("/seeZone")
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        else if (localStorageWichComponent==="zone"){
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
        else if (localStorageWichComponent==="comunity"){
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
                alert("Comunidad eliminada exitosamente")
                onClose();
                navigate("/userAccount")
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        else if (localStorageWichComponent==="sensor"){
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
                alert("Sensor eliminado exitosamente")
                onClose();
                navigate("/seeRoom")
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        else if (wich.strCollaborator!=="" && wich.strCollaborator!==undefined){
            console.log(id.idCollaborator);
            fetch(`${RouteDeleteCollaborator}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idcolab: id.idCollaborator
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un problema al realizar la solicitud.');
                }
                return response.json();
            })
            .then(data => {
                alert("Colaborador eliminado exitosamente")
                onClose();
                navigate("/seeCommunity")
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        
    }

    return(
        <div className="background-principal fade-in" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div style={{display:"grid"}}><img className="close-create" src={toOut} alt="" onClick={onClose} /></div>
                <div className="div-create-component">
                    <h2 className="title-create-component">¿Estas seguro?</h2>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                        <button style={{marginRight:"4%"}} className="btn-submit-create-component only-button" type="button" onClick={onClose}>Cancelar</button>
                        <button className="btn-submit-create-component" type="button" onClick={handleSuccess}>Eliminar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}