import Logo from "../assets/logo-domoticloud.png"
import Agregar from "../assets/add-device.png"
import Basura from "../assets/icono-basura.png"
import Back from "../assets/to-back.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CuartoCoopIcono from "../assets/cuarto-coop-icono.png"
import CreateRoomForm from "./CreateRoomForm";
import DeleteComponent from "./DeleteComponent";
const RouteGetRoom = import.meta.env.VITE_SEARCHES_CUARTO || "http://localhost:3000/searches/cuarto";
const RouteGetRooms = import.meta.env.VITE_SEARCHES_CUARTOS || "http://localhost:3000/searches/cuartos";
const RouteGetAllSensors = import.meta.env.VITE_SEARCHES_SENSORS || "http://localhost:3000/searches/sensors";
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
export default function SeeSharedRoom({selectedSharedRoom,userData}){
    const navigate = useNavigate();
    const localStorageSelectedSharedRoom = JSON.parse(localStorage.getItem("idSharedRoom"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    const [idRoom, setIdRoom] = useState("");
    const [idSharedDevice, setIdSharedDevice] = useState("");
    const [nameRoom, setNameRoom] = useState("");
    const [user, setUser] = useState([]);
    const [numDevices, setNumDevices] = useState("");
    const [allDevices, setAllDevices] = useState([]);
    const [showAddRoomForm, setShowAddRoomForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    if(localStorageSelectedSharedRoom){
        selectedSharedRoom = localStorageSelectedSharedRoom;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    if(localStorageWichComponent!=="room"){
        localStorage.setItem("wichComponent", JSON.stringify("room"))
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
    const toSharedSensor = (event) => {
        const selectedId = event.target.closest(".div-add-zone-principal-coop").id;
        console.log(selectedId)
        setIdSharedDevice(selectedId)
      }
      useEffect(() => {
        if (idSharedDevice !== "") {
          const selectedDevice = idSharedDevice;
          localStorage.setItem("idSharedDevice", JSON.stringify(selectedDevice));
          navigate('/seeSharedSensor');
        }
      }, [idSharedDevice]);
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
        // console.log(data)
        // alert("Debes de iniciar sesión");
        // navigate('/')
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }, []);

    //Obtener todos los cuartos
    useEffect(() => {
        fetch(`${RouteGetRoom}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idcuarto: selectedSharedRoom
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
            console.log('hola')
            setIdRoom(element.id_cuarto)
            setNameRoom(element.cuarto);
            setNumDevices(element.numerosensoresactivos);
        });
      }
      else{
        // alert("Debiste de haber seleccionado una zona");
        // navigate('/')
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }, []);

    //Obtener todos los sensores
    useEffect(() => {
        if(numDevices>0){
            fetch(`${RouteGetAllSensors}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idcuarto: selectedSharedRoom
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
                    setAllDevices(data)
              }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    }, [numDevices]);


    return(
        <div className="body-principal">
            <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
            </div>
            <div>
                <img src={Back} alt="" className="to-back-button" onClick={goBack} />
            </div>
            <div style={{alignItems:"center", justifyItems:"center", textAlign:"center"}}><h1>{nameRoom}</h1></div>
            <div className="section-image-zone">
                <img className="image-zone" src="https://media.admagazine.com/photos/62b4b828cce4cfe1db2ed95e/4:3/w_2664,h_1998,c_limit/Dormitorio.jpg" alt="" />
            </div>
            <div style={{borderTop: "solid #4b1e9e13"}}></div>
            <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Dispositivos</h1>
            <div className="section-devices-principal">
                { allDevices.map((sensor,index) => (
                <div id={sensor.id_sensor} key={index} className="div-add-zone-principal-coop"  onClick={toSharedSensor}>
                    <h3 className="name-divs-generated" style={{gridRow:"1", color:"#00ff2a"}}>{sensor.nombresensor}</h3>
                    <img src={CuartoCoopIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}} />
                    <h3 className="name-divs-generated" style={{gridRow:"3", color:"#00ff2a"}}>Compartido</h3>
                </div>
                ))}
             </div>
        </div>
    )
}