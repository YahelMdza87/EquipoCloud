import Agregar from "../assets/add-device.png"
import FlechaAbajo from "../assets/flecha-hacia-abajo.png"
import React, { useState, useEffect } from 'react';


export default function Principal({userData}) {
  const [usuarios, setUsuarios] = useState([]);
  const [numUsuarios, setNumUsuarios] = useState(0);
  const [signals, setSignals] = useState([]);
  
  //Usamos localStorage para obtener el usuario guardado en cookies
  const localStorageUser = JSON.parse(localStorage.getItem('userData'));
  if (localStorageUser){
    userData=localStorageUser;
  }

  useEffect(() => {
    //fetch('http://localhost:3000/usuarios')
    fetch('https://domoticloud.onrender.com/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching usuarios:', error));
  
    //fetch('http://localhost:3000/numusu')
    fetch('https://domoticloud.onrender.com/numusu')
      .then(response => response.json())
      .then(data => setNumUsuarios(data))
      .catch(error => console.error('Error fetching number of users:', error));

      const obtenerSeñales = async () => {
        try {
          const response = await fetch('https://domoticloud.onrender.com/getallsignal', {
          //const response = await fetch('http://localhost:3000/getallsignal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              usu: 'Alan Montes'
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
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.idusuario}>
                  <td>{usuario.idusuario}</td>
                  <td>{usuario.usuario}</td>
                  <td>{usuario.correo}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3">Cantidad de usuarios: {numUsuarios}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
  <h1>Señales</h1>
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
      </div> 
    </div>
  );
}
