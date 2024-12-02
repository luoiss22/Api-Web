import React from 'react';
import { Link } from 'react-router-dom';

export function Inicio() {
  const bodyStyle = {
    backgroundImage: 'url("./assets/dc1.png")', // Asegúrate de que la ruta de la imagen sea correcta
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '100vh',
    margin: 0,
    padding: 0,
  };

  const footerBarStyle = {
    backgroundColor: '#87CEEB',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    fontWeight: 'bold',
  };

  const greetingStyle = {
    textAlign: 'center',
    marginTop: '40px', // Espacio en la parte superior
    fontSize: '45px', // Aumenta el tamaño del texto
    fontWeight: 'bold', // Negrita
    color: '#87CEEB', // Color del texto
    textShadow: `
      -2px -2px 0 #FFF,  
      2px -2px 0 #FFF,
      -2px 2px 0 #FFF,
      2px 2px 0 #FFF`, // Borde blanco alrededor de cada letra
  };

  const subGreetingStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#87CEEB',
    color: 'white',
    padding: '20px 40px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  };

  return (
    <div style={bodyStyle}>
      <div style={greetingStyle}>
        BIENVENIDO AL SISTEMA<br />
      </div>

      <div style={subGreetingStyle}>
        {/* Puedes agregar un saludo dinámico aquí si es necesario */}
      </div>

      <div style={buttonContainerStyle}>
        <Link to="/pacientesviews" style={buttonStyle}>Pacientes</Link>
        <Link to="/citasviews" style={buttonStyle}>Citas</Link>
        <Link to="/medicosviews" style={buttonStyle}>Medicos</Link>
        <Link to="/diagnosticosviews" style={buttonStyle}>Diagnosticos</Link>
        <Link to="/historialesviews" style={buttonStyle}>Historiales</Link>
        <Link to="/medicamentosviews" style={buttonStyle}>Medicamentos</Link>
        <Link to="/recetasviews" style={buttonStyle}>Recetas</Link>
        <Link to="/tratamientosviews" style={buttonStyle}>Tratamientos</Link>
      </div>

      <div style={footerBarStyle}>
        CONSULTAS DE LUNES A VIERNES DE 10 A.M A 18 P.M Y FINES DE SEMANA DE 8 A.M A 11 A.M Y DE 14 P.M A 17 P.M
      </div>
    </div>
  );
}