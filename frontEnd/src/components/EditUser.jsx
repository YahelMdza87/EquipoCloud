import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-domoticloud.png"
import Back from "../assets/to-back.png"
import User from "../assets/user.png"
export default function EditUser({userData}){
    const navigate = useNavigate();
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

    const [name, setName] = useState(userData.name);
    const [user, setUser] = useState(userData.user);
    const [email, setEmail] = useState(userData.email);
    const [pass, setPass] = useState(userData.pass);
    const [workstation, setWorkstation] = useState(userData.work);

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
  
    
      
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí Alan, siento que puedes hacer mmds con tu base de datos
        const newDataUser = {
            name: name,
            user: user,
            email: email,
            pass: pass,
            work: workstation
        }
        console.log(newDataUser);
        localStorage.setItem('userData',JSON.stringify(newDataUser));
        navigate('/userAccount')
      };
    return(
        <div className="body-principal">
            <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
            </div>
            <div>
                <img src={Back} alt="" style={{width:"9%",borderBottom:"1px solid #ba98ff69",borderRight:"1px solid #ba98ff69"}} onClick={toUserAccount} />
            </div>
            <div className="section-data-useraccount">
                <img src={User} alt="" className="user-image-userAccount" />
                <h2 className="name-user-userAccount" >{name}</h2>
                <h2 className="name-role-userAccount">{workstation}</h2>
            </div>
            <form onSubmit={handleSubmit} style={{padding:"8%", paddingTop:"0%"}}>
                <div>
                    <label className="title-data-login">name:</label>
                    <input type="text" className="input-login" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label className="title-data-login">user:</label>
                    <input type="text" className="input-login" value={user} onChange={handleUserChange} />
                </div>
                <div>
                    <label className="title-data-login">email:</label>
                    <input type="email" className="input-login" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label className="title-data-login">pass:</label>
                    <input type="password" className="input-login" value={pass} onChange={handlePassChange} />
                </div>
                <div>
                    <label className="title-data-login">workstation:</label>
                    <input type="text" className="input-login" value={workstation} onChange={handleWorkstationChange} />
                </div>
                <div>
                    <button className="btn-submit-data-user" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
}