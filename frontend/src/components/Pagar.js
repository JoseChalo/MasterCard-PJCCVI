import React, { useState } from 'react';
import '../stylesCSS/Pagar.css';

const Pagar = () => {
  const [monto, setMonto] = useState('');

  const manejarPago = (e) => {
    e.preventDefault();
    alert(`Se ha realizado un pago de $${monto}`);
    setMonto('');
  };

  return (
    <div className="pagar-container">
      <h2>Realizar Pago</h2>
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
  );
};

export default Pagar;