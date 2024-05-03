import Agregar from "../assets/add-device.png"
import Logo from "../assets/logo-domoticloud.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import CreateZoneForm from "./CreateZoneForm";

const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutegetSignals = import.meta.env.VITE_SEARCHES_ALLSIGNALS || "http://localhost:3000/searches/allsignals";
const RoutegetZones = import.meta.env.VITE_SEARCHES_ZONAS || "http://localhost:3000/searches/zonas"
export default function Principal({userData}) {
  const navigate = useNavigate();
  const [idUser, setIdUser] = useState(0);
  const [name, setName] = useState("");
  const [signals,setSignals] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [showAddZoneForm, setShowAddZoneForm] = useState(false);
  //Usamos localStorage para obtener el usuario guardado en cookies
  const localStorageUser = JSON.parse(localStorage.getItem('userData'));
  if (localStorageUser){
    userData=localStorageUser;
  }
  function toUserAccount(){
    navigate('/UserAccount')
  }
  function toIndex(){
    navigate('/Principal')
  }
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
      data.forEach(element => {
        setName(element.nombre);
        setIdUser(element.idusuario);
      });
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }, []);
  //Obtener las señales
  useEffect(() => {
      const obtenerSeñales = async () => {
        const id = 30;
              try {
                const response = await  fetch(`${RoutegetSignals}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    idusu: id
                  })
                });
        
                if (!response.ok) {
                  throw new Error('Hubo un problema al obtener las señales.');
                }
        
                // Si la solicitud es exitosa, obtenemos los datos de la respuesta
                const data = await response.json();
                setSignals(data);
              } catch (error) {
                console.error('Error:', error);
                // Manejar el error, por ejemplo, mostrar un mensaje al usuario
              }
            };
        
            // Llamar a la función para obtener las señales cuando el componente se monte
            obtenerSeñales();
      
            const intervalId = setInterval(obtenerSeñales, 2000);
      
            // Limpiar el intervalo cuando el componente se desmonte
            return () => clearInterval(intervalId);
  }, []);
  //Obtener todas las zonas
  useEffect(() => {
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
    setZonas(zonas)
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }, []);
  function addZone() {
    setShowAddZoneForm(true);
  }

  function closeAddZoneModal() {
    console.log('sdas')
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
        <h2 className="hello-user-principal">Hola {name}</h2>
      </div>
      <div className="section-devices-principal">
        <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Zonas</h1>
        <div className="div-add-zone-principal" onClick={addZone}>
          <img className="add-zone-icon-principal" src={Agregar} alt="" />
          <h3 className="add-zone-text-principal">Agregar area</h3>
        </div>
        {zonas.map((zona, index) => (
          <div key={index}>
            <div>
              {zona.nombrezona}
            </div>
          </div>
        ))}
      </div>
      {showAddZoneForm && ( // Muestra el formulario de agregar zona solo si showAddZoneForm es true
        <CreateZoneForm onClose={closeAddZoneModal} />
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