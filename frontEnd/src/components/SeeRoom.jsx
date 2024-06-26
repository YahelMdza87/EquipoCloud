import Logo from "../assets/logo-domoticloud.png"
import Agregar from "../assets/add-device.png"
import Basura from "../assets/icono-basura.png"
import Back from "../assets/to-back.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CuartoIcono from "../assets/cuarto-icono.png"
import CreateRoomForm from "./CreateRoomForm";
import Loading from './Loading';
import DeleteComponent from "./DeleteComponent";
const RouteGetRoom = import.meta.env.VITE_SEARCHES_CUARTO || import.meta.env.VITE_SEARCHES_CUARTO_LH;
const RouteGetAllSensors = import.meta.env.VITE_SEARCHES_SENSORS || import.meta.env.VITE_SEARCHES_SENSORS_LH;
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || import.meta.env.VITE_SEARCHES_IDUSU_LH;
export default function SeeRoom({selectedRoom,userData}){
    const navigate = useNavigate();
    const localStorageSelectedRoom = JSON.parse(localStorage.getItem("idRoom"));
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
    const [loading, setLoading] = useState(true);
    if(localStorageSelectedRoom){
        selectedRoom = localStorageSelectedRoom;
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
    const toSensor = (event) => {
        const selectedId = event.target.closest(".div-add-zone-principal").id;
        setIdDevice(selectedId)
      }
      useEffect(() => {
        if (idDevice !== "") {
          const selectedZone = idDevice;
          localStorage.setItem("idDevice", JSON.stringify(selectedZone));
          navigate('/seeSensor');
        }
      }, [idDevice]);
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
        alert("Debes de iniciar sesión");
        navigate('/')
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
            idcuarto: selectedRoom
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al realizar la solicitud.');
        }
        return response.json();
    })
    .then(data => {
        setLoading(false);
        if(data && data.length>0){
            data.forEach(element => {
                setIdRoom(element.id_cuarto);
                setNameRoom(element.cuarto);
                setNumDevices(element.numerosensoresactivos);
            });
        }
        else{
            if(selectedRoom!==""){
                navigate('/principal');
            }
            else {
                alert("Debiste de haber seleccionado un cuarto");
                navigate('/');
            }
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
                idcuarto: selectedRoom
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
            {loading ? <Loading /> : (
                <>
                    <div>
                        <img src={Back} alt="" className="to-back-button" onClick={goBack} />
                    </div>
                    <div style={{textAlign:"center"}}><h1 className="title-name-component">{nameRoom}</h1></div>
                    <div className="section-image-zone">
                        <img className="image-zone" src="https://media.admagazine.com/photos/62b4b828cce4cfe1db2ed95e/4:3/w_2664,h_1998,c_limit/Dormitorio.jpg" alt="" />
                    </div>
                    <div style={{borderTop: "solid #4b1e9e13"}}></div>
                    <h1 className="title-section-principal">Dispositivos</h1>
                    <div className="section-devices-principal">
                        <div className="div-add-zone-principal div-only-agregar">
                            <img className="add-zone-icon-principal" src={Agregar} alt="" />
                            <h3 className="add-zone-text-principal">Agregar device</h3>
                        </div>
                        { allDevices.map((sensor,index) => (
                        <div id={sensor.id_sensor} key={index} className="div-add-zone-principal fade-in"  onClick={toSensor}>
                            <h3 className="name-divs-generated" style={{gridRow:"1"}}>{sensor.nombresensor}</h3>
                            <img src={CuartoIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}} />
                        </div>
                        ))}
                    </div>
                    {showConfirmDelete && ( 
                        <DeleteComponent onClose={closeDelete} id={{idRoom}} wich={{localStorageWichComponent}}/>
                    )}
                    <div style={{justifyItems:"center", alignItems:"center", textAlign:"center"}}><img src={Basura} alt="" onClick={toDelete}/></div>
                </>
            )}
        </div>
    )
}