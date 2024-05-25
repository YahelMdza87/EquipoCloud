import "../App.css"
import React, { useState, useEffect } from 'react';
import toOut from "../assets/to-out.png"
const RouteAddRoom = import.meta.env.VITE_ADD_CUARTO || import.meta.env.VITE_ADD_CUARTO_LH;

export default function CreateRoomForm({onClose, id}){
    //Estados para manejar los inputs del usuario
    const [roomName, setRoomName] = useState("");

    //Handle que va guardando lo que el usuario escribe al momento
    const handleRoomName = (event) => {
        setRoomName(event.target.value)   
    }

    //Una vez de haberle picado al botón de agregar, entrará aquí y comprobara si el nombre que ha ingresado es valido
    function handleSuccess(){
        if(roomName!==""){
            fetch(`${RouteAddRoom}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idzona: JSON.stringify(id.idZone),
                    nombrecuarto: roomName
                })
            })
            .then(response => {
                if(!response.ok){
                    throw new Error('Hubo un problema al realizar la solicitud')
                }
                return response.json();
            })
            .then(data=> {
                onClose()
            })
            .catch(error => {
                console.error('Error:', error);
            });     
        }
        else{
            alert("Debes de llenar todos los campos");
        }
    }

    return(
        <div className="background-principal fade-in" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div style={{display:"grid"}}><img style={{width:"10%", justifySelf:"left", cursor:"pointer"}} src={toOut} alt="" onClick={onClose} /></div>
                <div className="login-email-password">
                    <h2 className="title-login">Crear cuarto</h2>
                    <div>
                        <h3 className="title-data-login">Nombre:</h3>
                        <input className='input-login' type="text" value={roomName} onChange={handleRoomName} placeholder='Nombre de la zona...' />
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                        <button style={{marginRight:"4%"}} className="btn-submit-data-user only-button" type="button" onClick={onClose}>Salir</button>
                        <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Crear cuarto</button>
                    </div>
                </div>

            </div>
        </div>
    )
}