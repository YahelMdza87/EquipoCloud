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
import UserAccount from './components/UserAccount'
import EditUser from './components/EditUser'
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import Maintenance from './components/Maintenance';
import CreatePassword from './components/CreatePassword';
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
            <Route path="/userAccount" element={<UserAccount/>} />
            <Route path="/editUser" element={<EditUser/>} />
            <Route path="/signIn" element={<SignIn/>} />
            <Route path="/toHelp" element={<Maintenance/>} />
            <Route path='/*' element={<NotFound/>}></Route>
          </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
