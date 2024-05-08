import Agregar from "../assets/add-device.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
import Back from "../assets/to-back.png"
import CuartoIcono from "../assets/cuarto-icono.png"
import CommunityIcon from "../assets/comunidad-icono.png"
import CloseSesion from "./CloseSesion";
import CreateCommunity from "./CreateCommunity";
const RoutegetCommunitys = import.meta.env.VITE_SEARCHES_ADMINCOMUNIDAD || "http://localhost:3000/searches/admincomunidad";
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutegetZones = import.meta.env.VITE_SEARCHES_ZONAS || "http://localhost:3000/searches/zonas"
export default function Principal({userData}) {
  const [idUser, setIdUser] = useState("");
  const [name, setName] = useState("");
  const [workstation, setWorkstation] = useState("");
  const [zones, setZones] = useState([]);
  const [communitys, setCommunitys] = useState([]);
  const [idCommunity, setIdCommunity] = useState("");
  const [idZona, setIdZona] = useState("");
  const [showCloseSesion, setShowCloseSesion] = useState(false);
  const [showAddCommunityForm, setShowAddCommunityForm] = useState(false);
  const navigate = useNavigate();
  
  //Usamos localStorage para obtener el usuario guardado en cookies
  const localStorageUser = JSON.parse(localStorage.getItem('userData'));
  if (localStorageUser){
    userData=localStorageUser;
  }
  function goBack(){
    window.history.back();
}
  const toZone = (event) => {
    const selectedId = event.target.closest(".div-add-zone-principal").id;
    setIdZona(selectedId)
  }
  useEffect(() => {
    if (idZona !== "") {
      const selectedZone = idZona;
      localStorage.setItem("idZona", JSON.stringify(selectedZone));
      navigate('/seeZone');
    }
  }, [idZona]);

  function toUserAccount(){
    navigate('/UserAccount')
  }
  function toIndex(){
    navigate('/Principal')
  }
  function toEditAccount (){
    navigate('/EditUser')
  }
  function toHelp() {
    navigate('/toHelp')
  }
  function toCreateComunity(){
    setShowAddCommunityForm(true);
  }
  function closeAddCommunityModal(){
    setShowAddCommunityForm(false);
  }

  useEffect(() => {
    if(idUser){
      fetch(`${RoutegetCommunitys}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          idadminusu: idUser
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
      setCommunitys(data) 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  }, [idUser], [showAddCommunityForm]);

  useEffect(() => {
    if(idUser){
      fetch(`${RoutegetZones}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          idusu: idUser
      })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Hubo un problema al realizar la solicitud.');
      }
      return response.json();
    })
    .then(data => {
      setZones(data) 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  }, [idUser]);

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
          console.log(element)
          setIdUser(element.idusuario)
          setName(element.nombre);
          setWorkstation(element.cargo);
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

const toCommunity = (event) => {
  const selectedId = event.target.closest(".div-add-zone-principal").id;
  console.log(selectedId)
  setIdCommunity(selectedId)
}
useEffect(() => {
  if (idCommunity !== "") {
    const selectedCommunity = idZona;
    localStorage.setItem("idCommunity", JSON.stringify(selectedCommunity));
    navigate('/seeCommunity');
  }
}, [idCommunity]);


function toDelete(){
  setShowCloseSesion(true);
}
function closeDelete(){
  setShowCloseSesion(false);
}
  return (
    <div className="body-principal">
      <div className="header-principal">
        <h2 className="header-title-principal">Domoticloud</h2>
        <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
        <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
      </div>
      <div className="section-data-useraccount">
        <img src={User} alt="" className="user-image-userAccount" />
        <h2 className="name-user-userAccount" >{name}</h2>
        <h2 className="name-role-userAccount">{workstation}</h2>
        <div className="btn-edit-data-user" onClick={toEditAccount}>Editar</div>
      </div>
      <h1>Comunidades</h1>
      <div className="section-devices-principal">
        <div className="div-add-zone-principal" style={{backgroundColor:"#DDCBFF"}} onClick={toCreateComunity}>
          <img className="add-zone-icon-principal" src={Agregar} style={{width:"30%"}} alt="" />
          <h3 className="add-zone-text-principal">Agregar comunidad</h3>
        </div>
        { communitys.map((community,index) => (
                <div id={community.id_comunidad} key={index} className="div-add-zone-principal"  onClick={toCommunity}>
                    <h3 style={{fontSize:"2.8vw", color:"#DDCBFF", gridRow:"1", whiteSpace:"nowrap", overflow:"hidden",textOverflow:"ellipsis"}}>{community.nombrecomunidad}</h3>
                    <img src={CommunityIcon} alt="" style={{gridRow:"2"}} />
                </div>
                ))}
      </div>
      <h1>Dispositivos agregados</h1>
      <div className="section-devices-principal">
        <div className="div-add-zone-principal" style={{backgroundColor:"#DDCBFF"}}>
          <img className="add-zone-icon-principal" src={Agregar} style={{width:"30%"}} alt="" />
          <h3 className="add-zone-text-principal">Agregar dispositivo</h3>
        </div>
      </div>
      <h1>Zonas</h1>
      <div className="section-devices-principal">
        {/* <div className="div-add-zone-principal" style={{backgroundColor:"#DDCBFF"}}>
          <img className="add-zone-icon-principal" src={Agregar} style={{width:"30%"}} alt=""/>
          <h3 className="add-zone-text-principal">Agregar zona</h3>
        </div> */}
        { zones.map((zona,index) => (
          <div id={zona.id_zona} key={index} className="div-add-zone-principal"  onClick={toZone}>
            <h3 style={{fontSize:"2.8vw", color:"#DDCBFF", gridRow:"1", whiteSpace:"nowrap", overflow:"hidden",textOverflow:"ellipsis"}}>{zona.nombrezona}</h3>
            <img src={CuartoIcono} alt="" style={{gridRow:"2"}} />
          </div>
        ))}
      </div>
      <div>
        <div style={{borderBottom:"solid #4b1e9e8c", padding:"3%"}} onClick={toHelp}>
          <h2>Ayuda</h2>
        </div>
        <div style={{borderBottom:"solid #4b1e9e8c", padding:"3%"}} onClick={toHelp}>
          <h2>Acerca de</h2>
        </div>
        <div style={{padding:"3%", paddingBottom:"0%"}} onClick={toDelete}>
          <h2>Cerrar sesión</h2>
        </div>
      </div>
      {showAddCommunityForm && ( 
                <CreateCommunity onClose={closeAddCommunityModal} id={{idUser}} />
            )}
      {showCloseSesion && ( 
               <CloseSesion onClose={closeDelete}/>
            )}
    </div>
  );
}
