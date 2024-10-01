import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../stylesCSS/Register.css';

// Definir el componente Register
function Register() {
  // Declaración de los estados necesarios para el formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Generación de número de tarjeta aleatorio y otros datos de la tarjeta
    const cardNumber = '5' + Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0');
    const targetType = "credito";
    const expirationDate = `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}/${Math.floor(Math.random() * 5 + 25)}`;
    const securityCode = Math.floor(Math.random() * 900 + 100).toString();
    const authorizedAmount = 5000;
    const availableAmount = 5000;

    // Establecer la tarjeta generada en el estado
    setGeneratedCard({
      cardNumber,
      name,
      targetType,
      expirationDate,
      securityCode,
      authorizedAmount,
      availableAmount,
    });

    // Crear el objeto que se va a enviar como JSON
    const userData = {
      gmail: email,
      contra: password,
      nombre: name,
      numero: cardNumber,
      titular: name,
      tipo: targetType,
      fecha_venc: expirationDate,
      num_seguridad: securityCode,
      monto_autorizado: authorizedAmount,
      monto_disponible: availableAmount
    };

    try {
      // Realizar la petición POST al backend
      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Convertir el objeto a JSON
      });

      if (response.ok) {
        // Si la respuesta es exitosa, puedes manejar la respuesta aquí
        const result = await response.json();
        console.log('Usuario creado:', result);
      } else {
        // Manejar errores del servidor
        console.error('Error al crear usuario:', response.status);
      }
    } catch (error) {
      // Manejar errores de red o del fetch
      console.error('Error en la conexión:', error);
    }

    
    
  };

  // Función para validar el formulario
  const isFormValid = () => {
    return name && email && password && termsAccepted;
  };

  return (
    <div className="register-container"> {/* Contenedor principal del formulario de registro */}
      <div className="form-side">
        <Form onSubmit={handleSubmit} className="form-card"> {/* Formulario para registrar una nueva cuenta */}

          {/* Grupo para el campo de nombre */}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)} // Actualiza el estado con el valor ingresado
            />
          </Form.Group>

          {/* Grupo para el campo de correo electrónico */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Gmail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado con el valor ingresado
            />
          </Form.Group>

          {/* Grupo para el campo de contraseña */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado con el valor ingresado
            />
          </Form.Group>

          {/* Grupo para aceptar los términos y condiciones */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Acepto los términos y condiciones" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)} // Actualiza el estado con el valor ingresado
            />
          </Form.Group>

          {/* Grupo para los botones de acción */}
          <Form.Group className="mb-3 d-flex justify-content-between">
            <Button 
              variant="primary" 
              type="submit" 
              className="buttonColor" 
              disabled={!isFormValid()} // Desactiva el botón si el formulario no es válido
            >
              Crear cuenta
            </Button>

            <Button
              variant="secondary"
              className="buttonColor"
              onClick={() => window.history.back()} // Regresa a la página anterior
            >
              Regresar
            </Button>
          </Form.Group>

        </Form>
      </div>

      {/* Si se generó una tarjeta, mostrar los detalles*/}
      {generatedCard && ( 
        <div className="card-side">
          <Card className="card-front">
            <Card.Body>
              <div className="card-details">
                <p>{}</p> {/* Espacio para que no aparezca texto hasta arriba de la imagen de la tarjeta xd */}
                <p>{generatedCard.cardNumber}</p> {/* Muestra el número de tarjeta */}
                <p>{generatedCard.expirationDate}</p> {/* Muestra la fecha de expiración */}
                <p>{generatedCard.name}</p> {/* Muestra el nombre del titular */}
              </div>
            </Card.Body>
          </Card>

          <Card className="card-back mt-3">
            <Card.Body>
              <div className="card-details">
                <p>{}</p> {/* Espacio para que no aparezca hasta arriba de la imagen de la tarjeta xd */}
                <p>Código de Seguridad: {generatedCard.securityCode}</p> {/* Muestra el código de seguridad */}
                <p>Monto Autorizado: {generatedCard.authorizedAmount}</p> {/* Muestra el monto autorizado */}
                <p>Monto Disponible: {generatedCard.availableAmount}</p> {/* Muestra el monto disponible */}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Register;
