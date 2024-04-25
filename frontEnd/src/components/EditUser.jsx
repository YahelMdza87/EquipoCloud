import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-domoticloud.png"

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
            work: workstation,
            image: userData.image
        }
        console.log(newDataUser);
        localStorage.setItem('userData',JSON.stringify(newDataUser));
        navigate('/UserAccount')
      };
    return(
        <div className="body-principal">
            <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={userData.image} alt="" className="user-image-principal" onClick={toUserAccount}/>
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>name:</label>
                    <input type="text" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label>user:</label>
                    <input type="text" value={user} onChange={handleUserChange} />
                </div>
                <div>
                    <label>email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>pass:</label>
                    <input type="password" value={pass} onChange={handlePassChange} />
                </div>
                <div>
                    <label>workstation:</label>
                    <input type="text" value={workstation} onChange={handleWorkstationChange} />
                </div>
                <button className="btn-submit-data-user" type="submit">Guardar</button>
            </form>
        </div>
    );
}