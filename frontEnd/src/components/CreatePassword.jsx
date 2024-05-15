import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
const RouteChangeUser = import.meta.env.VITE_CHANGES_USUARIO || "http://localhost:3000/changes/usuario";
const RouteAddUser = import.meta.env.VITE_ADD_USU || "http://localhost:3000/add/usu";

export default function CreatePassword(userData){
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const navigate = useNavigate();
    const localStorageUser = JSON.parse(localStorage.getItem('userData'));
    if (localStorageUser){
        userData=localStorageUser;
    }

    const handlePassword = (event) => {
        setPassword(event.target.value) 
        
    }
    const handleCPassword = (event) => {
        setCPassword(event.target.value)   
    }
    function handleSuccess(){
        if (password === Cpassword && password!=="" && Cpassword!==""){
            console.log(password)  
            const newDataUser = {
                idusuario: userData.idusuario,
                usuario: userData.usuario,
                pass: password,
                nombre: userData.nombre,
                correo: userData.correo,
                cargo: userData.cargo
            }
            console.log(newDataUser) 
            enviarDatosUsuario(newDataUser);

        }

        else{
            alert("Las contraseñas no coinciden")
        }
    }

    function enviarDatosUsuario(data) {
        if(userData.idusuario!==""){
                fetch(`${RouteChangeUser}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idusuario: data.idusuario,
                        usuario: data.usuario ,
                        pass: data.pass,
                        nombre: data.nombre,
                        correo: data.correo,
                        cargo: data.cargo
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al realizar la solicitud.');
                    }
                    return response.json();
                })
                .then(user => {
                    console.log(user)
                    localStorage.setItem("userData", JSON.stringify(data.correo));
                    navigate('/principal');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            console.log(data)
                    fetch(`${RouteAddUser}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        usu: data.usuario ,
                        pass: password,
                        nombre: data.nombre,
                        correo: data.correo,
                        cargo: data.cargo
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al realizar la solicitud.');
                    }
                    return response.json();
                })
                .then(user => {
                    console.log(user)
                    localStorage.setItem("userData", JSON.stringify(data.correo));
                    navigate('/principal');
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }
        
    }
    
    return(
        <div className="body-login">
            <div className="card">
                <h1 className="title-login">Crea tu contraseña</h1>
                <div className="login-email-password">
                    <div>
                        <h3 className="title-data-login">Contraseña:</h3>
                        <input className='input-login' type="text" placeholder="Contraseña..." value={password} onChange={handlePassword}/>
                    </div>
                    <div>
                        <h3 className="title-data-login">Repetir contraseña:</h3>
                        <input className='input-login' style={{marginBottom: "5%"}} type="text" placeholder='Confirmar contraseña...' value={Cpassword} onChange={handleCPassword}/>
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                        <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Crear cuenta</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}