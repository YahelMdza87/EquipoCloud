import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
const RoutesearchNumUsers = import.meta.env.VITE_SEARCHES_NUMUSU = "http://localhost:3000/searches/numusu"


export default function Statistics (){
    const [numusu, setNumusu] = useState(null);
    
    useEffect(() => {
        fetchnumusu();
      
    }, []);

    const fetchnumusu = async () => {
        try {
          const response = await fetch(RoutesearchNumUsers);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setNumusu(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };

  //Funciones de redireccionamiento 

    const navigate = useNavigate();
    function toUserAccount(){
        navigate('/UserAccount')
      }
      function toIndex(){
        navigate('/Principal')
      }

    function toAdminMenu(){
        navigate('/AdminMenu')
    }

    //-----------------------------

    return (
        <div className="body-principal">
           <div className="admin-header">
                <img src={Logo} alt="" className="admin-add-icon-principal" onClick={toIndex}/>
                <h2 className="admin-header-title-menu" onClick={toAdminMenu}>Menu</h2>
                <h2 className="admin-header-title-principal">Domoticloud</h2>
                <h2 className="admin-header-title-user">Estadísticas</h2>
                <img src={User} alt="" className="admin-user-image-principal" onClick={toUserAccount}/>
            </div>
            <div className="admin-center-nav">
                    <div className="divestadisticas">
                        <div className="subdivestadisticas">
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de usuarios <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numusu}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de zonas activas <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numusu}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de cuartos activos <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numusu}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de sensores activos <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numusu}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de comunidades activas <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numusu}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de colaboradores activos <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numusu}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Almacenamiento ocupado en la Base de datos <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numusu}</p></div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}