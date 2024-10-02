import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import ForgotPassword from './pages/ForgotPassword';
import Login from './components/Login';
import Pagar from './components/Pagar';
import VerCompras from './components/VerCompras';
import FechasDeCorteYPago from './components/FechasDeCorteYPago';
import Tarjetas from './components/Tarjetas';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => !!localStorage.getItem('authToken');

// Componente de ruta protegida
const ProtectedRoute = ({ element: Component }) => {
  return isAuthenticated() ? Component : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/pagar" element={<ProtectedRoute element={<Pagar />} />} />
        <Route path="/compras" element={<ProtectedRoute element={<VerCompras />} />} />
        <Route path="/fechas" element={<ProtectedRoute element={<FechasDeCorteYPago />} />} />
        <Route path="/tarjetas" element={<ProtectedRoute element={<Tarjetas />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
