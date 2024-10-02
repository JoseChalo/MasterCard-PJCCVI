import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesCSS/Login.css';
import logo from '../images/logoMastercard.png';

import { gmailUser } from './gmailUserContext.js';

const Login = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setGmailCurrent } = useContext(gmailUser);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3001/user/${gmail}`);
      const userData = response.data[0];
      
      if (userData && userData.contra === password) {
        console.log('Inicio de sesión exitoso');
        
        // Almacenar el token de autenticación en localStorage
        localStorage.setItem('authToken', 'your-auth-token');
        
        // Navegar a la página protegida
        setGmailCurrent(gmail);
        navigate('/home');
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
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Mastercard Logo" className="logo"/>
      </div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <h3 className="inicio">Iniciar Sesión</h3>

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

        <div className="button-container">
          <Button type="submit" className="login-btn buttonColor">
            Ingresar
          </Button>
        </div>

        <div className="login-links mt-3 d-flex justify-content-between">
          <Link to="/register" className="text-muted">Crear Usuario</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
