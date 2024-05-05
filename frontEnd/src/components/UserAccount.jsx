import Agregar from "../assets/add-device.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";

export default function Principal({userData}) {
  // const [usuarios, setUsuarios] = useState([]);
  // const [numUsuarios, setNumUsuarios] = useState(0);
  // const [signals, setSignals] = useState([]);
  const [name, setName] = useState("");
  const [workstation, setWorkstation] = useState("");

  const navigate = useNavigate();
  
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
  function toEditAccount (){
    navigate('/EditUser')
  }
  function toHelp() {
    navigate('/toHelp')
  }
  function signOut() {
    localStorage.removeItem("userData")
    navigate('/')
  }
  
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
      <div className="section-devices-userAccount">
        <h1>Colaboradores</h1>
        <div className="add-zone-userAccount">
          <img className="add-zone-icon-userAccount" src={Agregar} style={{width:"30%"}} alt="" />
          <h3 className="add-zone-text-userAccount">Agregar colaborador</h3>
        </div>
      </div>
      <div className="section-devices-userAccount">
        <h1>Dispositivos agregados</h1>
        <div className="add-zone-userAccount">
          <img className="add-zone-icon-userAccount" src={Agregar} style={{width:"30%"}} alt="" />
          <h3 className="add-zone-text-userAccount">Agregar dispositivo</h3>
        </div>
      </div>
      <div className="section-devices-userAccount">
        <h1>Zonas</h1>
        <div className="add-zone-userAccount">
          <img className="add-zone-icon-userAccount" src={Agregar} style={{width:"30%"}} alt=""/>
          <h3 className="add-zone-text-userAccount">Agregar zona</h3>
        </div>
      </div>
      <div>
        <div style={{borderBottom:"solid #4b1e9e8c", padding:"3%"}} onClick={toHelp}>
          <h2>Ayuda</h2>
        </div>
        <div style={{borderBottom:"solid #4b1e9e8c", padding:"3%"}} onClick={toHelp}>
          <h2>Acerca de</h2>
        </div>
        <div style={{padding:"3%", paddingBottom:"0%"}} onClick={signOut}>
          <h2>Cerrar sesión</h2>
        </div>
      </div>
    </div>
  );
}
 // useEffect(() => {
  //   // fetch('http://localhost:3000/usuarios')
  //   fetch('https://domoticloud.onrender.com/usuarios')
  //     .then(response => response.json())
  //     .then(data => setUsuarios(data))
  //     .catch(error => console.error('Error fetching usuarios:', error));
  
  //   // fetch('http://localhost:3000/numusu')
  //   fetch('https://domoticloud.onrender.com/numusu')
  //     .then(response => response.json())
  //     .then(data => setNumUsuarios(data))
  //     .catch(error => console.error('Error fetching number of users:', error));

  //     const obtenerSeñales = async () => {
  //       try {
  //         const response = await fetch('https://domoticloud.onrender.com/getallsignal', {
  //         // const response = await fetch('http://localhost:3000/getallsignal', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //             usu: 'Alan Montes'
  //           })
  //         });
  
  //         if (!response.ok) {
  //           throw new Error('Hubo un problema al obtener las señales.');
  //         }
  
  //         // Si la solicitud es exitosa, obtenemos los datos de la respuesta
  //         const data = await response.json();
  //         setSignals(data);
  //       } catch (error) {
  //         console.error('Error:', error);
  //         // Manejar el error, por ejemplo, mostrar un mensaje al usuario
  //       }
  //     };
  
  //     // Llamar a la función para obtener las señales cuando el componente se monte
  //     obtenerSeñales();

  //     const intervalId = setInterval(obtenerSeñales, 2000);

  //     // Limpiar el intervalo cuando el componente se desmonte
  //     return () => clearInterval(intervalId);

  // }, []);

{/* <table>
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
  </table> */}

 {/* <h1>Colaboradores</h1>
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
          </table> */}
