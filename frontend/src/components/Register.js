import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../stylesCSS/Register.css';
import ipConfig from '../ipConfig.js';

// Definir el componente Register
function Register() {
  // Declaración de los estados necesarios para el formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

 // Función para generar una tarjeta aleatoria
const generateCard = () => {
  const cardNumber = '5' + Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0');
  const targetType = "credito";

  const month = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
  const currentYear = new Date().getFullYear();
  const year = Math.floor(Math.random() * 5 + currentYear + 1); // Genera un año desde el año actual + 1 a 5 años en el futuro
  const expirationDate = `${year}-${month}-31`; // Formato completo YYYY-MM-DD

  const securityCode = Math.floor(Math.random() * 900 + 100).toString();
  const authorizedAmount = 5000;
  const availableAmount = 5000;

  return {
      cardNumber,
      name,
      targetType,
      expirationDate,
      securityCode,
      authorizedAmount,
      availableAmount,
  };
};


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generar la tarjeta aleatoria
    let cardData = generateCard();

    // Desactivar el botón y los campos de entrada
    setIsButtonDisabled(true);

    // Crear el objeto que se va a enviar como JSON
    const userData = {
      gmail: email,
      contra: password,
      nombre: name,
      numero: cardData.cardNumber,
      titular: name,
      tipo: cardData.targetType,
      fecha_venc: cardData.expirationDate,
      num_seguridad: cardData.securityCode,
      monto_autorizado: cardData.authorizedAmount,
      monto_disponible: cardData.availableAmount
    };

    while (true) {
      try {
        // Realizar la petición POST al backend
        const response = await fetch(`${ipConfig.API_BASE_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData), // Convertir el objeto a JSON
        });
    
        if (response.ok) {
          // Si la respuesta es exitosa
          const result = await response.json();
          console.log('Usuario creado:', result);
          setGeneratedCard(cardData); // Guardar la tarjeta generada en el estado
          break;
        } else if (response.status === 409) {
          // Manejar el error 409: Conflicto, el correo o la tarjeta ya existen
          const result = await response.json();
          if (result.message.includes('correo')) {
            alert("El correo ya está registrado. Por favor, intenta con otro.");
          } else if (result.message.includes('tarjeta')) {
            console.warn("La tarjeta ya existe, generando una nueva tarjeta...");
            cardData = generateCard(); // Generar una nueva tarjeta
            userData.numero = cardData.cardNumber; // Actualizar el número de tarjeta en el objeto
          }
          setIsButtonDisabled(false); // Reactivar el botón y los campos
          break;
        } else {
          // Manejar otros errores del servidor
          console.error('Error al crear usuario:', response.status);
          alert("Ocurrió un error inesperado. Intenta nuevamente.");
          setIsButtonDisabled(false);
          break;
        }
      } catch (error) {
        // Manejar errores
        console.error('Error en la conexión:', error);
        alert("Error de conexión. Por favor, revisa tu conexión a internet.");
        setIsButtonDisabled(false); // Reactivar el botón
        break;
      }
    }
  };    

  // Función para validar el formulario
  const isFormValid = () => {
    return name && email && password && termsAccepted && !isButtonDisabled;
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
              disabled={isButtonDisabled}
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
              disabled={isButtonDisabled}
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
              disabled={isButtonDisabled}
            />
          </Form.Group>

          {/* Grupo para aceptar los términos y condiciones */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Acepto los términos y condiciones" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)} // Actualiza el estado con el valor ingresado
              disabled={isButtonDisabled}
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

      {/* Si se generó una tarjeta, mostrar los detalles */}
      {generatedCard && ( 
        <div className="card-side">
          <Card className="card-front">
            <Card.Body>
              <div className="card-details">
                <p>{}</p> {/* Espacio para que no aparezca texto hasta arriba de la imagen de la tarjeta */}
                <p>{generatedCard.cardNumber}</p> {/* Muestra el número de tarjeta */}
                <p>{`${generatedCard.expirationDate.split('-')[0].slice(-2)}/${generatedCard.expirationDate.split('-')[1]}`}</p> {/* Muestra la fecha de expiración en formato 25/06 */}
                <p>{generatedCard.name}</p> {/* Muestra el nombre del titular */}
              </div>
            </Card.Body>
          </Card>

          <Card className="card-back mt-3">
            <Card.Body>
              <div className="card-details">
                <p>{}</p> {/* Espacio para que no aparezca hasta arriba de la imagen de la tarjeta */}
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