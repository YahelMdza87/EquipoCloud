import Logo from "../assets/logo-domoticloud.png"
import Agregar from "../assets/add-device.png"
import Basura from "../assets/icono-basura.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CuartoIcono from "../assets/cuarto-icono.png"
import CreateRoomForm from "./CreateRoomForm";
import DeleteComponent from "./DeleteComponent";
const RouteGetZone = import.meta.env.VITE_SEARCHES_ZONA || "http://localhost:3000/searches/zona";
const RouteGetRooms = import.meta.env.VITE_SEARCHES_CUARTOS || "http://localhost:3000/searches/cuartos"
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
export default function SeeRoom({selectedRoom,userData}){
    const navigate = useNavigate();
    const localStorageSelectedRoom = JSON.parse(localStorage.getItem("idRoom"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const [idRoom, setIdRoom] = useState("");
    const [user, setUser] = useState([]);
    const [nameZone, setNameZone] = useState("");
    const [showAddRoomForm, setShowAddRoomForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [rooms, setRooms] = useState([]);
    if(localStorageSelectedRoom){
        selectedRoom = localStorageSelectedRoom;
        console.log(selectedRoom)
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    function toUserAccount(){
        navigate('/UserAccount')
    }
    function toIndex(){
    navigate('/Principal')
    }
    useEffect(() => {
        fetch(`${RoutesearchUser}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: userData
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al realizar la solicitud.');
        }
        return response.json();
    })
    .then(data => {
      if(data && data.length>0){
        data.forEach(element => {
            setUser(element)
        });
      }
      else{
        console.log(data)
        alert("Debes de iniciar sesión");
        navigate('/')
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }, []);
    function addRoom() {
        setShowAddRoomForm(true);
    }
  
    function toDelete(){
        setShowConfirmDelete(true);
    }
    function closeDelete(){
        setShowConfirmDelete(false);
    }

    function closeAddRoomModal() {
        setShowAddRoomForm(false);
    }

    return(
        <div className="body-principal">
            <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
            </div>
            <div style={{alignItems:"center", justifyItems:"center", textAlign:"center"}}><h1>{nameZone}</h1></div>
            <div className="section-image-zone">
                <img style={{objectFit:"cover", width:"100%", borderRadius:"20px"}} src="https://planner5d.com/blog/content/images/2022/06/sidekix-media-iu4K1XPnNAY-unsplash.jpg" alt="" />
            </div>
            <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Dispositivos</h1>
            <div className="section-devices-principal">
                <div className="add-zone-userAccount" style={{backgroundColor:"#DDCBFF"}}>
                    <img className="add-zone-icon-principal" src={Agregar} alt="" />
                    <h3 className="add-zone-text-principal">Agregar device</h3>
                </div>
             </div>
            {showConfirmDelete && ( 
                <DeleteComponent onClose={closeDelete} id={{idZone}} />
            )}
            <div style={{justifyItems:"center", alignItems:"center", textAlign:"center"}}><img src={Basura} alt="" onClick={toDelete}/></div>
        </div>
    )
}