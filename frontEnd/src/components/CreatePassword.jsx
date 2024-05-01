import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';

export default function CreatePassword(userData){
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
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
        if (password === Cpassword){
            console.log(password)  
            const newDataUser = {
                name: userData.name,
                user: "",
                email: userData.email,
                pass: password,
                work: ""
            }
            console.log(newDataUser) 
            enviarDatosUsuario(newDataUser);

        }

        else{
            alert("Las contraseñas no coinciden")
        }
    }
    function enviarDatosUsuario(data) {
        console.log(data)
        // fetch('https://domoticloud.onrender.com/add/usu', {
            fetch('http://localhost:3000/add/usu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usu: "" ,
                correo: data.email,
                nombre: data.name,
                cargo: "",
                pass: data.pass
            })
        })
        .then(response => {
            if (!response.ok) {
                console.log("hola")
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            else{console.log("hola")}
            return response.json();
        })
        .then(data => {
            console.log(data); // Hacer algo con la respuesta del servidor si es necesario
        })
        .catch(error => {
            console.error('Error:', error);
        });
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