import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
import Building from "../assets/building-solid.svg"
import Signal from "../assets/wifi-solid.svg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
const RoutesearchEdificios = import.meta.env.VITE_SEARCHES_TIPOEDIFICIO || "http://localhost:3000/searches/tipoedificio"
const RoutesearchSeñales = import.meta.env.VITE_SEARCHES_SIGNAL || "http://localhost:3000/searches/signal"



export default function VariableConfig (){
    

    const [tipoedificios, setTipoedificios] = useState(null);
    const [tiposeñales, setTiposeñales] = useState(null);
    const [searchTermEdificios, setSearchTermEdificios] = useState("");
    const [searchTermSeñales, setSearchTermSeñales] = useState("");

    useEffect(() => {
        fetchtipoedificio();
        fetchtiposeñales();
    }, []);

    const navigate = useNavigate();
    function toUserAccount(){
        navigate('/UserAccount')
        
      }
      function toIndex(){
        navigate('/')
      }

      function toAdminMenu(){
        navigate('/AdminMenu')
    }


    const fetchtipoedificio = async () => {
        try {
          const response = await fetch(RoutesearchEdificios);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setTipoedificios(responseData);
          console.log(responseData)
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const fetchtiposeñales = async () => {
        try {
          const response = await fetch(RoutesearchSeñales);
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
          }
          const responseData = await response.json();
          setTiposeñales(responseData);
          console.log(responseData)
        } catch (error) {
          console.error('Error:', error);
        }
      };

    function checkedificio(){
        document.getElementById("build").style.backgroundColor="rgba(240, 248, 255, 0.486)"
        document.getElementById("signal").style.backgroundColor="#DDCBFF"
        document.getElementById("builds").style.display = ""
        document.getElementById("signals").style.display = "none"
    }

    function checkedsignal(){
        document.getElementById("signal").style.backgroundColor="rgba(240, 248, 255, 0.486)"
        document.getElementById("build").style.backgroundColor="#DDCBFF"
        document.getElementById("builds").style.display = "none"
        document.getElementById("signals").style.display = ""
    }


    const filteredEdificios = tipoedificios
    ? tipoedificios.filter((edificio) =>
        edificio.tipoedificio.toLowerCase().includes(searchTermEdificios.toLowerCase())
      )
    : [];

    const filteredSeñales = tiposeñales
    ? tiposeñales.filter((señal) =>
        señal.señal.toLowerCase().includes(searchTermSeñales.toLowerCase())
      )
    : [];
    

    return (
        
        <div className="body-principal">

           <div className="admin-header">
                <img src={Logo} alt="" className="admin-add-icon-principal" onClick={toIndex}/>
                <h2 className="admin-header-title-menu" onClick={toAdminMenu}>Menu</h2>
                <h2 className="admin-header-title-principal">Domoticloud</h2>
                <h2 className="admin-header-title-user">Configuración de variables</h2>
                <img src={User} alt="" className="admin-user-image-principal" onClick={toUserAccount}/>
           </div>


           <div className="admin-center-nav-var">
                    <div className="divVariables">
                              <div className="select-var" id="build" onClick={checkedificio}>
                                  <div className="title-variable"><p>Mostrar lista de <br></br> tipos  <br></br> de edificios</p></div>
                                  <div className="content-variable">
                                        <div className="admin-img-nav-variable">
                                            <img className="admin-img-variable" src={Building}/>
                                        </div>
                                  </div>
                              </div>
                              <div className="select-var" id="signal" onClick={checkedsignal} >
                                  <div className="title-variable"><p>Mostrar lista de <br></br> tipos  <br></br> de señales</p></div>
                                  <div className="content-variable">
                                        <div className="admin-img-nav-variable">
                                            <img className="admin-img-variable" src={Signal}/>
                                        </div>
                                  </div>
                              </div>
                    </div>
                    
                    <div className="divVariables-dos" id="builds">
                        <div className="container-browser-var">
                            <div className="icon-browser-var"> 
                                       <div className="admin-conticon-build">
                                            <img className="admin-img-build" src={Building}/> 
                                        </div>
                            </div>
                            <input
                                className="bar-browser-var"
                                placeholder="Busca el tipo de edificio..."
                                value={searchTermEdificios}
                                onChange={(e) => setSearchTermEdificios(e.target.value)}
                            />
                            <div className="button-browser-var">BUSCAR</div>
                        </div>
                        <div className="container-results-var">
                        {filteredEdificios.length > 0 ? (
                        filteredEdificios.map((tipoedificio, index) => (                               
                                <div className="building-var" key={index}>
                                    <div className="icon-browser-var"> 
                                            <div className="admin-conticon-build">
                                                    <img className="admin-img-build" src={Building}/> 
                                            </div>
                                    </div>
                                    <div className="id-edificio-var"> 
                                        <table>
                                        <tbody>
                                        <tr>
                                        <th>ID</th>
                                        </tr>
                                        <tr>
                                        <td>{tipoedificio.id_tipoedificio}</td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </div>                            
                                    <div className="nombre-edificio-var"> 
                                        <table>
                                        <tbody>
                                        <tr>
                                        <th> Nombre del edificio</th>
                                        </tr>
                                        <tr>
                                        <td>{tipoedificio.tipoedificio}</td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </div>                            
                                    <div className="button-editar-var">EDITAR</div>
                            </div>
                                ))
                            ) : (
                                        <div className="building-var" >
                                        <div className="icon-browser-var"> 
                                                <div className="admin-conticon-build">
                                                        <img className="admin-img-build" src={Building}/> 
                                                </div>
                                        </div>
                                        <div className="id-edificio-var"> 
                                        </div>                            
                                        <div className="nombre-edificio-var"> 
                                            <table>
                                            <tbody>
                                            <tr>
                                            <td>No se encontraron edificios</td>
                                            </tr>
                                            </tbody>
                                            </table>
                                        </div>                            
                                </div>
                            )}    
                        </div>
                    </div>

                    <div className="divVariables-dos" id="signals" style={{display:"none"}}>
                        <div className="container-browser-var">
                            <div className="icon-browser-var"> 
                                       <div className="admin-conticon-build">
                                            <img className="admin-img-build" src={Signal}/> 
                                        </div>
                            </div>
                            <input
                                className="bar-browser-var"
                                placeholder="Busca el tipo de señal..."
                                value={searchTermSeñales}
                                onChange={(e) => setSearchTermSeñales(e.target.value)}
                            /><div className="button-browser-var">BUSCAR</div>
                        </div>
                        <div className="container-results-var">
                            {filteredSeñales.length > 0 ? (
                            filteredSeñales.map((tiposeñal, index) => (                               
                                <div className="building-var" key={index}>
                                    <div className="icon-browser-var"> 
                                            <div className="admin-conticon-build">
                                                    <img className="admin-img-build" src={Signal}/> 
                                            </div>
                                    </div>
                                    <div className="id-edificio-var"> 
                                        <table>
                                        <tbody>
                                        <tr>
                                        <th>ID</th>
                                        </tr>
                                        <tr>
                                        <td>{tiposeñal.id_señal}</td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </div>                            
                                    <div className="nombre-edificio-var"> 
                                        <table>
                                        <tbody>
                                        <tr>
                                        <th> Nombre de la señal</th>
                                        </tr>
                                        <tr>
                                        <td>{tiposeñal.señal}</td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </div>                            
                                    <div className="button-editar-var" >EDITAR</div>
                            </div>
                                ))
                            ) : ( 
                                <div className="building-var" >
                                <div className="icon-browser-var"> 
                                        <div className="admin-conticon-build">
                                                <img className="admin-img-build" src={Signal}/> 
                                        </div>
                                </div>
                                <div className="id-edificio-var"> 
                                </div>                            
                                <div className="nombre-edificio-var"> 
                                    <table>
                                    <tbody>
                                    <tr>
                                    <td>No se encontraron señales</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>                            
                        </div>
                    )}      
                        </div>
                    </div>
                                        
            </div>            
        </div>



    )
}


