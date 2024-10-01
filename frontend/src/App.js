import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Pagar from './Pagar';
import VerCompras from './VerCompras';
import FechasDeCorteYPago from './FechasDeCorteYPago';
import Promociones from './Promociones';
import ControlledCarousel from './Carousel'; // Usa el nuevo carrusel
import axios from 'axios';
import Tarjetas from './Tarjetas';
import './App.css';

// Define el componente Home para la página principal
const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Página Principal</h1>
      <ControlledCarousel /> {/* Muestra el nuevo carrusel */}
    </div>
  );
};

function App() {
  const [items, setItems] = useState([]);  // Estado para los ítems
  const [newItem, setNewItem] = useState('');  // Estado para el nuevo ítem

  // Obtener los ítems desde el backend al cargar la página
  useEffect(() => {
    axios.get('http://localhost:3001/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  // Función para agregar un nuevo ítem
  const addItem = () => {
    axios.post('http://localhost:3001/items', { name: newItem })
      .then(() => {
        setItems([...items, { name: newItem }]); // Agregar el nuevo ítem al estado
        setNewItem(''); // Limpiar el campo de entrada
      })
      .catch(error => console.error('Error al agregar el ítem:', error));
  };

  return (
    <Router>
      <div className="INFO">
        <Navbar /> {/* Navbar para navegar entre las rutas */}
        
        {/* Definir las rutas */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página principal con carrusel */}
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/compras" element={<VerCompras items={items} />} /> {/* Pasamos los ítems a VerCompras */}
          <Route path="/fechas" element={<FechasDeCorteYPago />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/tarjetas" element={<Tarjetas />} /> {/* Nueva ruta para Tarjetas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
