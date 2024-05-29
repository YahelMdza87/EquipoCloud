import React from 'react';
import feature3 from '../assets/comunidad-icono.png';
import Footer from './Footer';
import Foco from '../assets/foco-led.png'
import Candado from '../assets/candado.png'
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate("");
    function toLogin(){
        navigate("/login")
    }

    return (
        <div>
            <div className="landin-div">
                <div className="landin-div-content fade-in">
                    <h1>Domoticloud</h1>
                    <p>La mejor solución de inmótica para una gestión eficiente y segura de tus espacios.</p>
                    <button className="btn" onClick={toLogin}>Iniciar sesión</button>
                </div>
            </div>
            <div id="features" className="features">
                <div className="feature-container">
                    <h2>Características</h2>
                    <div className="features-grid">
                        <div className="feature-item" >
                            <img src={Foco} alt="Automatización" />
                            <h3>Automatización</h3>
                            <p>Controla todos los dispositivos de manera automática y remota.</p>
                        </div>
                        <div className="feature-item" >
                            <img src={Candado} alt="Seguridad" />
                            <h3>Seguridad</h3>
                            <p>Protege tus instalaciones con sistemas de seguridad avanzados.</p>
                        </div>
                        <div className="feature-item" >
                            <img src={feature3} alt="Eficiencia Energética" />
                            <h3>Eficiencia Energética</h3>
                            <p>Optimiza el consumo energético para reducir costos.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
