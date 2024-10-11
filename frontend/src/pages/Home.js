import React from 'react';
import Navbar from '../components/Navbar';
import ControlledCarousel from '../components/Carousel';
import '../stylesCSS/Home.css';


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />  
      <ControlledCarousel />
    </div>
  );
};

export default Home;