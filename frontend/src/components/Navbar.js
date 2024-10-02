import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesCSS/Navbar.css';
import LogoMasterCard from '../images/LogoMasterCard.avif';

import { gmailUser } from './gmailUserContext.js';

const Navbar = () => {
  const navigate = useNavigate();
  const { setGmailCurrent } = useContext(gmailUser);

  const handleLogout = () => {
    // Eliminar el token de sesión (o cualquier otro estado de autenticación)
    localStorage.removeItem('authToken');

    // Redirigir al usuario a la página de inicio de sesión y evitar que use el botón de atrás
    setGmailCurrent('');
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">Mastercard</Link>
        <img src={LogoMasterCard} alt="Mastercard Logo" className="navbar-logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/pagar">Pagar</Link></li>
        <li><Link to="/compras">Ver Compras</Link></li>
        <li><Link to="/fechas">Fechas de Corte y Pago</Link></li>
        <li><Link to="/tarjetas">Tarjetas</Link></li> 
      </ul>
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>
      <div className="navbar-logout">
        <button onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
