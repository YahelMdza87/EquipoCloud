import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-domoticloud.png"
import Back from "../assets/to-back.png"
import User from "../assets/user.png"
import Loading from './Loading';
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutechangesUser = import.meta.env.VITE_CHANGES_USUARIO || "http://localhost:3000/changes/usuario";
export default function EditUser({userData}){
    const navigate = useNavigate();
    //Estados para manejar los inputs del usuario
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [workstation, setWorkstation] = useState("");
    const [loading, setLoading] = useState(true);
    //Obtener el correo para hacer un fetch a ver si hay un correo con registrado
    const localStorageUser = JSON.parse(localStorage.getItem('userData'));
    if (localStorageUser){
        userData=localStorageUser;
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
    //useEffect para comprobar que si tenemos la sesión iniciada
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
            setLoading(false);
            if(data && data.length>0){
                data.forEach(user => {
                    setId(user.idusuario)
                    setName(user.nombre);
                    setEmail(user.correo);
                    setPass(user.pass);
                    setUser(user.usuario);
                    setWorkstation(user.cargo);
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

    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
      const handleUserChange = (event) => {
        setUser(event.target.value);
      };
      const handleWorkstationChange = (event) => {
        setWorkstation(event.target.value);
      };
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handlePassChange = (event) => {
        setPass(event.target.value);
      };

      //Hace un fetch para actualizar los datos
      const handleSubmit = (event) => {
        if (pass === ""){
            alert("La contraseña no debe de estar vacía")
        }
        else{
        const newDataUser = {
            name: name,
            user: user,
            email: email,
            pass: pass,
            work: workstation
        }
        event.preventDefault();
        fetch(`${RoutechangesUser}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idusuario: id,
                usuario: user ,
                pass: pass,
                nombre: name,
                correo: email,
                cargo: workstation
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(user => {
        
        })
        .catch(error => {
            console.error('Error:', error);
        });
        localStorage.setItem('userData',JSON.stringify(newDataUser.email));
      }};
    return(
        <div className="body-principal">
            <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
            </div>
            {loading ? <Loading /> : (
                <>
                    <div>
                        <img src={Back} alt="" className="to-back-button" onClick={goBack} />
                    </div>
                    <div className="section-data-useraccount">
                        <img src={User} alt="" className="user-image-userAccount" />
                        <h3 className="name-user-userAccount" style={{gridRow:"1"}}>{name}</h3>
                        <h3 className="name-role-userAccount" style={{gridRow:"2/4"}}>{workstation}</h3>
                    </div>
                    <form onSubmit={handleSubmit} style={{padding:"8%", paddingTop:"0%"}}>
                        <div>
                            <label className="title-data-login" style={{color:"#4a1e9e"}}>Nombre:</label>
                            <input type="text" className="input-login" value={name} onChange={handleNameChange} />
                        </div>
                        <div>
                            <label className="title-data-login" style={{color:"#4a1e9e"}}>Usuario:</label>
                            <input type="text" className="input-login" value={user} onChange={handleUserChange} />
                        </div>
                        <div>
                            <label className="title-data-login" style={{color:"#4a1e9e"}}>Correo:</label>
                            <input type="email" className="input-login" value={email} onChange={handleEmailChange} />
                        </div>
                        <div>
                            <label className="title-data-login" style={{color:"#4a1e9e"}}>Contraseña:</label>
                            <input type="password" className="input-login" value={pass} onChange={handlePassChange} />
                        </div>
                        <div>
                            <label className="title-data-login" style={{color:"#4a1e9e"}}>Cargo:</label>
                            <input type="text" className="input-login" value={workstation} onChange={handleWorkstationChange} />
                        </div>
                        <div>
                            <button className="btn-submit-data-user" type="submit">Guardar</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}