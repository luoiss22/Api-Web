import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Pacientesviews() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pacientes/');
        setPacientes(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleEdit = (paciente) => {
    navigate('/pacientes', { state: { paciente } });
  };

  const handleDelete = async (idPaciente) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este paciente?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/pacientes/${idPaciente}/`);
        alert('Paciente eliminado con éxito');
        window.location.reload(); // Recarga la página para mostrar la lista actualizada
      } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        alert('Hubo un error al eliminar el paciente');
      }
    }
  };

  const handleRegister = () => {
    navigate('/pacientes');
  };

  const buttonStyle = {
    backgroundColor: '#87CEEB',
    color: 'white',
    padding: '10px 20px',
    margin: '20px 0',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    alignSelf: 'center', // Centra el botón horizontalmente
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center', // Alinea los elementos en el centro del contenedor
    alignItems: 'center',
    paddingBottom: '20px', // Añade un padding inferior para separar el botón del borde
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleRegister}>Registrar Paciente</button>
      <div style={cardContainerStyle}>
        {pacientes.map((paciente) => (
          <div key={paciente.idPaciente} style={cardStyle}>
            <h3>{paciente.nombreCompleto}</h3>
            <p><strong>Edad:</strong> {paciente.edad}</p>
            <p><strong>Fecha de Nacimiento:</strong> {paciente.fechaNac}</p>
            <button onClick={() => handleEdit(paciente)}>Editar</button>
            <button onClick={() => handleDelete(paciente.idPaciente)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}