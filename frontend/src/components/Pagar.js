import React, { useState } from 'react';
import '../stylesCSS/Pagar.css';
import Navbar from '../components/Navbar';

const Pagar = () => {
  const [monto, setMonto] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');

  const manejarPago = (e) => {
    e.preventDefault();
    alert(`Se ha realizado un pago de Q${monto} con la tarjeta ${numeroTarjeta}`);
    setMonto('');
    setNumeroTarjeta('');
  };

  return (
    <div>
      <Navbar /> {/* Navbar manteniéndose en la parte superior */}
      <div className="pagar-container">
        <div className="pagar-card">
          <h1 className="pagar-title">Realizar Pago</h1>
          <form onSubmit={manejarPago}>
            <label className="pagar-label">
              Número de Tarjeta:
              <input
                type="text"
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value)}
                className="pagar-input"
                placeholder="Ingrese el número de la tarjeta"
                required
              />
            </label>
            <label className="pagar-label">
              Monto a pagar:
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="pagar-input"
                placeholder="Ingrese el monto"
                required
              />
            </label>
            <div className="pagar-btn-container">
              <button type="submit" className="pagar-btn">Pagar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pagar;