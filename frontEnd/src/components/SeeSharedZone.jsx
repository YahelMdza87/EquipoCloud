import Logo from "../assets/logo-domoticloud.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import Back from "../assets/to-back.png"
import CuartoCoopIcono from "../assets/cuarto-coop-icono.png"
import Loading from './Loading';
const RouteGetZone = import.meta.env.VITE_SEARCHES_ZONA || import.meta.env.VITE_SEARCHES_ZONA_LH;
const RouteGetRooms = import.meta.env.VITE_SEARCHES_CUARTOS || import.meta.env.VITE_SEARCHES_CUARTOS_LH;
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || import.meta.env.VITE_SEARCHES_IDUSU_LH;
export default function SeeSharedZone({selectedSharedZone,userData}){
    const navigate = useNavigate();
    const localStorageSelectedSharedZone = JSON.parse(localStorage.getItem("idSharedZone"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    const [idZone, setIdZone] = useState("");
    const [idRoom, setIdRoom] = useState("");
    const [user, setUser] = useState([]);
    const [nameZone, setNameZone] = useState("");
    const [typeZone, setTypeZone] = useState("");
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    if(localStorageSelectedSharedZone){
        selectedSharedZone = localStorageSelectedSharedZone;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    if(localStorageWichComponent!=="zone"){
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
    const toSharedRoom = (event) => {
        const selectedId = event.target.closest(".div-add-zone-principal-coop").id;
        setIdRoom(selectedId)
      }
      useEffect(() => {
        if (idRoom !== "") {
          const selectedSharedRoom = idRoom;
          localStorage.setItem("idSharedRoom", JSON.stringify(selectedSharedRoom));
          navigate('/seeSharedRoom');
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
            idzona: selectedSharedZone
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
            setNameZone(element.nombrezona);
            setTypeZone(element.tipoedificio);
            setIdZone(element.id_zona)
        });
      }
      else{

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
                idzona: selectedSharedZone
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
                setRooms(data);
            }
            else{
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    return(
        <div className="body-principal">
            {loading ? <Loading /> : (
                <>
                    <div>
                        <img src={Back} alt="" className="to-back-button" onClick={goBack} />
                    </div>
                    <div style={{textAlign:"center"}}><h1 className="title-name-component">{nameZone}</h1></div>
                    <div className="section-image-zone">
                        <img className="image-zone" src="https://planner5d.com/blog/content/images/2022/06/sidekix-media-iu4K1XPnNAY-unsplash.jpg" alt="" />
                    </div>
                    <div style={{borderTop: "solid #4b1e9e13"}}></div>
                    <h1 className="title-section-principal">Cuartos</h1>
                    <div className="section-devices-principal">
                        { rooms.map((room,index) => (
                        <div id={room.id_cuarto} key={index} className="div-add-zone-principal-coop fade-in"  onClick={toSharedRoom}>
                            <h3 className="name-divs-generated" style={{gridRow:"1", color:"#00ff2a"}}>{room.cuarto}</h3>
                            <img src={CuartoCoopIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}}/>
                            <h3 className="name-divs-generated" style={{gridRow:"3", color:"#00ff2a"}}>Compartido</h3>
                        </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}