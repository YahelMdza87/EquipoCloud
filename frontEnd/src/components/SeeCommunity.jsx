import Logo from "../assets/logo-domoticloud.png"
import Agregar from "../assets/add-device.png"
import Basura from "../assets/icono-basura.png"
import Back from "../assets/to-back.png"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import UserIcono from "../assets/user-icono.png"
import CreateCollaboratorForm from "./CreateCollaboratorForm";
import DeleteComponent from "./DeleteComponent";
import Loading from './Loading';
//Rutas para hacer fetch
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || import.meta.env.VITE_SEARCHES_IDUSU_LH;
const RoutesearchEmails = import.meta.env.VITE_SEARCHES_CORREOUSERS || import.meta.env.VITE_SEARCHES_CORREOUSERS_LH;
const RoutesearchCollaborators = import.meta.env.VITE_SEARCHES_COLABDECOMUNIDAD ||  import.meta.env.VITE_SEARCHES_COLABDECOMUNIDAD_LH;
const RoutesearchCommunity = import.meta.env.VITE_SEARCHES_COMUNIDAD || import.meta.env.VITE_SEARCHES_COMUNIDAD_LH;
export default function SeeCommunity({selectedCommunity,userData}){
    const navigate = useNavigate();
    const localStorageSelectedCommunity = JSON.parse(localStorage.getItem("idCommunity"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    const [idRoom, setIdRoom] = useState("");
    const [idCommunity, setIdCommunity] = useState("");
    const [community, setCommunity] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [emailsUsers, setEmailsUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [showAddCollaboratorForm, setShowAddCollaboratorForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    if(localStorageSelectedCommunity){
        selectedCommunity = localStorageSelectedCommunity;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    if(localStorageWichComponent!=="community"){
        localStorage.setItem("wichComponent", JSON.stringify("community"))
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
    //Obtener datos de usuario
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
            setUser(element)
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

    useEffect(() => {
        fetch(`${RoutesearchCommunity}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idcomunidad: selectedCommunity
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
            setCommunity(element)
            setIdCommunity(element.id_comunidad)
        });
      }
      else{
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }, []);
    useEffect(() => {
        fetch(`${RoutesearchEmails}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            setEmailsUsers(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);
    function addCollaborator() {
        setShowAddCollaboratorForm(true);
    }
    useEffect(() => {
        fetch(`${RoutesearchCollaborators}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idcomunidad: selectedCommunity
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
            setCollaborators(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);


    function toDelete(){
        setShowConfirmDelete(true);
    }
    function closeDelete(){
        setShowConfirmDelete(false);
    }

    function closeAddCollaboratorModal() {
        setShowAddCollaboratorForm(false);
    }
    function toCollaborator(){

    }


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
                    <div style={{alignItems:"center", justifyItems:"center", textAlign:"center"}}> <h1>{community.nombrecomunidad}</h1></div>
                    <div className="section-image-zone">
                        <img className="image-zone" src="https://media.admagazine.com/photos/62b4b828cce4cfe1db2ed95e/4:3/w_2664,h_1998,c_limit/Dormitorio.jpg" alt="" />
                    </div>
                    <h1 style={{marginLeft:"2%", marginTop:"1%"}}>Colaboradores</h1>
                    <div className="section-devices-principal">
                        <div className="div-add-zone-principal div-only-agregar" onClick={addCollaborator}>
                            <img className="add-zone-icon-principal" src={Agregar} alt="" />
                            <h3 className="add-zone-text-principal">Agregar colaborador</h3>
                        </div>
                        { collaborators.map((collaborator,index) => (
                        <div id={collaborator.id_colaborador} key={index} className="div-add-zone-principal fade-in"  onClick={toCollaborator}>
                            <h3 className="name-divs-generated" style={{gridRow:"1"}}>{collaborator.correo}</h3>
                            <img src={UserIcono} alt="" className="img-divs-generated" style={{gridRow:"2"}} />
                        </div>
                        ))}
                    </div>
                    
                    {showConfirmDelete && ( 
                        <DeleteComponent onClose={closeDelete} id={{idRoom}} wich={{localStorageWichComponent}}/>
                    )}
                    {showAddCollaboratorForm && ( 
                        <CreateCollaboratorForm onClose={closeAddCollaboratorModal} id={{idCommunity}} />
                    )}
                    {/* <div style={{justifyItems:"center", alignItems:"center", textAlign:"center"}}><img src={Basura} alt="" onClick={toDelete}/></div> */}
                </>
            )}
        </div>
    )
}