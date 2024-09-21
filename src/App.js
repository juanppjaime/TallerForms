import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({
    emailState: true,
    passwordState: true,
  });

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormValues({ ...formValues, password: password });
    
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/.test(password);
    setValidationStates({ ...validationStates, passwordState: validPassword });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const clickSubmit = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email);
    setValidationStates({ ...validationStates, emailState: emailValid });

    if (emailValid && validationStates.passwordState) {
      alert(JSON.stringify(formValues));
    }
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={formValues.email}
            isInvalid={!validationStates.emailState}
          />
          {!validationStates.emailState && (
            <Form.Text className="text-muted" style={{ color: "red" }}>
              Por favor ingresa un correo válido.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
            isInvalid={!validationStates.passwordState}
          />
          {!validationStates.passwordState && (
            <Form.Text className="text-muted" style={{ color: "red" }}>
              La contraseña debe tener números, letras y al menos 9 caracteres.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
