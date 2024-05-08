import "../App.css"
import React, { useState, useEffect } from 'react';
export default function CloseSesion({onClose}){
    function handleSuccess(){
       
            console.log(roomName)
            console.log(id)
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

    return(
        <div className="background-principal" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div className="login-email-password">
                    <h2 className="title-login">Crear cuarto</h2>
                    <div>
                        <h3 className="title-data-login">Nombre:</h3>
                        <input className='input-login' type="text" value={roomName} onChange={handleRoomName} placeholder='Nombre de la zona...' />
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Crear cuarto</button>
                    </div>
                </div>

            </div>
        </div>
    )
}