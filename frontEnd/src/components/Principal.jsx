import Agregar from "../assets/add-device.png"
import FlechaAbajo from "../assets/flecha-hacia-abajo.png"
import React, { useState, useEffect } from 'react';


export default function Principal({userData}) {
  const [usuarios, setUsuarios] = useState([]);
  const [numUsuarios, setNumUsuarios] = useState(0);

  useEffect(() => {
    fetch('https://domoticloud.onrender.com/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching usuarios:', error));
  
    fetch('https://domoticloud.onrender.com/numusu')
      .then(response => response.json())
      .then(data => setNumUsuarios(data))
      .catch(error => console.error('Error fetching number of users:', error));
  }, []);


  return (
    <div className="body-principal">
      <div className="header-principal">
        <h2 className="header-title-principal">Domoticloud</h2>
        <img src={userData.image} alt="" className="user-image-principal"/>
        <img src={Agregar} alt="" className="add-icon-principal"/>
      </div>
      <div className="section-user-principal">
        <h2 className="hello-user-principal" >Hola {userData.name}</h2>
      </div>
      <div className="section-devices-principal">
        <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Zonas</h1>
        <div className="div-add-zone-principal">
          <img className="add-zone-icon-principal" src={Agregar} alt="" />
          <h3 className="add-zone-text-principal">Agregar area</h3>
        </div>
        <div style={{display:"flex", justifyContent:"center" }}>
          <button className="see-users-principal">Modo admin</button>
        </div>
        <div>
          <h1>Usuarios</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.idusuario}>
                  <td>{usuario.idusuario}</td>
                  <td>{usuario.usuario}</td>
                  <td>{usuario.correo}</td>
                  {/* Add more cells if needed */}
                </tr>
              ))}
              <tr>
                <td colSpan="3">Cantidad de usuarios: {numUsuarios}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> 
    </div>
  );
}
