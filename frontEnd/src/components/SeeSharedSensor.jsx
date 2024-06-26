import Logo from "../assets/logo-domoticloud.png"
import Back from "../assets/to-back.png"
import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png"
import DeleteComponent from "./DeleteComponent";
import Loading from './Loading';
const RouteGetSensor = import.meta.env.VITE_SEARCHES_SENSOR || import.meta.env.VITE_SEARCHES_SENSOR_LH;
const RoutesearchUser = import.meta.env.VITE_SEARCHES_IDUSU || import.meta.env.VITE_SEARCHES_IDUSU_LH;
const RouteChangeSensorRele = import.meta.env.VITE_CHANGES_RELE || import.meta.env.VITE_CHANGES_RELE_LH;
export default function SeeSharedSensor({selectedSharedSensor,userData}){
    const navigate = useNavigate();
    const localStorageSelectedSharedSensor = JSON.parse(localStorage.getItem("idSharedDevice"));
    const localStorageUser = JSON.parse(localStorage.getItem("userData"));
    const localStorageWichComponent = JSON.parse(localStorage.getItem("wichComponent"));
    const [user, setUser] = useState([]);
    const [idSensor, setIdSensor] = useState("");
    const [nameSensor, setNameSensor] = useState("");
    const [valueSensor, setValueSensor] = useState("");
    const [typeSignal, setTypeSignal] = useState("");
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const gaugeRef = useRef(null);
    if(localStorageSelectedSharedSensor){
        selectedSharedSensor = localStorageSelectedSharedSensor;
    }
    if(localStorageUser){
        userData = localStorageUser;
    }
    if(localStorageWichComponent!=="sensor"){
        localStorage.setItem("wichComponent", JSON.stringify("sensor"))
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
        setLoading(false);
        if(data && data.length>0){
            data.forEach(element => {
                setUser(element)
            });
        }
        else{
            // alert("Debes de iniciar sesión");
            // navigate('/')
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }, []);

    useEffect(() => {
    const obtenerSeñales = async () => {
        try{
        const response = await fetch(`${RouteGetSensor}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idsensor: selectedSharedSensor
        })
    });

        if (!response.ok) {
            throw new Error('Hubo un problema al realizar la solicitud.');
        }
        const data = await response.json();
        data.forEach(element => {
            setIdSensor(element.id_sensor);
            setNameSensor(element.nombresensor);
            setValueSensor(element.valor);
            setTypeSignal(element.señal)
            if (gaugeRef.current) {
                const signalFloat = parseFloat(element.valor);
                
                setGaugeValue(gaugeRef.current, (signalFloat/100), element.señal);
              }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };
            obtenerSeñales();

        const intervalId = setInterval(obtenerSeñales, 2000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);

    }, []); 
    function setGaugeValue(gauge, value, typeSignal) {
        if (value < 0 || value > 1) {
          return;
        }
      
        gauge.querySelector(".gauge__fill").style.transform = `rotate(${
            value / 2
          }turn)`;
          gauge.querySelector(".gauge__cover").textContent = `${Math.round(
              value * 100
              )}${typeSignal === 'hum' ? '%' : '°'}`;
    }


    const toggleSwitch = () => {
        console.log(idSensor)
        setIsSwitchOn(!isSwitchOn);
        fetch(`${RouteChangeSensorRele}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idsensor: idSensor
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    function toDelete(){
        setShowConfirmDelete(true);
    }
    function closeDelete(){
        setShowConfirmDelete(false);
    }
    

    return(
        <div className="body-principal">
            {loading ? <Loading /> : (
                <>
                    <div>
                        <img src={Back} alt="" className="to-back-button" onClick={goBack} />
                    </div>
                    <div style={{textAlign:"center"}}><h1 className="title-name-component">{nameSensor}</h1></div>
                    {/* <div className="section-image-zone" style={{borderBottom:"0"}}>
                        <img className="image-zone" src="https://www.elpais.cr/wp-content/uploads/2023/04/Dispositivos-digitales.jpg" alt="" />
                    </div> */}
                    <div style={{borderTop: "solid #4b1e9e13"}}></div>
                    {typeSignal === 'interruptor' ? (
                        <div style={{display:"flex",justifyContent: "center", alignItems: "center"}}>
                            <div className="section-value-SeeSensor-rele" style={{backgroundColor:"#aeffbf"}}>
                            <h3 className="title-state-rele">Estado:</h3>
                            <label className="switch">
                                <input type="checkbox" checked={isSwitchOn} onChange={toggleSwitch} />
                                <span className="slider"></span>
                            </label>
                            <p>{isSwitchOn ? 'Encendido' : 'Apagado'}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="values-devices-SeeSensor fade-in" >
                                <div className="section-value-SeeSensor" style={{backgroundColor:"#aeffbf"}}>
                                    <h3 style={{ gridRow: "1" }}>Señal:</h3>
                                    <p style={{ gridRow: "2" }}>{typeSignal}</p>
                                </div>
                                
                                <div className="section-value-SeeSensor" style={{backgroundColor:"#aeffbf"}}>
                                    <h3 style={{ gridRow: "1" }}>Valor:</h3>
                                    <div className="gauge" ref={gaugeRef}>
                                        <div className="gauge__body">
                                            <div className="gauge__fill"></div>
                                            <div className="gauge__cover"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {showConfirmDelete && ( 
                        <DeleteComponent onClose={closeDelete} id={{idRoom}} wich={{localStorageWichComponent}}/>
                    )}
                    {/* <div style={{justifyItems:"center", alignItems:"center", textAlign:"center"}}><img src={Basura} alt="" onClick={toDelete}/></div> */}
                </>
            )}
        </div>
    )
}