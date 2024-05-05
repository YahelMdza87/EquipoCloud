import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
import { useNavigate } from "react-router-dom";



export default function Statistics (){

    const navigate = useNavigate();
    function toUserAccount(){
        navigate('/UserAccount')
      }
      function toIndex(){
        navigate('/Principal')
      }

    return (
        <div className="body-principal">
            <div className="header-principal">
                <h2 className="header-title-principal">Domoticloud</h2>
                <img src={User} alt="" className="user-image-principal" onClick={toUserAccount}/>
                <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex}/>
            </div>
        </div>
    )
}