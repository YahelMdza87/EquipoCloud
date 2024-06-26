import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || import.meta.env.VITE_SEARCHES_IDUSU_LH;
export default function Login() {
    const navigate = useNavigate();
    //Estados para manejar los inputs del usuario
    const [correo, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        if (email !== "" && password !== ""){
                fetch(`${RoutesearchUser}`, {
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
                    if(data.length > 0){
                        data.forEach(element => {
                            if(element.pass === password){
                                if(element.correo === "admin@cloud.com"){
                                    navigate('/AdminMenu')     
                                }else{
                                    localStorage.setItem("userData", JSON.stringify(email))
                                    navigate('/principal')
                                }
                            }
                            else{
                                alert("Usuario y/o contraseña incorrectos")
                            }
                        });
                    }
                    else{
                        alert("Usuario y/o contraseña incorrectos")
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            alert('No dejes campos vacíos')
        }
       
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
        //Un fetch para ver si hay un usuario regisrado con el usuario de la cuenta de google
        fetch(`${RoutesearchUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: credentialResponseDecoded.email
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    //Si sí lo hay, verificamos si no tiene una contraseña ya definida
                    if(element.pass === "" || element.pass===null || element.pass === undefined){
                        const newData = {
                            idusuario: element.idusuario,
                            usuario: element.usuario,
                            pass: element.pass,
                            nombre: element.nombre,
                            correo: element.correo,
                            cargo: element.cargo
                        }
                        localStorage.setItem("userData",JSON.stringify(newData));
                        navigate("/confirmPassword")
                    }
                    //Si si la tiene, lo mandamos directamente a la zona principal
                    else{
                        localStorage.setItem("userData",JSON.stringify(userData.email));
                        navigate('/principal')
                    }
                });
              } 
              //Ahora, si no hay ninún correo registrado, lo manda a crear su contraseña
              else {
                const newData = {
                    idusuario: "",
                    usuario: "",
                    pass: "",
                    nombre: userData.name,
                    correo: userData.email,
                    cargo: ""
                }
                localStorage.setItem("userData",JSON.stringify(newData));
                navigate("/confirmPassword")
              } 
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }
    return(
        
        <div className="body-login">
            <div className="card fade-in">
                <h1 className="title-login">Iniciar sesión</h1>
                <div className="login-email-password">
                    <div>
                        <h3 className="title-data-login">Correo:</h3>
                        <input className='input-login' type="text" value={correo} onChange={handleEmail} placeholder='Correo...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Password:</h3>
                        <input className='input-login' style={{marginBottom: "5%"}} type="password" value={password} onChange={handlePassword} placeholder='Password...' />
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
                            }}
                        />;
                </div>
            </div>
            
        </div>
    );
}