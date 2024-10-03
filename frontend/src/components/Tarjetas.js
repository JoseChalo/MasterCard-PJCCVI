import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../stylesCSS/Tarjetas.css';
import Navbar from '../components/Navbar';
import { gmailUser } from './gmailUserContext.js'; // Importamos el contexto

function Tarjetas() {
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { gmail } = useContext(gmailUser); // Obtenemos el correo del usuario

  useEffect(() => {
    if (gmail) {
      axios.get(`http://localhost:3001/tarjetas/user/${gmail}`)
        .then(response => {
          setTarjetas(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener tarjetas:', error);
          setLoading(false); // Manejar errores
        });
    }
  }, [gmail]);

  if (loading) {
    return <p className="loading-text">Cargando tarjetas...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="tarjetas-container">
        <div className="gif-container">
          <img 
            src="https://v2.cimg.co/news/113405/274473/adobestock-502295882-edit.jpeg"  
            className="gif-image"
            alt="Descripción de la tarjeta"
          />
        </div>
        <h2 className="title">Tus Tarjetas</h2>
        {tarjetas.length > 0 ? (
          <Accordion>
            {tarjetas.map((tarjeta, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  Tarjeta {tarjeta.ultimosDigitos} - {tarjeta.nombre}
                </Accordion.Header>
                <Accordion.Body>
                  <p>Fecha de Vencimiento: {tarjeta.fechaVencimiento}</p>
                  <p>Nombre: {tarjeta.nombre}</p>
                  <p>Numeración de la tarjeta: {tarjeta.ultimosDigitos}</p>
                  <Link to="/compras" className="details-link">Ver más detalles</Link>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p>No tienes tarjetas registradas. Por favor, registra una tarjeta.</p>
        )}
      </div>
    </div>
  );
}

export default Tarjetas;