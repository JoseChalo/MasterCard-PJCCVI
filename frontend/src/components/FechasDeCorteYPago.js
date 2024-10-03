import React from 'react';
import '../stylesCSS/FechasDeCorteYPago.css';
import Navbar from '../components/Navbar';

const FechasDeCorteYPago = () => {
  const fechaCorte = '15 de cada mes';
  const fechaPago = '30 de cada mes';

  return (
    <div>
      <Navbar />
      <div className="fechas-container">
        <h2 className='title'>Fechas de Corte y Pago:</h2>
        <div className="fecha-item">
          <p><strong>Fecha de corte:</strong> {fechaCorte}</p>
        </div>
        <div className="fecha-item">
          <p><strong>Fecha de pago:</strong> {fechaPago}</p>
        </div>
      </div>
    </div>
  );
};

export default FechasDeCorteYPago;