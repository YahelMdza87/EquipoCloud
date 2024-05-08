import "../App.css"
import React, { useState, useEffect } from 'react';
const RouteAddCollaborator = import.meta.env.VITE_ADD_COLLABORATOR || "http://localhost:3000/add/colaborador"
export default function CreateCollaboratorForm({onClose, id}){
    const [nameCollaborator, setNameCollaborator] = useState("");
    const [idUserCollaborator, setIdUserCollaborator] = useState("")
    const [emailsUsers, setEmailsUsers] = useState([]);
    
    const handleNameCollaborator = (event) => {
        setNameCollaborator(event.target.value);

    }
    function handleSuccess(){
        if(nameCollaborator!==""){
            console.log(nameCollaborator)
            console.log(id)
            fetch(`${RouteAddCollaborator}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idusucolab: JSON.stringify(idUserCollaborator),
                idcomunidad: JSON.stringify(id.idZone)
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
                    <h2 className="title-login">Agregar colaborador</h2>
                    <div>
                        <h3 className="title-data-login">Nombre:</h3>
                        <input className='input-login' type="text" value={nameCollaborator} onChange={handleNameCollaborator} placeholder='Nombre del colaborador...' />
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Agregar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}