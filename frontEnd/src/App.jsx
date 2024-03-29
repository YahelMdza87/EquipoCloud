"use client";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login';
import Principal from './components/Principal'
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";

function App() {
  //Le dejamos claro a react que crearemos estas variables para almacenar los datos del usuario. Una es la variable donde se guardara y la otra es la funcion que lo guardara
  const [userData, setUserData] = useState(null)

  //Metodo llamado desde Login.jsx donde recibimos credentialResponseDecoded y aquí lo usaremos como data
  const handleLogin = (data) => {
    //Llenamos userData con setUserData (esto lo declaramos en la linea 14)
    setUserData(data);
  }

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={"468778218661-69jde72qsrpa89fk3ioor7b2gcn5hg9e.apps.googleusercontent.com"}>
        
        <Routes>
          {/* Les pasamos las funciones para que las puedan llamar correctamente */}
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/principal" element={<Principal userData={userData} setUserData={setUserData}/>} />
          </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
