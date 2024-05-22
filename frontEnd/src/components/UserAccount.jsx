import Agregar from "../assets/add-device.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
import Back from "../assets/to-back.png"
import CuartoIcono from "../assets/cuarto-icono.png"
import CommunityIcon from "../assets/comunidad-icono.png"
import CommunityCoopIcon from "../assets/comunidad-coop-icono.png"
import CloseSesion from "./CloseSesion";
import Loading from "./Loading";
import CreateCommunity from "./CreateCommunity";
const RoutegetCommunitys = import.meta.env.VITE_SEARCHES_ADMINCOMUNIDAD || "http://localhost:3000/searches/admincomunidad";
const RoutegetSharedCommunitys = import.meta.env.VITE_SEARCHES_COLABENCOMUNIDAD || "http://localhost:3000/searches/colabencomunidad";
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutegetZones = import.meta.env.VITE_SEARCHES_ZONAS || "http://localhost:3000/searches/zonas"
export default function Principal({userData}) {
  const [loading, setLoading] = useState(true);
  const [idUser, setIdUser] = useState("");
  const [idOwner, setIdOwner] = useState("");
  const [name, setName] = useState("");
  const [workstation, setWorkstation] = useState("");
  const [zones, setZones] = useState([]);
  const [communitys, setCommunitys] = useState([]);
  const [sharedCommunitys, setSharedCommunitys] = useState([]);
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
      setCommunitys(data) 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  }, [idUser], [showAddCommunityForm]);
  
  useEffect(() => {
    if(idUser){
      fetch(`${RoutegetSharedCommunitys}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          idcolabcomunidad: idUser
      })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Hubo un problema al realizar la solicitud.');
      }
      return response.json();
    })
    .then(data => {
      setSharedCommunitys(data);
      setLoading(false);
      data.forEach(element => {
        setIdOwner(element.idusuario);
      });
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
  const wichCommunity = {
    idSelected : selectedId,
    type : "own"
  }
  setIdCommunity(wichCommunity)
}
const toSharedCommunity = (event) => {
  const selectedId = event.target.closest(".div-add-zone-principal-coop").id;
  const wichCommunity = {
    idSelected : selectedId,
    idUserOwner : idOwner,
    type : "shared"
  }
  setIdCommunity(wichCommunity)
}
useEffect(() => {
  if (idCommunity !== "") {
    const selectedCommunity = idCommunity.idSelected;
    if(idCommunity.type==="own"){
      localStorage.setItem("idCommunity", JSON.stringify(selectedCommunity));
      navigate('/seeCommunity');
    }
    else{
      localStorage.setItem("SharedCommunity", JSON.stringify(idCommunity));
      navigate('/seeSharedCommunity');
    }
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
      {loading ? <Loading /> : (
        <>
          <div className="section-data-useraccount">
            <img src={User} alt="" className="user-image-userAccount"/>
            <h3 className="name-user-userAccount" >{name}</h3>
            <h2 className="name-role-userAccount">{workstation}</h2>
            <div className="btn-edit-data-user" onClick={toEditAccount}>Editar</div>
          </div>
          <div style={{borderTop: "solid #4b1e9e13"}}></div>
          <h1>Comunidades</h1>
          <div className="section-devices-principal">
            <div className="div-add-zone-principal div-only-agregar" onClick={toCreateComunity}>
              <img className="add-zone-icon-principal" src={Agregar} alt="" />
              <h3 className="add-zone-text-principal">Agregar comunidad</h3>
            </div>
            { communitys.map((community,index) => (
                    <div id={community.id_comunidad} key={index} className="div-add-zone-principal fade-in"  onClick={toCommunity}>
                        <h3 className="name-divs-generated" style={{gridRow:"1"}}>{community.nombrecomunidad}</h3>
                        <img src={CommunityIcon} alt="" className="img-divs-generated" style={{gridRow:"2"}} />
                        <h3 className="name-divs-generated" style={{gridRow:"3"}}>Propietario</h3>
                    </div>
                    ))}
            { sharedCommunitys.map((sharedCommunity,index) => (
                    <div id={sharedCommunity.id_comunidad} key={index} className="div-add-zone-principal-coop fade-in" onClick={toSharedCommunity}>
                        <h3 className="name-divs-generated" style={{gridRow:"1", color:"#00ff2a"}}>{sharedCommunity.nombrecomunidad}</h3>
                        <img src={CommunityCoopIcon} alt="" className="img-divs-generated" style={{gridRow:"2"}} />
                        <h3 className="name-divs-generated" style={{gridRow:"3", color:"#00ff2a"}}>Compartida</h3>
                    </div>
                    ))}
          </div>
          <div style={{borderTop: "solid #4b1e9e13"}}></div>
          <h1>Zonas</h1>
          <div className="section-devices-principal">
            { zones.map((zona,index) => (
              <div id={zona.id_zona} key={index} className="div-add-zone-principal fade-in"  onClick={toZone}>
                <h3 className="name-divs-generated" style={{gridRow:"1"}}>{zona.nombrezona}</h3>
                <img src={CuartoIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:"4%"}}>
            <div className="div-more-userAccount" onClick={toHelp}>
              <h2>Ayuda</h2>
            </div>
            <div className="div-more-userAccount" onClick={toHelp}>
              <h2>Acerca de</h2>
            </div>
            <div className="div-more-userAccount" onClick={toDelete}>
              <h2>Cerrar sesión</h2>
            </div>
          </div>
          {showAddCommunityForm && ( 
                    <CreateCommunity onClose={closeAddCommunityModal} id={{idUser}} />
          )}
          {showCloseSesion && ( 
                  <CloseSesion onClose={closeDelete}/>
          )}
      
        </>
      )}
    </div>
  );
}
