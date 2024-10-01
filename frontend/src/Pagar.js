import React, { useState } from 'react';
import './Pagar.css';

const Pagar = () => {
  const [monto, setMonto] = useState('');

  const manejarPago = (e) => {
    e.preventDefault();
    alert(`Se ha realizado un pago de Q${monto}`);
    setMonto('');
  };

  return (
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
  );
};

export default Pagar;
