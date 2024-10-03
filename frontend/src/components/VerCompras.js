import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useContext, useEffect, useState } from 'react';
import '../stylesCSS/VerCompras.css';
import Navbar from '../components/Navbar';
import { gmailUser } from './gmailUserContext.js';
import axios from 'axios';

const VerCompras = () => {
  const [compras, setCompras] = useState([]);
  const [montoActual, setMontoActual] = useState(0);
  const [totalConsumos, setTotalConsumos] = useState(0);
  
  const { gmail } = useContext(gmailUser);
  const gmailBuscar = gmail;

  useEffect(() => {
    const fetchTarjetaData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tarjetas/user/${gmailBuscar}`);
        const ultimosDigitos = response.data[0].ultimosDigitos;
        setMontoActual(response.data[0].monto_disponible);
  
        const transaccionesResponse = await axios.get(`http://localhost:3001/transacciones/${ultimosDigitos}`);
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

          if(transaccion.tipo.trim() === 'consumo') {
            sumaTotalConsumos += transaccion.monto
          }
        });

        setTotalConsumos(sumaTotalConsumos);
        
      } catch (error) {
        alert('Error: No se encontró la tarjeta o hubo un problema con las transacciones');
      }
    };
  
    if (gmailBuscar) {
      fetchTarjetaData();
    }
  }, [gmailBuscar]);
  
  
  return (
    <div>
      <Navbar />
      <div className="compras-container">
        <h2 className="compras-title">Compras Realizadas</h2>
        <ul className="compras-list">
          {compras.map((compra) => (
            <li key={compra.id} className="compra-item">
              <span className="compra-numero">{compra.numero}</span>
              <span className="compra-tipo">{compra.tipo}</span>
              <span className="compra-proveniente">{compra.proveniente}</span> 
              <span className="compra-monto">Q{compra.monto}</span>
              <span className="compra-fecha">{compra.fecha}</span>
            </li>
          ))}
        </ul>
        <Container>
          <Row>
            <Col>Consumos realizados: Q{ totalConsumos }</Col>
            <Col>Monto disponible: Q{ montoActual }</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default VerCompras;
