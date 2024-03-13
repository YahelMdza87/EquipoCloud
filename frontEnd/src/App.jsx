"use client";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logoGoogle from "./assets/google-logo.png"
import logoFacebook from "./assets/facebook-logo.png"
import { GoogleOAuthProvider } from '@react-oauth/google'
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="card">
        <h1 className="title-login">Iniciar sesión</h1>
          {/* <button onClick={async() => {
            const res = await fetch(`${URL}`);
            const data = await res.json();
            alert(JSON.stringify(data));
          }}
          >
            Dame click para recibir respuesta de servidor
          </button>   */}
        <div className="login-email-password">
          <div>
            <h3 className="title-data-login">Correo:</h3>
            <input className='input-login' type="text" placeholder='Correo...'/>
          </div>
          <div>
            <h3 className="title-data-login">Password:</h3>
            <input className='input-login' type="text" placeholder='Password...'/>
          </div>
          <a href="" style={{color: "#BB98FF"}}>¿No tienes cuenta? Crafteate una.</a>
        </div>
        <div style={{border: "solid 1px #BB98FF", marginTop:"20%"}}></div>
        {/* <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div className='autentication-with-google'>
          <img src={logoGoogle} alt="" />
          <img src={logoFacebook} alt="" />
        </div>
        </GoogleOAuthProvider> */}
       

      </div>
  )
}

export default App
