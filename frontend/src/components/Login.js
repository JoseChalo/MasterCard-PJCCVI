import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; 
import '../stylesCSS/Login.css';
import logo from '../images/logoMastercard.png';

// Definir el componente Login
const Login = () => {
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar lógica de autenticación después
    navigate('/Home');
  };

  return (
    <div className="login-container"> {/* Contenedor principal del formulario de inicio de sesión */}
      <div className="login-logo">
        <img src={logo} alt="Mastercard Logo" className="logo"/>
      </div>
      <Form className="login-form" onSubmit={handleSubmit}> {/* Formulario de inicio de sesión */}
        <h3 className="inicio">Iniciar Sesión</h3>

        {/* Grupo para el campo de usuario */}
        <Form.Group className="mb-3 inline-form-group1" controlId="formBasicUser">
          <Form.Label>Usuario </Form.Label>
          <Form.Control type="text" placeholder="Correo electrónico" />
        </Form.Group>

        {/* Grupo para el campo de contraseña */}
        <Form.Group className="mb-3 inline-form-group2" controlId="formBasicPassword">
          <Form.Label>Contraseña </Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>

        {/* Contenedor para el botón de ingreso */}
        <div className="button-container">
          <Button type="submit" className="login-btn buttonColor">
            Ingresar
          </Button>
        </div>

        {/* Enlaces para crear usuario y reestablecer contraseña */}
        <div className="login-links mt-3 d-flex justify-content-between">
          <Link to="/register" className="text-muted">Crear Usuario</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;