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

  // Obtenemos el correo del usuario usando el contexto
  const { gmail } = useContext(gmailUser); 

  useEffect(() => {
    if (gmail) { // Asegúrate de que el correo esté disponible
      axios.get(`http://localhost:3001/tarjetas/user/${gmail}`)
        .then(response => {
          setTarjetas(response.data);
          setLoading(false); // Una vez que cargan las tarjetas, deja de mostrar el loader
        })
        .catch(error => {
          console.error('Error al obtener tarjetas:', error);
          setLoading(false); // Manejar errores
        });
    }
  }, [gmail]); // El efecto depende del correo

  if (loading) {
    return <p>Cargando tarjetas...</p>;
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
        <h1 className="title">Tus Tarjetas</h1>
        <Accordion>
          {tarjetas.map((tarjeta, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                Tarjeta {tarjeta.ultimosDigitos} - {tarjeta.nombre}
              </Accordion.Header>
              <Accordion.Body>
                <p>Fecha de Vencimiento: {tarjeta.fechaVencimiento}</p>
                <p>Nombre: {tarjeta.nombre}</p>
                <p>Numeracion de la tarjeta: {tarjeta.ultimosDigitos}</p>
                <Link to="/compras">Ver más detalles</Link>
              </Accordion.Body>
            </Accordion.Item>
          ))}
          {tarjetas.length === 0 && (
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                No tienes tarjetas registradas
              </Accordion.Header>
              <Accordion.Body>
                <p>Por favor, registra una tarjeta.</p>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </div>
  );
}

export default Tarjetas;
