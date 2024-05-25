import User from "../assets/user.png";
import Logo from "../assets/logo-domoticloud.png";
import { useNavigate } from "react-router-dom";

export default function Maintenance(){
    const navigate = useNavigate();
    function toUserAccount() {
        navigate('/UserAccount');
    }
    function toIndex() {
        navigate('/Principal');
    }
    return(
        <div className="body-principal">
            <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={User} alt="" className="user-image-principal" onClick={toUserAccount} />
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex} />
            </div>
            <div style={{display:"flex", height:"80%", alignItems:"center"}}>
                <div className="section-maintenance">
                    <div className="img-maintenance"><img style={{width:"30%", justifySelf:"center"}} src="https://www.arqhys.com/wp-content/uploads/2016/12/Tipos-de-mantenimiento..jpg" alt="" /></div>
                    <h3 className="text-maintenance"> Estamos en mantenimiento </h3>
                </div>
            </div>
        </div>
    );
}