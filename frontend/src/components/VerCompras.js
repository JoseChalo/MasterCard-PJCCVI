import React, { useContext } from 'react';
import '../stylesCSS/VerCompras.css';
import Navbar from '../components/Navbar';
import { gmailUser } from './gmailUserContext.js';

const VerCompras = () => {
  const compras = [
    { id: 1, descripcion: 'Compra en Supermercado', monto: 200, fecha: '2024-09-15' },
    { id: 2, descripcion: 'Compra en Tienda Electrónica', monto: 450, fecha: '2024-09-18' }
  ];

  const { gmail } = useContext(gmailUser);

  return (
    <div>
      <Navbar /> {/* Coloca el Navbar fuera del contenido principal */}
      <div className="compras-container">
        <h2 className="compras-title">Compras Realizadas</h2>
        <ul className="compras-list">
          {compras.map((compra) => (
            <li key={compra.id} className="compra-item">
              <span className="compra-descripcion">{compra.descripcion}</span> 
              <span className="compra-monto">Q{compra.monto}</span>
              <span className="compra-fecha">{compra.fecha}</span>
            </li>
          ))}
        </ul>
        <button onClick={ () => {alert("El gmial actual es: " + gmail);} }> Ver el gmail </button>
      </div>
    </div>
  );
};

export default VerCompras;
