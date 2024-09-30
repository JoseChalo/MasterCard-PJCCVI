import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../stylesCSS/Login.css';
import logo from '../images/logoMastercard.png';

const Login = () => {
  const navigate = useNavigate(); // Usar el hook useNavigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    // Aquí puedes agregar la lógica de autenticación si es necesario
    navigate('/Home'); // Redirigir a Home.js
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Mastercard Logo" className="logo"/>
      </div>
      <Form className="login-form" onSubmit={handleSubmit}> {/* Agregar onSubmit */}
        <h3 className="inicio">Iniciar Sesión</h3>

        <Form.Group className="mb-3 inline-form-group1" controlId="formBasicUser">
          <Form.Label>Usuario </Form.Label>
          <Form.Control type="text" placeholder="Usuario Mastercard" />
        </Form.Group>

        <Form.Group className="mb-3 inline-form-group2" controlId="formBasicPassword">
          <Form.Label>Contraseña </Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>

        <div className="button-container">
          <Button type="submit" className="login-btn buttonColor">
            Ingresar
          </Button>
        </div>

        <div className="login-links mt-3 d-flex justify-content-between">
          <Link to="/register" className="text-muted">Crear Usuario</Link>
          <Link to="/forgot-password" className="text-muted">Reestablecer contraseña</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;