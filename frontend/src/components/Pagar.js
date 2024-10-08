import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import '../stylesCSS/Pagar.css';
import Navbar from '../components/Navbar';
import { gmailUser } from './gmailUserContext.js';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Pagar = () => {
  const [monto, setMonto] = useState(''); // Monto a pagar
  const [montoD, setMontoD] = useState(0); // Monto disponible
  const [montoA, setMontoA] = useState(0); // Monto autorizado
  const [numeroTarjeta, setNumeroTarjeta] = useState(''); // Número de tarjeta
  const [mensaje, setMensaje] = useState(''); // Mensaje para el usuario
  const { gmail } = useContext(gmailUser);
  const gmailBuscar = gmail;

  const fetchTarjetaData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/tarjetas/user/${gmailBuscar}`);
      setMontoD(response.data[0].monto_disponible);
      setMontoA(response.data[0].monto_autorizado);
    } catch (error) {
      alert('Error: No se encontró la tarjeta o hubo un problema con las transacciones');
    }
  };

  useEffect(() => {
    if (gmailBuscar) {
      fetchTarjetaData();
    }
  }, [gmailBuscar, fetchTarjetaData]);
  

  const manejarPago = async (e) => {
    e.preventDefault();

    const montoNumerico = parseFloat(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      setMensaje('Por favor, ingresa un monto válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/pagar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numero: numeroTarjeta.trim(),
          monto: montoNumerico,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(data.Mensaje);
        setMonto('');
        setNumeroTarjeta('');
        // Actualizar montos después del pago exitoso
        fetchTarjetaData();
      } else {
        const errorData = await response.json();
        setMensaje(errorData.Mensaje || 'Error al realizar el pago. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error de conexión. Verifica tu conexión e intenta nuevamente.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pagar-main-container">
        <div className="pagar-card">
          <h2 className="title">Realizar Pago</h2>
          <form onSubmit={manejarPago}>
            <div className="input-container">
              <span className="input-label">N:</span>
              <input
                type="text"
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value)}
                className="pagar-input numero-tarjeta-input"
                placeholder="Número de tarjeta"
                required
                pattern="\d{16}"
                title="El número de tarjeta debe tener 16 dígitos."
              />
            </div>
            <div className="monto-input-container">
              <span className="currency-symbol">Q.</span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="monto-input"
                placeholder="Monto a pagar"
                step="0.01"
                required
                min="0.01"
                title="El monto debe ser mayor que 0."
              />
            </div>
            <div className="button-container">
              <span className="button-symbol">B:</span>
              <button type="submit" className="pagar-btn">Pagar</button>
            </div>
          </form>
          {mensaje && <p className="pagar-mensaje">{mensaje}</p>}

          {/* Muestra los montos disponibles y autorizados */}
          <div className="info-section">
            <h3 className="title">Datos de tarjeta</h3>
            <Container>
              <Row>
                <Col>Monto disponible: Q{montoD.toFixed(2)}</Col>
                <Col>Monto autorizado: Q{montoA.toFixed(2)}</Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagar;