import "../App.css"
import React, { useState, useEffect } from 'react';

const RouteAddZone = import.meta.env.VITE_ADD_ZONA || "http://localhost:3000/add/zona"

export default function CreateZoneForm({onClose, id}){
    //Estados para manejar los inputs del usuario
    const [zoneName, setZoneName] = useState("");
    const [typeZone, setTypeZone] = useState("");
     //Handle que va guardando lo que el usuario escribe al momento
    const handleEmail = (event) => {
        setZoneName(event.target.value)   
    }
     //Handle que va guardando lo que el usuario escribe al momento
    const handleZone = (event) => {
        setTypeZone(event.target.value);
    };
    //Una vez de haberle picado al botón de agregar, entrará aquí y comprobara si el nombre que ha ingresado es valido
    function handleSuccess(){
        if(zoneName!=="" && typeZone!==""){
            let idEdificio = 0;
            if(typeZone==="casa"){
                idEdificio="1";
            }
            else if(typeZone==="oficina"){
                idEdificio="2";
            }
            else if (typeZone==="bodega"){
                idEdificio="3";
            }
            else if (typeZone==="plaza"){
                idEdificio="4";
            }
            else {
                idEdificio="5";
            }
            fetch(`${RouteAddZone}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombrezona: zoneName,
                    idusu: JSON.stringify(id.idUser),
                    idtipoedificio: idEdificio
                })
            })
            .then(response => {
                if(!response.ok){
                    throw new Error('Hubo un problema al realizar la solicitud')
                }
                return response.json();
            })
            .then(data=> {
                onClose();
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
                <div className="login-email-password">
                    <h2 className="title-login">Crear zona</h2>
                    <div>
                        <h3 className="title-data-login">Zona:</h3>
                        <input className='input-login' type="text" value={zoneName} onChange={handleEmail} placeholder='Nombre de la zona...' />
                    </div>
                    <div style={{marginTop:"3%"}}>
                        <h3 className="title-data-login">Tipo de zona:</h3>
                        <select className="list-principal" value={typeZone} onChange={handleZone}>
                            <option value="">Seleccionar...</option>
                            <option value="casa">Casa</option>
                            <option value="oficina">Oficina</option>
                            <option value="bodega">Bodega</option>
                            <option value="plaza">Plaza</option>
                            <option value="almacen">Almacen</option>
                            <option value="plaza grandota">Plaza grandota</option>
                        </select>
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                        <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Crear zona</button>
                    </div>
                </div>
            </div>
        </div>
    )
}