import React from 'react';
import '../stylesCSS/FechasDeCorteYPago.css'; // Importar el archivo CSS específico

const FechasDeCorteYPago = () => {
  const fechaCorte = '15 de cada mes';
  const fechaPago = '30 de cada mes';

  return (
    <div className="fechas-container"> {/* Cambiar el nombre de la clase aquí */}
      <h2>Sus Fechas de Corte y Pago Son:</h2>
      <p><strong>Fecha de corte:</strong> {fechaCorte}</p>
      <p><strong>Fecha de pago:</strong> {fechaPago}</p>
    </div>
  );
};

export default FechasDeCorteYPago;
