import "../App.css"
import React, { useState, useEffect } from 'react';
const RouteAddCollaborator = import.meta.env.VITE_ADD_COLLABORATOR || "http://localhost:3000/add/colaborador"
const RoutesearchEmails = import.meta.env.VITE_SEARCHES_CORREOUSERS || "http://localhost:3000/searches/correousers";
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
const RoutesearchCollaborator = import.meta.env.VITE_SEARCHES_IDUSU || "http://localhost:3000/searches/idusu";
export default function CreateCollaboratorForm({onClose, id, userData}){
    const [nameCollaborator, setNameCollaborator] = useState("");
    const [idUserCollaborator, setIdUserCollaborator] = useState("")
    const [emailsUser, setEmailsUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState([]);
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    if(localStorageUser){
        userData = localStorageUser;
    }




    const handleNameCollaborator = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setNameCollaborator(inputValue);
        if(inputValue.length>=6){
            const filterUsers = emailsUser.filter(email=> email.correo.toLowerCase().includes(inputValue) && email !== localStorage.getItem("userData"));
            setSearchResults(filterUsers);
        }
        else {
            setSearchResults([]);
        }
        
    }
    function handleSuccess(){
        if(nameCollaborator!==""){
            console.log(nameCollaborator)
            console.log()
            addCollaborator().then(() => {
                fetch(`${RouteAddCollaborator}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idusucolab: JSON.stringify(idUserCollaborator),
                        idcomunidad: JSON.stringify(id.idCommunity)
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al realizar la solicitud');
                    }
                    return response.json();
                })
                .then(data => {
                    onClose();
                })
                .catch(error => {
                    console.error('Error en handleSuccess:', error);
                });
            });
        } else {
            alert("Debes de llenar todos los campos");
        }
    }

    useEffect(() => {
        fetch(`${RoutesearchEmails}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setEmailsUsers(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    const addEmail = (selectedEmail) => {
        setNameCollaborator("");
        setNameCollaborator(selectedEmail);  
        setSearchResults([])
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
            setUser(element)
        });
      }
      else{
        console.log(data)
        alert("Debes de iniciar sesión");
        navigate('/')
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }, []);
    function addCollaborator () {
        return fetch(`${RoutesearchCollaborator}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: nameCollaborator
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
                    setIdUserCollaborator(element.idusuario);
                });
            }
            else{
                console.log("No seeeeee")
            }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return(
        <div className="background-principal" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div className="login-email-password">
                    <h2 className="title-login">Agregar colaborador</h2>
                    <div>
                        <h3 className="title-data-login">Nombre:</h3>
                        <input className='input-login' type="text" value={nameCollaborator} onChange={handleNameCollaborator} placeholder='Nombre del colaborador...' />
                        <ul className="list-email-users">
                        {searchResults.map((user, index) => (
                            <li key={index} onClick={() => addEmail(user.correo)}>{user.correo}</li>
                        ))}
                    </ul>
                    </div>
                   
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                    <button className="btn-submit-data-user" type="button" onClick={handleSuccess}>Agregar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}