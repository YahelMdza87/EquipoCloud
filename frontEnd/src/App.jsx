"use client";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login';
import Principal from './components/Principal'
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={"468778218661-69jde72qsrpa89fk3ioor7b2gcn5hg9e.apps.googleusercontent.com"}>
        
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/principal" element={<Principal />} />
          </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
