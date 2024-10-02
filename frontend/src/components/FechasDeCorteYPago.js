import React from 'react';
import '../stylesCSS/FechasDeCorteYPago.css';
import Navbar from '../components/Navbar';

const FechasDeCorteYPago = () => {
  const fechaCorte = '15 de cada mes';
  const fechaPago = '30 de cada mes';

  return (
    <div>
      <Navbar /> {/* Coloca el Navbar fuera del contenido principal */}
      <div className="fechas-container">
        <h1>Sus Fechas de Corte y Pago Son:</h1>
        <p><strong>Fecha de corte:</strong> {fechaCorte}</p>
        <p><strong>Fecha de pago:</strong> {fechaPago}</p>
      </div>
    </div>
  );
};

export default FechasDeCorteYPago;
