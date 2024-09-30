import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../stylesCSS/Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardNumber = '5' + Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0');
    const targetType = "Mastercard";
    const expirationDate = `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}/${Math.floor(Math.random() * 5 + 25)}`;
    const securityCode = Math.floor(Math.random() * 900 + 100);
    const authorizedAmount = 5000;
    const availableAmount = 5000;

    setGeneratedCard({
      cardNumber,
      name,
      targetType,
      expirationDate,
      securityCode,
      authorizedAmount,
      availableAmount,
    });
  };

  const isFormValid = () => {
    return name && email && password && termsAccepted;
  };

  return (
    <div className="register-container">
      <div className="form-side">
        <Form onSubmit={handleSubmit} className="form-card">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Gmail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Acepto los términos y condiciones" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between">
            <Button 
              variant="primary" 
              type="submit" 
              className="buttonColor" 
              disabled={!isFormValid()}
            >
              Crear cuenta
            </Button>

            <Button
              variant="secondary"
              className="buttonColor"
              onClick={() => window.history.back()}
            >
              Regresar
            </Button>
          </Form.Group>

        </Form>
      </div>

      {generatedCard && (
        <div className="card-side">
          <Card className="card-front">
            <Card.Body>
              <div className="card-details">
              <p>{}</p>
                <p>{generatedCard.cardNumber}</p>
                <p>{generatedCard.expirationDate}</p>
                <p>{generatedCard.name}</p>
              </div>
            </Card.Body>
          </Card>

          <Card className="card-back mt-3">
            <Card.Body>
              <div className="card-details">
                <p>{}</p>
                <p>Código de Seguridad: {generatedCard.securityCode}</p>
                <p>Monto Autorizado: {generatedCard.authorizedAmount}</p>
                <p>Monto Disponible: {generatedCard.availableAmount}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Register;