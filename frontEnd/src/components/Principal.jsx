import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png";
import CreateZoneForm from "./CreateZoneForm";
import Agregar from "../assets/add-device.png";
import Logo from "../assets/logo-domoticloud.png";
import CuartoIcono from "../assets/cuarto-icono.png";
import Loading from './Loading';

const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || import.meta.env.VITE_SEARCHES_IDUSU_LH;
const RoutegetZones = import.meta.env.VITE_SEARCHES_ZONAS || import.meta.env.VITE_SEARCHES_ZONAS_LH;

export default function Principal({ userData }) {
  const navigate = useNavigate();
  const [idUser, setIdUser] = useState(0);
  const [name, setName] = useState("");
  const [idZona, setIdZona] = useState("");
  const [zones, setZones] = useState([]);
  const [showAddZoneForm, setShowAddZoneForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const localStorageUser = JSON.parse(localStorage.getItem('userData'));
  if (localStorageUser) {
    localStorage.setItem("wichComponent", JSON.stringify(""))
    userData = localStorageUser;
  }

  function toUserAccount() {
    navigate('/UserAccount');
  }

  function toIndex() {
    navigate('/Principal');
  }

  const toZone = (event) => {
    const selectedId = event.target.closest(".div-add-zone-principal").id;
    setIdZona(selectedId);
  }

  useEffect(() => {
    if (idZona !== "") {
      const selectedZone = idZona;
      localStorage.setItem("idZona", JSON.stringify(selectedZone));
      navigate('/seeZone');
    }
  }, [idZona]);

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
        if (data && data.length > 0) {
          data.forEach(element => {
            setName(element.nombre);
            setIdUser(element.idusuario);
          });
        } else {
          alert("Debes de iniciar sesión");
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (idUser) {
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
          setZones(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [idUser, showAddZoneForm]);

  function addZone() {
    setShowAddZoneForm(true);
  }

  function closeAddZoneModal() {
    setShowAddZoneForm(false);
  }

  return (
    <div className="body-principal">
      {loading ? <Loading /> : (
        <>
          <div className="section-user-principal fade-in">
            <h3 className="hello-user-principal">Hola {name}</h3>
          </div>
          <div style={{ borderTop: "solid #4b1e9e13" }}></div>
          <h1 className="title-section-principal">Zonas</h1>
          <div className="section-devices-principal"> 
            <div className="div-add-zone-principal div-only-agregar" onClick={addZone}>
              <img className="add-zone-icon-principal" src={Agregar} alt="" />
              <h3 className="add-zone-text-principal">Agregar zona</h3>
            </div>
            {zones.map((zona, index) => (
              <div id={zona.id_zona} key={index} className="div-add-zone-principal fade-in" onClick={toZone}>
                <h3 className="name-divs-generated" style={{ gridRow: "1" }}>{zona.nombrezona}</h3>
                <img src={CuartoIcono} alt="" className="img-divs-generated" style={{ gridRow: "2" }} />
              </div>
            ))}
          </div>
          {showAddZoneForm && (
            <CreateZoneForm onClose={closeAddZoneModal} id={{ idUser }} />
          )}
        </>
      )}
    </div>
  );
}
