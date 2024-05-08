import "../App.css"
import React, { useState, useEffect } from 'react';
const RouteAddCommunity = import.meta.env.VITE_ADD_COMUNIDAD || "http://localhost:3000/add/comunidad"

export default function CreateCommunity({onClose, id}){
    const [communityName, setCommunityName] = useState("");
    const handleCommunityName = (event) => {
        setCommunityName(event.target.value)   
    }
    function handleSuccess(){
        if(communityName!==""){
            console.log(communityName)
            console.log(id)
            fetch(`${RouteAddCommunity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idusuadmicom: JSON.stringify(id.idUser),
                nombrecomunidad: communityName
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
        <div className="background-principal" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div className="login-email-password">
                    <h2 className="title-login">Crear comunidad</h2>
                    <div>
                        <h3 className="title-data-login">Nombre:</h3>
                        <input className='input-login' type="text" value={communityName} onChange={handleCommunityName} placeholder='Nombre de la comunidad...' />
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Crear comunidad</button>
                    </div>
                </div>

            </div>
        </div>
    )
}