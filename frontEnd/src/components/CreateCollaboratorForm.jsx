import "../App.css"
import React, { useState, useEffect, useRef } from 'react';
import toOut from "../assets/to-out.png";
const RouteAddCollaborator = import.meta.env.VITE_ADD_COLABORADOR || import.meta.env.VITE_ADD_COLABORADOR_LH;
const RoutesearchEmails = import.meta.env.VITE_SEARCHES_CORREOUSERS || import.meta.env.VITE_SEARCHES_CORREOUSERS_LH;
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || import.meta.env.VITE_SEARCHES_IDUSU_LH;
const RoutesearchCollaborators = import.meta.env.VITE_SEARCHES_COLABDECOMUNIDAD ||  import.meta.env.VITE_SEARCHES_COLABDECOMUNIDAD_LH;
export default function CreateCollaboratorForm({onClose, id, userData}){
    const [nameCollaborator, setNameCollaborator] = useState("");
    const [idUserCollaborator, setIdUserCollaborator] = useState("")
    const [emailsUser, setEmailsUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [user, setUser] = useState([]);
    const hasMounted = useRef(false);
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    //Obtener el correo para hacer un fetch a ver si hay un correo con registrado
    if(localStorageUser){
        userData = localStorageUser;
    }

    //Handle que va guardando lo que el usuario escribe al momento, para buscar entre los correos disponibles
    const handleNameCollaborator = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setNameCollaborator(inputValue);
        if(inputValue.length>=6){
            const filterUsers = emailsUser.filter(email=> email.correo.toLowerCase().includes(inputValue) && email.correo !== localStorageUser &&
            !collaborators.some((collaborator) => collaborator.correo === email.correo))
            setSearchResults(filterUsers.length>0 ? filterUsers : [{ correo: "No hay ningún usuario registrado con ese correo."}]);
        }
        else {
            setSearchResults([]);
        } 
    }
    //Una vez de haberle picado al botón de agregar, entrará aquí y comprobara si el correo ingresado es valido
    function handleSuccess(){
        if(nameCollaborator!==""){
            fetch(`${RoutesearchUser}`, {
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
                    else {
                        alert("No se ha encontrado ningún usuario con ese correo.")
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert("Debes de llenar todos los campos");
        }
    }
    //UseEffect para obtener todos los correos de los usuarios y poder crear la lista de buscador
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
    //Una vez de haberle hecho click al correo deseado, se vacía la lista y se autocompleta en el input
    const addEmail = (selectedEmail) => {
        setNameCollaborator("");
        setNameCollaborator(selectedEmail);  
        setSearchResults([])
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
        fetch(`${RoutesearchCollaborators}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idcomunidad: JSON.stringify(id.idCommunity)
            })
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            setCollaborators(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    useEffect(() => {
        if(hasMounted.current){
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
                alert("Usuario agregado con exito!")
                onClose();
            })
            .catch(error => {
                    console.error('Error en handleSuccess:', error);  
            });
        }
        else {
            hasMounted.current = true;
        }
        
    }, [idUserCollaborator]);

    return(
        <div className="background-principal fade-in" onClick={onClose}>
            <div className="card-principal" onClick={(e) => e.stopPropagation()}>
                <div style={{display:"grid"}}><img className="close-create" src={toOut} alt="" onClick={onClose} /></div>
                <div className="div-create-component">
                    <h2 className="title-create-component">Agregar colaborador</h2>
                    <div>
                        <h3 className="title-data-component">Nombre:</h3>
                        <input className="input-create-component" type="text" value={nameCollaborator} onChange={handleNameCollaborator} placeholder='Nombre del colaborador...' />
                        <ul className="list-email-users">
                            {searchResults.map((user, index) => (
                                <li key={index} onClick={() => addEmail(user.correo)}>{user.correo}</li>
                            ))}
                        </ul>
                    </div>
                    <div style={{marginTop:"5%", display:"flex", justifyContent:"center", textWrap:"nowrap"}}>
                        <button style={{marginRight:"4%"}} className="btn-submit-create-component only-button" type="button" onClick={onClose}>Salir</button>
                        <button className="btn-submit-create-component" type="button" onClick={handleSuccess}>Agregar colaborador</button>
                    </div>
                </div>

            </div>
        </div>
    )
}