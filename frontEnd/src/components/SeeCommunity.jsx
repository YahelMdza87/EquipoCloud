import Logo from "../assets/logo-domoticloud.png"
import Agregar from "../assets/add-device.png"
import Basura from "../assets/icono-basura.png"
import Back from "../assets/to-back.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CuartoIcono from "../assets/cuarto-icono.png"
import CreateRoomForm from "./CreateRoomForm";
import DeleteComponent from "./DeleteComponent";
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutesearchCommunity = import.meta.env.VITE_SEARCHES_COMUNIDAD || "http://localhost:3000/searches/comunidad";
export default function SeeCommunity({selectedCommunity,userData}){
    const navigate = useNavigate();
    const localStorageSelectedCommunity = JSON.parse(localStorage.getItem("idRoom"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    const [idRoom, setIdRoom] = useState("");
    const [idDevice, setIdDevice] = useState("");
    const [nameRoom, setNameRoom] = useState("");
    const [user, setUser] = useState([]);
    const [numDevices, setNumDevices] = useState("");
    const [allDevices, setAllDevices] = useState([]);
    const [showAddRoomForm, setShowAddRoomForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    if(localStorageSelectedCommunity){
        selectedCommunity = localStorageSelectedCommunity;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    if(!localStorageWichComponent==="community"){
        localStorage.setItem("wichComponent", JSON.stringify("community"))
    }
    function toUserAccount(){
        navigate('/UserAccount')
    }
    function goBack(){
        window.history.back();
    }
    function toIndex(){
    navigate('/Principal')
    }
    //Obtener datos de usuario
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

    useEffect(() => {
        fetch(`${RoutesearchCommunity}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idcomunidad: selectedCommunity
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
        console.log(idRoom)
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
            <div>
                <img src={Back} alt="" style={{width:"9%",borderBottom:"1px solid #ba98ff69",borderRight:"1px solid #ba98ff69"}} onClick={goBack} />
            </div>
            <div style={{alignItems:"center", justifyItems:"center", textAlign:"center"}}><h1>hola</h1></div>
            <div className="section-image-zone">
                <img style={{objectFit:"cover", width:"100%", borderRadius:"20px"}} src="https://media.admagazine.com/photos/62b4b828cce4cfe1db2ed95e/4:3/w_2664,h_1998,c_limit/Dormitorio.jpg" alt="" />
            </div>
            <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Colaboradores</h1>
            <div className="section-devices-principal">
                <div className="div-add-zone-principal" style={{backgroundColor:"#DDCBFF"}}>
                    <img className="add-zone-icon-principal" src={Agregar} alt="" />
                    <h3 className="add-zone-text-principal">Agregar colaborador</h3>
                </div>
             </div>
            {showConfirmDelete && ( 
                <DeleteComponent onClose={closeDelete} id={{idRoom}} wich={{localStorageWichComponent}}/>
            )}
            {/* <div style={{justifyItems:"center", alignItems:"center", textAlign:"center"}}><img src={Basura} alt="" onClick={toDelete}/></div> */}
        </div>
    )
}