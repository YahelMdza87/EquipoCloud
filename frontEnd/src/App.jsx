"use client";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Omar.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login';
import Principal from './components/Principal'
import UserAccount from './components/UserAccount'
import EditUser from './components/EditUser'
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import Maintenance from './components/Maintenance';
import CreatePassword from './components/CreatePassword';
import OmarUno from './components/OmarUno';
import OmarDos from './components/OmarDos';
import OmarTres from './components/OmarTres';
import SeeZone from './components/SeeZone';
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";

const googlecredencial = import.meta.env.VITE_CREDENCIAL_GOOGLE

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={`${googlecredencial}`}>
        <Routes>
          {/* Les pasamos las funciones para que las puedan llamar correctamente */}
            <Route path="/" element={<Login/>} />
            <Route path="/confirmPassword" element={<CreatePassword/>}/>
            <Route path="/principal" element={<Principal/>} />
            <Route path="/seeZone" element={<SeeZone/>}/>
            <Route path="/userAccount" element={<UserAccount/>} />
            <Route path="/editUser" element={<EditUser/>} />
            <Route path="/signIn" element={<SignIn/>} />
            <Route path="/toHelp" element={<Maintenance/>} />
            <Route path='/*' element={<NotFound/>}></Route>
            <Route path='/omarUno' element={<OmarUno/>}></Route>
            <Route path='/omarDos' element={<OmarDos/>}></Route>
            <Route path='/omarTres' element={<OmarTres/>}></Route>
          </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
