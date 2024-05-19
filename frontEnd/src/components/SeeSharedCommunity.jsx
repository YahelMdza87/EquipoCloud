import Logo from "../assets/logo-domoticloud.png"
import Back from "../assets/to-back.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CuartoCoopIcono from "../assets/cuarto-coop-icono.png"
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutegetZones = import.meta.env.VITE_SEARCHES_ZONAS || "http://localhost:3000/searches/zonas"
const RoutesearchCommunity = import.meta.env.VITE_SEARCHES_COMUNIDAD || "http://localhost:3000/searches/comunidad";
export default function SeeSharedCommunity({selectedSharedCommunity,idOwner,userData}){
    const navigate = useNavigate();
    const localStorageSelectedSharedCommunity = JSON.parse(localStorage.getItem("SharedCommunity"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    const [idRoom, setIdRoom] = useState("");
    const [idCommunity, setIdCommunity] = useState("");
    const [community, setCommunity] = useState([]);
    const [user, setUser] = useState([]);
    const [idZone, setIdZone] = useState("");
    const [zones, setZones] = useState([]);

    if(localStorageSelectedSharedCommunity){
        selectedSharedCommunity = localStorageSelectedSharedCommunity.idSelected;
        idOwner = localStorageSelectedSharedCommunity.idUserOwner;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    if(localStorageWichComponent!=="community"){
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

    useEffect(() => {
          fetch(`${RoutegetZones}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              idusu: idOwner
          })
        })
        .then(response => {
          if (!response.ok) {
              throw new Error('Hubo un problema al realizar la solicitud.');
          }
          return response.json();
        })
        .then(data => {
            console.log(data)
            setZones(data) 
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
    }, []);

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
            idcomunidad: selectedSharedCommunity
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al realizar la solicitud.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
      if(data && data.length>0){
        data.forEach(element => {
            setCommunity(element)
            setIdCommunity(element.id_comunidad)
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
    const toSharedZone = (event) => {
        const selectedId = event.target.closest(".div-add-zone-principal-coop").id;
        setIdZone(selectedId)
    }
      useEffect(() => {
        if (idZone !== "") {
          const selectedZone = idZone;
          localStorage.setItem("idSharedZone", JSON.stringify(selectedZone));
          navigate('/seeSharedZone');
        }
      }, [idZone]);
   
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
            <div style={{alignItems:"center", justifyItems:"center", textAlign:"center"}}> <h1>{community.nombrecomunidad}</h1></div>
            <div className="section-image-zone">
                <img className="image-zone" src="https://media.admagazine.com/photos/62b4b828cce4cfe1db2ed95e/4:3/w_2664,h_1998,c_limit/Dormitorio.jpg" alt="" />
            </div>
            <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Zonas</h1>
            <div className="section-devices-principal">
                { zones.map((zona,index) => (
                    <div id={zona.id_zona} key={index} className="div-add-zone-principal-coop fade-in"  onClick={toSharedZone}>
                        <h3 className="name-divs-generated" style={{gridRow:"1", color:"#00ff2a"}}>{zona.nombrezona}</h3>
                        <img src={CuartoCoopIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}} />
                        <h3 className="name-divs-generated" style={{gridRow:"3", color:"#00ff2a"}}>Compartida</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}