import Logo from "../assets/logo-domoticloud.png";
import User from "../assets/user.png";
import iconuser from "../assets/users-solid.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoutesearchUsers = import.meta.env.VITE_SEARCHES_USUARIOS || "http://localhost:3000/searches/usuarios"


export default function ManageCounts() {
    const [users, setUsers] = useState(null);
    const [searchUsers, setSearchUsers] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(RoutesearchUsers);
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los datos');
            }
            const responseData = await response.json();
            setUsers(responseData);
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredUsers = users
        ? users.filter((usu) =>
            (usu.usuario && usu.usuario.toLowerCase().includes(searchUsers.toLowerCase())) ||
            (usu.correo && usu.correo.toLowerCase().includes(searchUsers.toLowerCase())) ||
            (usu.nombre && usu.nombre.toLowerCase().includes(searchUsers.toLowerCase())) ||
            (usu.cargo && usu.cargo.toLowerCase().includes(searchUsers.toLowerCase()))
        )
        : [];

    const navigate = useNavigate();

    function toUserAccount() {
        navigate('/UserAccount');
    }

    function toIndex() {
      navigate('/')
    }

    function toAdminMenu() {
        navigate('/AdminMenu');
    }

    return (
        <div className="body-principal">
            <div className="admin-header">
                <img src={Logo} alt="" className="admin-add-icon-principal" onClick={toIndex} />
                <h2 className="admin-header-title-menu" onClick={toAdminMenu}>Menu</h2>
                <h2 className="admin-header-title-principal">Domoticloud</h2>
                <h2 className="admin-header-title-user">Cuentas activas</h2>
                <img src={User} alt="" className="admin-user-image-principal" onClick={toUserAccount} />
            </div>
            <div className="divVariables" id="users-counts-div">
                <div className="select-var" id="build">
                    <div className="title-variable" style={{ fontSize: "2vw" }}>
                        <p>Lista de todos <br />los <br /> usuarios registrados </p>
                    </div>
                    <div className="content-variable">
                        <div className="admin-img-nav-variable">
                            <img className="admin-img-variable" src={iconuser} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="divVariables-dos" id="builds">
                <div className="container-browser-var">
                    <div className="icon-browser-var">
                        <div className="admin-conticon-build">
                            <img className="admin-img-build" src={iconuser} />
                        </div>
                    </div>
                    <input
                        className="bar-browser-var"
                        placeholder="Busca Usuario..."
                        value={searchUsers}
                        onChange={(e) => setSearchUsers(e.target.value)}
                    />
                    <div className="button-browser-var">BUSCAR</div>
                </div>
                <div className="container-results-var" id="nav-users">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((usu, index) => (
                            <div className="building-var" key={index} id="user-var">
                                <div className="icon-browser-var">
                                    <div className="admin-conticon-build">
                                        <img className="admin-img-build" src={iconuser} />
                                    </div>
                                </div>
                                <div className="id-edificio-var">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>ID</th>
                                            </tr>
                                            <tr>
                                                <td>{usu.idusuario}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="nombre-edificio-var">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th> Nombre del Usuario</th>
                                            </tr>
                                            <tr>
                                                <td>{usu.usuario}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="nombre-edificio-var">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th> Correo </th>
                                            </tr>
                                            <tr>
                                                <td>{usu.correo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="nombre-edificio-var">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th> Nombre</th>
                                            </tr>
                                            <tr>
                                                <td>{usu.nombre}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="nombre-edificio-var">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th> Cargo</th>
                                            </tr>
                                            <tr>
                                                <td>{usu.cargo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="nombre-edificio-var">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Contraseña</th>
                                            </tr>
                                            <tr>
                                                <td>{usu.pass}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="building-var">
                            <div className="icon-browser-var">
                                <div className="admin-conticon-build">
                                    <img className="admin-img-build" src={iconuser} />
                                </div>
                            </div>
                            <div className="id-edificio-var">
                            </div>
                            <div className="nombre-edificio-var">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>No se encontraron usuarios</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
