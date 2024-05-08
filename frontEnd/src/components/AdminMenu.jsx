import Logo from "../assets/logo-domoticloud.png"
import User from "../assets/user.png"
import gear from "../assets/gears-solid.svg"
import usericon from "../assets/users-solid.svg"
import iconstats from "../assets/chart-pie-solid.svg"
import iconlicences from "../assets/money-check-dollar-solid.svg"
import { useNavigate } from "react-router-dom";

export default function AdminMenu (){
    const navigate = useNavigate();
    function toUserAccount(){
        navigate('/UserAccount')
    }

    function toIndex(){
        navigate('/Principal')
    }

    function toVariableConfig(){
        navigate('/VariableConfig')
    }


    function toManageCounts(){
        navigate('/ManageCounts')
    }
    
    function toStatistics(){
        navigate('/Statistics')
    }

    function toLicenses(){
        navigate('/Licenses')
    }

    function toAdminMenu(){
        navigate('/AdminMenu')
    }

    return (
        <div className="admin-body-principal">
            <div className="admin-header">
                <img src={Logo} alt="" className="admin-add-icon-principal" onClick={toIndex}/>
                <h2 className="admin-header-title-menu" onClick={toAdminMenu}>Menu</h2>
                <h2 className="admin-header-title-principal">Domoticloud</h2>
                <h2 className="admin-header-title-user">Bienvenido Administrador</h2>
                <img src={User} alt="" className="admin-user-image-principal" onClick={toUserAccount}/>
            </div>
            <div className="admin-center-nav">
                <div className="admin-nav">
                    <div className="admin-nav-element-1" onClick={toVariableConfig}>
                        <div className="admin-subnav-1">
                                <div style={{height:"20%"}}>
                                <h2 className="fount">Administración de variables</h2>
                                </div>
                                    <div className="admin-img-nav">
                                        <img className="admin-img" src={gear}/>
                                    </div>
                                <div style={{height:"20%"}}>
                                <h3 className="fount">Configuración de variables</h3>
                                </div>
                        </div>
                    </div>
                    <div className="admin-nav-element-2" onClick={toManageCounts}>
                        <div className="admin-subnav-2">
                            <div style={{height:"20%"}}>
                                    <h2 className="fount">Administración de cuentas</h2>
                                    </div>
                                        <div className="admin-img-nav">
                                            <img src={usericon}/>
                                        </div>
                                    <div style={{height:"20%"}}>
                                    <h3 className="fount">Clientes activos</h3>
                                    </div>
                            </div>                
                    </div>
                    <div className="admin-nav-element-3" onClick={toStatistics}>
                        <div className="admin-subnav-3">
                            <div style={{height:"20%"}}>
                                    <h2 className="fount">Administración de estadísticas</h2>
                                    </div>
                                        <div className="admin-img-nav">
                                            <img src={iconstats}/>
                                        </div>
                                    <div style={{height:"20%"}}>
                                    <h3 className="fount">Estadísticas de la plataforma</h3>
                                    </div>
                            </div>
                    </div>
                    <div className="admin-nav-element-4" onClick={toLicenses}>
                        <div className="admin-subnav-4">
                            <div style={{height:"20%"}}>
                                    <h2 className="fount">Administración de licencias</h2>
                                    </div>
                                        <div className="admin-img-nav">
                                            <img src={iconlicences}/>
                                        </div>
                                    <div style={{height:"20%"}}>
                                    <h3 className="fount">Configuración de licencias</h3>
                            </div>
                        </div>             
                    </div>
                </div>
            </div>
        </div>
    )
}