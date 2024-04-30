import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'; 
import Salir from '../assets/to-out.png'
import '../App.css';

export default function SignIn() {
    const navigate = useNavigate();
    //Cuando se rendereize el componente, comprobara si hay datos de usuario ya guardados en localStorage, si es así, direccionará automaticamente a /principal.jsx

    // function enviarDatosUsuario(Email) {
        
    //     fetch('https://domoticloud.onrender.com/usu', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             usu:   //             correo: userEmail
    //         })
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Hubo un problema al realizar la solicitud.');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log(data); // Hacer algo con la respuesta del servidor si es necesario
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // }
    function toLogin () {
        navigate('/');
    }

    const [name, setName] = useState();
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [confirmEmail, setCEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setCPassword] = useState();
    const [workstation, setWorkstation] = useState();

    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleUser = (event) => {
        setUser(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleConfirmEmail = (event) => {
        setCEmail(event.target.value)
    }
    const handlePass = (event) => {
        setPassword(event.target.value)
    }
    const handleCPass = (event) => {
        setCPassword(event.target.value)
    }
    const handleWork = (event) => {
        setWorkstation(event.target.value)
    }
   
    //Funcion por si el signIn se hace correctamente
    function handleSuccess() {
        if (email===confirmEmail && password===confirmPassword){
            const newUser = {
                'name' :        name,
                'user' :        user,
                'email' :       email,
                'pass' :        password,
                'workstation' : workstation,
                'image' : "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
            }
            localStorage.setItem('userData', newUser);       
            navigate('/')
        }
        else{
            alert("El correo y al contraseña deben de coincidir")
        }
    }
    return(
        
        <div className="body-login">
            <div className="card-signIn">
                <div style={{display:"grid"}}><img style={{width:"10%", justifySelf:"left"}} src={Salir} alt="" onClick={toLogin} /></div>
                <h1 className="title-login">Registrarse</h1>
                <div className="login-email-password">
                    <div>
                        <h3 className="title-data-login">Correo:</h3>
                        <input className='input-login' type="text" value={email} onChange={handleEmail} placeholder='Correo...'  />
                    </div>
                    <div>
                        <h3 className="title-data-login">Confirmar correo:</h3>
                        <input className='input-login' type="text" value={confirmEmail} onChange={handleConfirmEmail} placeholder='Confirmar correo...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Nombre:</h3>
                        <input className='input-login' type="text" value={name} onChange={handleName} placeholder='Nombre y Apellido...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Usuario:</h3>
                        <input className='input-login' type="text" value={user} onChange={handleUser} placeholder='Usuario...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Puesto:</h3>
                        <input className='input-login' type="text" value={workstation} onChange={handleWork} placeholder='Puesto en tu empresa...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Contraseña:</h3>
                        <input className='input-login' style={{marginBottom: "5%"}} value={password} type="password" onChange={handlePass} placeholder='Contraseña...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Confirmar contraseña:</h3>
                        <input className='input-login' style={{marginBottom: "5%"}} value={confirmPassword} type="password" onChange={handleCPass} placeholder='Confirmar contraseña...' />
                    </div>
                </div>
                <div style={{marginTop:"1%", display:"flex", justifyContent:"center", padding:"3%"}}>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Guardar</button>
                </div>
            </div>
            
        </div>
    );
}