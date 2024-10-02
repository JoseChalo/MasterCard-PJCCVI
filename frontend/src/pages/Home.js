// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ControlledCarousel from '../components/Carousel';
import axios from 'axios';
import '../stylesCSS/Home.css';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Pagar from '../components/Pagar';
//import VerCompras from '../components/VerCompras';
//import FechasDeCorteYPago from '../components/FechasDeCorteYPago';
//import Tarjetas from '../components/Tarjetas';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <h1>Bienvenido a la Página Principal</h1>
      <ControlledCarousel />
      {}
    </div>
  );
};

export default Home;