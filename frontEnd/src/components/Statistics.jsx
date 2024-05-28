import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
const RoutesearchStorage = import.meta.env.VITE_SEARCHES_STORAGE || "http://localhost:3000/searches/storage"
const RoutesearchNumUsers = import.meta.env.VITE_SEARCHES_NUMUSU || "http://localhost:3000/searches/numusu"
const RoutesearchNumZonas = import.meta.env.VITE_SEARCHES_NUMZONAS || "http://localhost:3000/searches/numzonas"
const RoutesearchNumCuartos = import.meta.env.VITE_SEARCHES_NUMCUARTOS || "http://localhost:3000/searches/numcuartos"
const RoutesearchNumSensores = import.meta.env.VITE_SEARCHES_NUMSENSORES || "http://localhost:3000/searches/numsensores"
const RoutesearchNumComunidades = import.meta.env.VITE_SEARCHES_NUMCOMUNIDADES || "http://localhost:3000/searches/numcomunidades"
const RoutesearchNumColaboradores = import.meta.env.VITE_SEARCHES_NUMCOLABORADORES || "http://localhost:3000/searches/numcolaboradores"

export default function Statistics (){
    const [numusu, setNumusu] = useState(null);
    const [storage, setStorage] = useState(null);
    const [numzonas, setNumzonas] = useState(null);
    const [numcuartos, setNumcuartos] = useState(null);
    const [numsensores, setNumsensores] = useState(null);
    const [numcomunidades, setNumcomunidades] = useState(null);
    const [numcolaboradores, setNumcolaboradores] = useState(null);
    
    useEffect(() => {
        fetchnumusu();
        fetchstorage();
        fetchnumzonas();
        fetchnumcuartos();
        fetchnumsensores();
        fetchnumcomunidades();
        fetchnumcolaboradores();
      
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

      const fetchnumzonas = async () => {
        try {
          const response = await fetch(RoutesearchNumZonas);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setNumzonas(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchnumcuartos = async () => {
        try {
          const response = await fetch(RoutesearchNumCuartos);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setNumcuartos(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchnumsensores = async () => {
        try {
          const response = await fetch(RoutesearchNumSensores);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setNumsensores(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchnumcomunidades = async () => {
        try {
          const response = await fetch(RoutesearchNumComunidades);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setNumcomunidades(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchnumcolaboradores = async () => {
        try {
          const response = await fetch(RoutesearchNumColaboradores);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setNumcolaboradores(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchstorage = async () => {
        try {
          const response = await fetch(RoutesearchStorage);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setStorage(responseData);
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
                                <div className="content-statistic"><p>{numzonas}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de cuartos activos <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numcuartos}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de sensores activos <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numsensores}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de comunidades activas <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numcomunidades}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Número de colaboradores activos <br></br>en la plataforma</p></div>
                                <div className="content-statistic"><p>{numcolaboradores}</p></div>
                            </div>
                            <div className="statistic">
                                <div className="title-statistic"><p>Almacenamiento ocupado <br/> en la Base de datos <br></br> de la plataforma</p></div>
                                <div className="content-statistic"><p>{storage && storage[0].storage}</p></div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}