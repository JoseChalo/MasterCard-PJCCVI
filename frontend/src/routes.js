import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import ForgotPassword from './pages/ForgotPassword';
import Login from './components/Login';
import Pagar from './components/Pagar';
import VerCompras from './components/VerCompras';
import FechasDeCorteYPago from './components/FechasDeCorteYPago';
import Tarjetas from './components/Tarjetas';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pagar" element={<Pagar />} />
        <Route path="/compras" element={<VerCompras />} />
        <Route path="/fechas" element={<FechasDeCorteYPago />} />
        <Route path="/tarjetas" element={<Tarjetas />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
