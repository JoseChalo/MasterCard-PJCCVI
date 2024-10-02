import React, { useState } from 'react';
import '../stylesCSS/Pagar.css';
import Navbar from '../components/Navbar';

const Pagar = () => {
  const [monto, setMonto] = useState('');

  const manejarPago = (e) => {
    e.preventDefault();
    alert(`Se ha realizado un pago de Q${monto}`);
    setMonto('');
  };

  return (
    <div>
      <Navbar /> {/* Asegúrate que el Navbar esté fuera del contenido */}
      <div className="pagar-container">
        <h1>Realizar Pago</h1>
        <form onSubmit={manejarPago}>
          <label>
            Monto a pagar:
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
            />
          </label>
          <button type="submit">Pagar</button>
        </form>
      </div>
    </div>
  );
};

export default Pagar;
