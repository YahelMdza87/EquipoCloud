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

    function toAdminMenu(){
        navigate('/AdminMenu')
    }

    return (
        <div className="body-principal">
           <div className="admin-header">
                <img src={Logo} alt="" className="admin-add-icon-principal" onClick={toIndex}/>
                <h2 className="admin-header-title-menu" onClick={toAdminMenu}>Menu</h2>
                <h2 className="admin-header-title-principal">Domoticloud</h2>
                <h2 className="admin-header-title-user">Estadísticas</h2>
                <img src={User} alt="" className="admin-user-image-principal" onClick={toUserAccount}/>
            </div>
        </div>
    )
}