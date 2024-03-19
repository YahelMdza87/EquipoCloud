import Agregar from "../assets/add-device.png"
import React, { useState, useEffect } from 'react';

export default function Principal({userData}) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://domoticloud.onrender.com/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching usuarios:', error));
  }, []);


  return (
    <div className="body-principal">
      <div className="header-principal">
        <img src={userData.image} alt="" style={{borderRadius:"60px", gridColumn:"3", width:"45%", justifySelf:"right", margin:"3%"}}/>
        <img src={Agregar} alt="" style={{gridColumn:"1", gridRow:"1", width:"45%", justifySelf:"left", margin:"3%"}}/>
      </div>
      <div className="section-user-principal">
        <h2 style={{ fontSize: "4.5vw", textAlign:"center" }} >Hola {userData.name}</h2>
      </div>
      <div className="section-devices-principal">
        <h1 style={{marginLeft:"3%", marginTop:"1%"}}>Zonas</h1>
        <div style={{display:"flex", justifyContent:"center" }}>
          <button className="see-users-principal">Ver usuarios</button>
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
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  {/* Add more cells if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> 
    </div>
  );
}
