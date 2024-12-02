import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Historialesviews() {
  const [historiales, setHistoriales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoriales = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/historiales_medicos/');
        setHistoriales(response.data);
      } catch (error) {
        console.error('Error al obtener los historiales médicos:', error);
      }
    };

    fetchHistoriales();
  }, []);

  const handleEdit = (historial) => {
    navigate('/historiales', { state: { historial } });
  };

  const handleDelete = async (idHistorial) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este historial médico?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/historiales_medicos/${idHistorial}/`);
        alert('Historial médico eliminado con éxito');
        window.location.reload(); // Recarga la página para mostrar la lista actualizada
      } catch (error) {
        console.error('Error al eliminar el historial médico:', error);
        alert('Hubo un error al eliminar el historial médico');
      }
    }
  };

  const handleRegister = () => {
    navigate('/historiales');
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
      <button style={buttonStyle} onClick={handleRegister}>Registrar Historial Médico</button>
      <div style={cardContainerStyle}>
        {historiales.map((historial) => (
          <div key={historial.id} style={cardStyle}>
            <h3>Historial Médico</h3>
            <p><strong>Antecedentes:</strong> {historial.antecedentes}</p>
            <p><strong>Alergias:</strong> {historial.alergias}</p>
            <p><strong>Notas:</strong> {historial.notas}</p>
            <button onClick={() => handleEdit(historial)}>Editar</button>
            <button onClick={() => handleDelete(historial.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}