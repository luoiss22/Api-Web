import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Medicosviews() {
  const [medicos, setMedicos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/medicos/');
        setMedicos(response.data);
      } catch (error) {
        console.error('Error al obtener los médicos:', error);
      }
    };

    fetchMedicos();
  }, []);

  const handleEdit = (medico) => {
    navigate('/medicos', { state: { medico } });
  };

  const handleDelete = async (idMedico) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este médico?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/medicos/${idMedico}/`);
        alert('Médico eliminado con éxito');
        window.location.reload(); // Recarga la página para mostrar la lista actualizada
      } catch (error) {
        console.error('Error al eliminar el médico:', error);
        alert('Hubo un error al eliminar el médico');
      }
    }
  };

  const handleRegister = () => {
    navigate('/medicos');
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
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20px',
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
      <button style={buttonStyle} onClick={handleRegister}>Registrar Médico</button>
      <div style={cardContainerStyle}>
        {medicos.map((medico) => (
          <div key={medico.idMedico} style={cardStyle}>
            <h3>{medico.nombreCompleto}</h3>
            <p><strong>Especialidad:</strong> {medico.especialidad}</p>
            <button onClick={() => handleEdit(medico)}>Editar</button>
            <button onClick={() => handleDelete(medico.idMedico)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
