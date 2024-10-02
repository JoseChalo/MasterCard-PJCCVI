import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesCSS/Login.css';
import logo from '../images/logoMastercard.png';

// Definir el componente Login
const Login = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Realizar la petición GET al backend
      const response = await axios.get(`http://localhost:3001/user/${gmail}`);
      const userData = response.data[0];
      
      if (userData && userData.contra === password) {
        console.log('Inicio de sesión exitoso');
        navigate('/Home');
      } else {
        alert('Contraseña incorrecta');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert('Usuario no encontrado');
        } else {
          alert(`Error: ${error.response.data}`);
        }
      } else {
        console.error('Error en la solicitud:', error.message);
        alert('Error al iniciar sesión');
      }
    }
  };

  return (
    <div className="login-container">  {/* Contenedor principal del formulario de inicio de sesión */}
      <div className="login-logo">
        <img src={logo} alt="Mastercard Logo" className="logo"/>
      </div>
      <Form className="login-form" onSubmit={handleSubmit}> {/* Formulario de inicio de sesión */}
        <h3 className="inicio">Iniciar Sesión</h3>

        {/* Grupo para el campo de usuario */}
        <Form.Group className="mb-3 inline-form-group1" controlId="formBasicUser">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Grupo para el campo de contraseña */}
        <Form.Group className="mb-3 inline-form-group2" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Botón para iniciar sesión */}
        <div className="button-container">
          <Button type="submit" className="login-btn buttonColor">
            Ingresar
          </Button>
        </div>

        {/* Enlace para crear usuario*/}
        <div className="login-links mt-3 d-flex justify-content-between">
          <Link to="/register" className="text-muted">Crear Usuario</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;