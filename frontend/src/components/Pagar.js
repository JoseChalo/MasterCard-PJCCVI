import React, { useState } from 'react';
import '../stylesCSS/Pagar.css';
import Navbar from '../components/Navbar';

const Pagar = () => {
  const [monto, setMonto] = useState(''); // Monto a pagar
  const [numeroTarjeta, setNumeroTarjeta] = useState(''); // Número de tarjeta
  const [mensaje, setMensaje] = useState(''); // Mensaje para el usuario

  const manejarPago = async (e) => {
    e.preventDefault();
  
    // Convertimos el monto a número
    const montoNumerico = parseFloat(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      setMensaje('Por favor, ingresa un monto válido.');
      return;
    }
  
    try {
      // Enviamos los datos al servidor
      const response = await fetch('http://localhost:3001/pagar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numero: numeroTarjeta.trim(), // Eliminamos espacios en blanco
          monto: montoNumerico, // Enviamos el monto como número
        }),
      });
  
      // Comprobamos si la respuesta es correcta
      if (response.ok) {
        const data = await response.json();
        setMensaje(data.Mensaje); // Mensaje de éxito
        setMonto(''); // Reiniciamos el monto
        setNumeroTarjeta(''); // Reiniciamos el número de tarjeta
      } else {
        const errorData = await response.json(); // Obtenemos el mensaje de error
        setMensaje(errorData.Mensaje || 'Error al realizar el pago. Intenta nuevamente.'); // Mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud:', error); // Log del error
      setMensaje('Error de conexión. Verifica tu conexión e intenta nuevamente.'); // Mensaje general
    }
  };
  

  return (
    <div>
      <Navbar />
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
                pattern="\d{16}" // Valida que tenga 16 dígitos
                title="El número de tarjeta debe tener 16 dígitos."
              />
            </label>
            <label className="pagar-label">
              Monto a pagar:
              <div className="monto-input-container">
                <span className="currency-symbol">Q.</span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  className="pagar-input monto-input"
                  placeholder="Ingrese el monto"
                  step="0.01"
                  required
                  min="0.01" // Mínimo de 0.01
                  title="El monto debe ser mayor que 0."
                />
              </div>
            </label>
            <div className="pagar-btn-container">
              <button type="submit" className="pagar-btn">Pagar</button>
            </div>
          </form>
          {mensaje && <p className="pagar-mensaje">{mensaje}</p>} {/* Mensaje de éxito o error */}
        </div>
      </div>  
    </div>
  );
  
};

export default Pagar;