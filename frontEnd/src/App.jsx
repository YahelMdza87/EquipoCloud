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
import AdminMenu from './components/AdminMenu';
import SeeZone from './components/SeeZone';
import Statistics from './components/Statistics';
import ManageCounts from './components/ManageCounts';
import Licences from './components/Licenses';
import VariableConfig from './components/VariableConfig';
import SeeRoom from './components/SeeRoom';
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";
import './Admin.css'
import SeeSensor from './components/SeeSensor';
import SeeCommunity from './components/SeeCommunity';
import SeeSharedCommunity from './components/SeeSharedCommunity';
import SeeSharedZone from './components/SeeSharedZone';
import SeeSharedRoom from './components/SeeSharedRoom';
import SeeSharedSensor from './components/SeeSharedSensor';

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
            <Route path="/seeCommunity" element={<SeeCommunity/>}/>
            <Route path="/seeSharedCommunity" element={<SeeSharedCommunity/>}/>
            <Route path="/seeZone" element={<SeeZone/>}/>
            <Route path="/seeSharedZone" element={<SeeSharedZone/>}/>
            <Route path="/seeRoom" element={<SeeRoom/>}/>
            <Route path="/seeSharedRoom" element={<SeeSharedRoom/>}/>
            <Route path="/seeSensor" element={<SeeSensor/>}/>
            <Route path="/seeSharedSensor" element={<SeeSharedSensor/>}/>
            <Route path="/userAccount" element={<UserAccount/>} />
            <Route path="/editUser" element={<EditUser/>} />
            <Route path="/signIn" element={<SignIn/>} />
            <Route path="/toHelp" element={<Maintenance/>} />
            <Route path='/*' element={<NotFound/>}></Route>
            <Route path='/AdminMenu' element={<AdminMenu/>}></Route>
            <Route path='/Statistics' element={<Statistics/>}></Route>
            <Route path='/ManageCounts' element={<ManageCounts/>}></Route>
            <Route path='/Licenses' element={<Licences/>}></Route>
            <Route path='/VariableConfig' element={<VariableConfig/>}></Route>
          </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
