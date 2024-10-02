import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Pagos from '../images/Pagos.webp';
import compras from '../images/compras.jpg';
import fechas from '../images/fechas.jpg';

import '../stylesCSS/Carousel.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const slides = [
    {
      id: 1,
      src: Pagos,
      url: '/pagar',
      alt: 'Pagos',
      caption: 'Explora nuestras opciones de pagos.',
    },
    {
      id: 2,
      src: compras,
      url: '/compras',
      alt: 'Compras',
      caption: 'Explora nuestras opciones para tus compras.',
    },
    {
      id: 3,
      src: fechas,
      url: '/fechas',
      alt: 'Fechas de corte',
      caption: 'Consulta las fechas de corte de tus tarjetas.',
    },
  ];

  return (
    <div style={{ display: 'block', width: '70%', margin: '0 auto', padding: '20px' }}>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
        {slides.map(slide => (
          <Carousel.Item key={slide.id}>
            <div style={{ position: 'relative' }}>
              <img
                className="d-block w-100"
                src={slide.src}
                alt={slide.alt}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </div>
            <Carousel.Caption>
              {/* Ahora todo el texto está envuelto en un solo Link */}
              <Link to={slide.url} style={{ color: 'white', textDecoration: 'none' }}>
                <div>
                  <h4>{slide.alt}</h4>
                  <p>{slide.caption}</p>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
