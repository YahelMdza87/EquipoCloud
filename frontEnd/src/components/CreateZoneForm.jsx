import "../App.css"
import React, { useState, useEffect } from 'react';
export default function CreateZoneForm({onClose}){
    const [zoneName, setZoneName] = useState("");
    const [typeZone, setTypeZone] = useState("");

    const handleEmail = (event) => {
        setZoneName(event.target.value)   
    }
    const handleZone = (event) => {
        setTypeZone(event.target.value);
      };
    function handleSuccess(){
        
    }

    return(
        <div className="background-principal" onClick={onClose}>
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
                            <option value="opcion1">casa</option>
                            <option value="opcion2">oficina</option>
                            <option value="opcion3">almacen</option>
                        </select>
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Iniciar sesión</button>
                    </div>
                </div>

            </div>
        </div>
    )
}