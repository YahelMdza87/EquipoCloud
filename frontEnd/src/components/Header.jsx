import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../assets/user.png'; // Ajusta la ruta según tu proyecto
import Logo from '../assets/logo-domoticloud.png'; // Ajusta la ruta según tu proyecto

const Header = () => {
  const navigate = useNavigate();

  const toUserAccount = () => {
    navigate('/userAccount');
  };

  const toIndex = () => {
    navigate('/principal');
  };

  return (
    <div className="header-principal">
      <h2 className="header-title-principal">Domoticloud</h2>
      <img src={User} alt="" className="user-image-principal" onClick={toUserAccount} />
      <img src={Logo} alt="" className="add-icon-principal" onClick={toIndex} />
    </div>
  );
};

export default Header;