import React from 'react';
import '../stylesCSS/Promociones.css'; // Importar el archivo CSS específico

const Promociones = () => {
  const promociones = [
    { id: 1, descripcion: '3 meses sin intereses en tiendas participantes' },
    { id: 2, descripcion: '10% de descuento en tu primera compra' }
  ];

  return (
    <div className="Promos">
      <h2>Promociones</h2>
      <ul>
        {promociones.map((promo) => (
          <li key={promo.id}>{promo.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Promociones;
