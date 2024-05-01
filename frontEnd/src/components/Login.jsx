import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';

export default function Login() {
    const navigate = useNavigate();
    const [correo, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //Cuando se rendereize el componente, comprobara si hay datos de usuario ya guardados en localStorage, si es así, direccionará automaticamente a /principal.jsx

    function toSignIn(){
        navigate('/signIn')
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)   
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)   
    }
    //Funcion por si el login se hace correctamente
    function handleSuccess() {
        const email = correo;
        fetch('https://domoticloud.onrender.com/searches/idusu', {
            // fetch('http://localhost:3000/searches/idusu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: email
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            navigate('/principal')
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    //Funcion por si el login se hace correctamente
    function handleSuccessGoogle(credentialResponse) {
        //Decodifica la key del usuario por google y obtiene solamente el nombre  y el gmail.
        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
        const userData = {
            'name' : credentialResponseDecoded.name,
            'user' : "",
            'email' : credentialResponseDecoded.email,
            'pass' : "",
            'workstation': ""
        };
        console.log(userData);
        localStorage.setItem("userData",JSON.stringify(userData));
        navigate('/confirmPassword')
    }
    return(
        
        <div className="body-login">
            <div className="card">
                <h1 className="title-login">Iniciar sesión</h1>
                <div className="login-email-password">
                    <div>
                        <h3 className="title-data-login">Correo:</h3>
                        <input className='input-login' type="text" value={correo} onChange={handleEmail} placeholder='Correo...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Password:</h3>
                        <input className='input-login' style={{marginBottom: "5%"}} type="text" value={password} onChange={handlePassword} placeholder='Password...' />
                    </div>
                    <div>
                        <a href="" onClick={toSignIn}>¿No tienes cuenta? Crafteate una.</a>
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Iniciar sesión</button>
                    </div>
                </div>
                <div style={{ border: "solid 1px #BB98FF", marginTop:"4%"}}></div>
                <div style={{marginTop:"3%", display:"flex", justifyContent:"center"}}>
                    <GoogleLogin
                            onSuccess={handleSuccessGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                </div>
            </div>
            
        </div>
    );
}