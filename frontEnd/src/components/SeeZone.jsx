import Logo from "../assets/logo-domoticloud.png"
import Agregar from "../assets/add-device.png"
import Basura from "../assets/icono-basura.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import Back from "../assets/to-back.png"
import CuartoIcono from "../assets/cuarto-icono.png"
import CreateRoomForm from "./CreateRoomForm";
import DeleteComponent from "./DeleteComponent";
const RouteGetZone = import.meta.env.VITE_SEARCHES_ZONA || "http://localhost:3000/searches/zona";
const RouteGetRooms = import.meta.env.VITE_SEARCHES_CUARTOS || "http://localhost:3000/searches/cuartos"
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
export default function SeeZone({selectedZone,userData}){
    const navigate = useNavigate();
    const localStorageSelectedZone = JSON.parse(localStorage.getItem("idZona"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    const [idZone, setIdZone] = useState("");
    const [idRoom, setIdRoom] = useState("");
    const [user, setUser] = useState([]);
    const [nameZone, setNameZone] = useState("");
    const [typeZone, setTypeZone] = useState("");
    const [showAddRoomForm, setShowAddRoomForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [rooms, setRooms] = useState([]);
    if(localStorageSelectedZone){
        selectedZone = localStorageSelectedZone;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    if(!localStorageWichComponent==="zone"){
        localStorage.setItem("wichComponent", JSON.stringify("zone"))
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
    const toRoom = (event) => {
        const selectedId = event.target.closest(".div-add-zone-principal").id;
        console.log(selectedId)
        setIdRoom(selectedId)
      }
      useEffect(() => {
        if (idRoom !== "") {
          const selectedZone = idRoom;
          localStorage.setItem("idRoom", JSON.stringify(selectedZone));
          navigate('/seeRoom');
        }
      }, [idRoom]);
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
        fetch(`${RouteGetZone}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idzona: selectedZone
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
            setNameZone(element.nombrezona);
            setTypeZone(element.tipoedificio);
            setIdZone(element.id_zona)
        });
      }
      else{
        alert("Debiste de haber seleccionado una zona");
        navigate('/')
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }, []);
    useEffect(() => {
            fetch(`${RouteGetRooms}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idzona: selectedZone
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
            setRooms(data);
        }
        else{
        }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [showAddRoomForm], [showConfirmDelete]);
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
            <div>
                <img src={Back} alt="" className="to-back-button" onClick={goBack} />
            </div>
            <div style={{alignItems:"center", justifyItems:"center", textAlign:"center"}}><h1>{nameZone}</h1></div>
            <div className="section-image-zone">
                <img className="image-zone" src="https://planner5d.com/blog/content/images/2022/06/sidekix-media-iu4K1XPnNAY-unsplash.jpg" alt="" />
            </div>
            <div style={{borderTop: "solid #4b1e9e13"}}></div>
            <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Cuartos</h1>
            <div className="section-devices-principal">
                <div className="div-add-zone-principal" style={{backgroundColor:"#DDCBFF"}} onClick={addRoom}>
                    <img className="add-zone-icon-principal" src={Agregar} alt="" />
                    <h3 className="add-zone-text-principal">Agregar cuarto</h3>
                </div>
                { rooms.map((room,index) => (
                <div id={room.id_cuarto} key={index} className="div-add-zone-principal"  onClick={toRoom}>
                    <h3 className="name-divs-generated" style={{gridRow:"1"}}>{room.cuarto}</h3>
                    <img src={CuartoIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}}/>
                </div>
                ))}
            </div>
            
            {showAddRoomForm && ( 
                <CreateRoomForm onClose={closeAddRoomModal} id={{idZone}} />
            )}
            {showConfirmDelete && ( 
                <DeleteComponent onClose={closeDelete} id={{idZone}} />
            )}
            <div style={{justifyItems:"center", alignItems:"center", textAlign:"center"}}><img src={Basura} alt="" onClick={toDelete}/></div>
        </div>
    )
}