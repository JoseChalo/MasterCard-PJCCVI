import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import '../stylesCSS/Tarjetas.css'; // Importa el archivo CSS para estilos personalizados

function Tarjetas() {
  const [tarjetas, setTarjetas] = useState([]);

  // Simulación de datos traídos desde un backend
  useEffect(() => {
    axios.get('http://localhost:3001/tarjetas')
      .then(response => setTarjetas(response.data))
      .catch(error => console.error('Error al obtener tarjetas:', error));
  }, []);

  return (
    <div className="tarjetas-container">
      <div className="gif-container">
        <img 
          src="https://v2.cimg.co/news/113405/274473/adobestock-502295882-edit.jpeg"  
          className="gif-image" // Clase correcta
          alt="Descripción de la tarjeta" // Asegúrate de agregar un alt
        />
      </div>
      <h1 className="title">Tus Tarjetas</h1>
      <Accordion>
        {tarjetas.map((tarjeta, index) => (
          <Accordion.Item eventKey={index.toString()} key={tarjeta.id}>
            <Accordion.Header>
              Tarjeta {tarjeta.ultimosDigitos} - {tarjeta.nombre}
            </Accordion.Header>
            <Accordion.Body>
              <p>Fecha de Vencimiento: {tarjeta.fechaVencimiento}</p>
              <p>Nombre: {tarjeta.nombre}</p>
              <p>Últimos 4 Dígitos: {tarjeta.ultimosDigitos}</p>
              <Link to="/compras">Ver más detalles</Link> {/* Enlace a ver detalles */}
            </Accordion.Body>
          </Accordion.Item>
        ))}
        {/* Ejemplo de una tarjeta estática si no hay datos */}
        {tarjetas.length === 0 && (
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Tarjeta Ejemplo - 1234
            </Accordion.Header>
            <Accordion.Body>
              <p>Fecha de Vencimiento: 12/25</p>
              <p>Nombre: Tarjeta de Ejemplo</p>
              <p>Últimos 4 Dígitos: 1234</p>
              <Link to="/compras">Ver más detalles</Link>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
    </div>
  );
}

export default Tarjetas;