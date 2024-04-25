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
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={"468778218661-69jde72qsrpa89fk3ioor7b2gcn5hg9e.apps.googleusercontent.com"}>
        <Routes>
          {/* Les pasamos las funciones para que las puedan llamar correctamente */}
            <Route path="/" element={<Login/>} />
            <Route path="/principal" element={<Principal/>} />
            <Route path="/userAccount" element={<UserAccount/>} />
            <Route path="/EditUser" element={<EditUser/>} />
          </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
