import Agregar from "../assets/add-device.png"
import Logo from "../assets/logo-domoticloud.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CreateZoneForm from "./CreateZoneForm";
import CuartoIcono from "../assets/cuarto-icono.png"

//Rutas para hacer fetch
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutegetSignals = import.meta.env.VITE_SEARCHES_ALLSIGNALS || "http://localhost:3000/searches/allsignals";
const RoutegetZones = import.meta.env.VITE_SEARCHES_ZONAS || "http://localhost:3000/searches/zonas"
export default function Principal({userData}) {
  const navigate = useNavigate();
  //Estados para manejar los fetch
  const [idUser, setIdUser] = useState(0);
  const [name, setName] = useState("");
  const [idZona, setIdZona] = useState("");
  const [signals,setSignals] = useState([]);
  const [zones, setZones] = useState([]);
  const [showAddZoneForm, setShowAddZoneForm] = useState(false);
  //Usamos localStorage para obtener el correo guardado en cookies
  const localStorageUser = JSON.parse(localStorage.getItem('userData'));
  if (localStorageUser){
    localStorage.setItem("wichComponent", JSON.stringify(""))
    userData=localStorageUser;
  }
  function toUserAccount(){
    navigate('/UserAccount')
  }
  function toIndex(){
    navigate('/Principal')
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
  
  //Obtener los datos del usuario
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
              setName(element.nombre);
              setIdUser(element.idusuario);
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
  /* Get todas las zonas*/
  useEffect(() => {
      console.log(idUser)
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
  }, [idUser], [showAddZoneForm]);

  function addZone() {
    setShowAddZoneForm(true);
  }

  function closeAddZoneModal() {
    setShowAddZoneForm(false);
  }
  return (
    <div className="body-principal">
      <div className="header-principal">
        <h2 className="header-title-principal">Domoticloud</h2>
        <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
        <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
      </div>
      <div className="section-user-principal">
        <h3 className="hello-user-principal">Hola {name}</h3>
      </div>
      <div style={{borderTop: "solid #4b1e9e13"}}></div>
      <h1 className="title-section-principal">Zonas</h1>
      <div className="section-devices-principal"> 
        <div className="div-add-zone-principal" style={{backgroundColor:"#DDCBFF"}} onClick={addZone}>
          <img className="add-zone-icon-principal" src={Agregar} alt="" />
          <h3 className="add-zone-text-principal">Agregar zona</h3>
        </div>
        { zones.map((zona,index) => (
          <div id={zona.id_zona} key={index} className="div-add-zone-principal"  onClick={toZone}>
            <h3 className="name-divs-generated" style={{gridRow:"1"}}>{zona.nombrezona}</h3>
            <img src={CuartoIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}} />
          </div>
        ))}
      </div>
      {showAddZoneForm && ( 
        <CreateZoneForm onClose={closeAddZoneModal} id={{idUser}} />
      )}
    </div>
  );
}

{/* <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Zona</th>
                <th>Cuarto</th>
                <th>Sensor</th>
                <th>Señal</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((signal, index) => (
                <tr key={index}>
                  <td>{signal.nombrezona}</td>
                  <td>{signal.cuarto}</td>
                  <td>{signal.nombresensor}</td>
                  <td>{signal.señal}</td>
                  <td>{signal.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>  */}