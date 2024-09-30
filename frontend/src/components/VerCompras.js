// src/components/VerCompras.js
import React from 'react';

const VerCompras = () => {
  const compras = [
    { id: 1, descripcion: 'Compra en Supermercado', monto: 200 },
    { id: 2, descripcion: 'Compra en Tienda Electrónica', monto: 450 }
  ];

  return (
    <div>
      <h2>Compras Realizadas</h2>
      <ul>
        {compras.map((compra) => (
          <li key={compra.id}>
            {compra.descripcion} - ${compra.monto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerCompras;