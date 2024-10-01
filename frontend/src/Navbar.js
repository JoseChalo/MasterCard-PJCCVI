import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Mastercard</Link>
        <img
            src="https://images.wsj.net/im-45496?width=860&size=1.5&pixel_ratio=2"
            alt="Mastercard Logo"
            className="navbar-logo"
          />
      </div>
      <ul className="navbar-links">
        <li><Link to="/pagar">Pagar</Link></li>
        <li><Link to="/compras">Ver Compras</Link></li>
        <li><Link to="/fechas">Fechas de Corte y Pago</Link></li>
        <li><Link to="/tarjetas">Tarjetas</Link></li> {/* Nuevo enlace */}
      </ul>
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>
      <div className="navbar-logout">
        <button>Cerrar Sesión</button>
      </div>
    </nav>
  );
}

export default Navbar;
