import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesCSS/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Mastercard</Link>
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