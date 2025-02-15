import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useContext, useEffect, useState } from 'react';
import '../stylesCSS/VerCompras.css';
import Navbar from '../components/Navbar';
import { gmailUser } from './gmailUserContext.js';
import axios from 'axios';
import ipConfig from '../ipConfig.js';

const VerCompras = () => {
  const [compras, setCompras] = useState([]);
  const [montoActual, setMontoActual] = useState(0);
  const [totalConsumos, setTotalConsumos] = useState(0);
  
  const { gmail } = useContext(gmailUser);
  const gmailBuscar = gmail;

  const fetchTarjetaData = async () => {
    try {
      const response = await axios.get(`${ipConfig.API_BASE_URL}/tarjetas/user/${gmailBuscar}`);
      const ultimosDigitos = response.data[0].numero;
      setMontoActual(response.data[0].monto_disponible);

      const transaccionesResponse = await axios.get(`${ipConfig.API_BASE_URL}/transacciones/${ultimosDigitos}`);
      const transacciones = transaccionesResponse.data;

      setCompras([]); 
      let sumaTotalConsumos = 0;

      transacciones.forEach((transaccion, posicion) => {  
        setCompras(prevCompras => [
          ...prevCompras,
          {
            numero: `Transacción ${posicion + 1}: `,
            tipo: transaccion.tipo || 'Sin tipo',
            proveniente: transaccion.proveniente || 'Sin proveniente',
            monto: transaccion.monto || 'Sin monto',
            fecha: transaccion.fecha || 'Fecha no disponible'
          }
        ]);

        if (transaccion.tipo.trim() === 'consumo') {
          sumaTotalConsumos += transaccion.monto;
        }
      });

      setTotalConsumos(sumaTotalConsumos);
      
    } catch (error) {
      alert('Error: No se encontró la tarjeta o hubo un problema con las transacciones');
    }
  };

  useEffect(() => {
    if (gmailBuscar) {
      fetchTarjetaData();

      const intervalId = setInterval(() => {
        fetchTarjetaData();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [gmailBuscar]);

  return (
    <div>
      <Navbar />
      <div className="compras-container">
        <h2 className="compras-title">Compras Realizadas</h2>
        <ul className="compras-list">
          {compras.map((compra, index) => (
            <li key={index} className="compra-item">
              <span className="compra-numero">{compra.numero}</span>
              <span className="compra-tipo">{compra.tipo}</span>
              <span className="compra-proveniente">{compra.proveniente}</span> 
              <span className="compra-monto">Q{(compra.monto).toFixed(2)}</span>
              <span className="compra-fecha">{compra.fecha}</span>
            </li>
          ))}
        </ul>
        <Container>
          <Row>
            <Col>Consumos realizados: Q{totalConsumos.toFixed(2)}</Col>
            <Col>Monto disponible: Q{montoActual.toFixed(2)}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default VerCompras;

