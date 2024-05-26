import "../App.css";
import React, { useState, useEffect } from 'react';
import toOut from "../assets/to-out.png";
const RouteAddCommunity = import.meta.env.VITE_ADD_COMUNIDAD || import.meta.env.VITE_ADD_COMUNIDAD_LH;
export default function CreateCommunity({onClose, id}){
    //Estado para manejar el nombre ingresado por el usuario
    const [communityName, setCommunityName] = useState("");

    //Llenado del estado dependiendo del input interactuado por el usuario
    const handleCommunityName = (event) => {
        setCommunityName(event.target.value)   
    }

      //Una vez de haberle picado al botón de agregar, entrará aquí y comprobara si el nombre ingresado es valido
    function handleSuccess(){
        if(communityName!==""){
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
        <div className="background-principal fade-in" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div style={{display:"grid"}}><img className="close-create" src={toOut} alt="" onClick={onClose} /></div>
                <div className="div-create-component">
                    <h2 className="title-create-component">Crear comunidad</h2>
                    <div>
                    <h3 className="title-data-component">Nombre:</h3>
                        <input className="input-create-component" type="text" value={communityName} onChange={handleCommunityName} placeholder='Nombre de la comunidad...' />
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                        <button style={{marginRight:"4%"}} className="btn-submit-create-component only-button" type="button" onClick={onClose}>Salir</button>
                        <button className="btn-submit-create-component" type="button" onClick={handleSuccess}>Crear comunidad</button>
                    </div>
                </div>

            </div>
        </div>
    )
}