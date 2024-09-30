import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const slides = [
    {
      id: 1,
      src: 'https://ak.picdn.net/shutterstock/videos/13989107/thumb/1.jpg',
      url: '/pagar',
      alt: 'Pagos',
    },
    {
      id: 2,
      src: 'https://sun9-37.userapi.com/impf/Gf9mVv8SA9LklW5CfwwC-tA_NkP4FQFh3O_Atw/u4RoFeYD_wo.jpg?size=1920x768&quality=95&crop=0,131,1600,639&sign=964dd3dfae666a326cdd690788550670&type=cover_grou',
      url: '/compras',
      alt: 'Compras',
    },
    {
      id: 3,
      src: 'https://www.plus.ac.at/wp-content/uploads/2021/10/iStock-1313433542_2021-10-11_Doucefleur_WEB-scaled.jpg',
      url: '/fechas',
      alt: 'Fechas',
    }
  ];

  return (
    <div style={{ display: 'block', width: '70%', margin: '0 auto', padding: '20px' }}> {/* Ajusta el tamaño del contenedor */}
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
        {slides.map(slide => (
          <Carousel.Item key={slide.id}>
            <div style={{ position: 'relative' }}>
              <img
                className="d-block w-100"
                src={slide.src}
                alt={slide.alt}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}  // Imagen más pequeña
              />
              <Link
                to={slide.url}
                style={{
                  position: 'absolute',
                  top: '60%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '10px 20px', // Botón más pequeño
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',  // Texto más pequeño
                  fontWeight: 'bold',
                  zIndex: 1
                }}
              >
                Ver más
              </Link>
            </div>
            <Carousel.Caption>
              <h4>{slide.alt}</h4> {/* Texto más pequeño */}
              <p>Explora nuestras opciones de {slide.alt}.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;