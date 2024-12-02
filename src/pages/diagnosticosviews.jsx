import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Diagnosticosviews() {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiagnosticos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/diagnosticos/');
        setDiagnosticos(response.data);
      } catch (error) {
        console.error('Error al obtener los diagnósticos:', error);
      }
    };

    fetchDiagnosticos();
  }, []);

  const handleEdit = (diagnostico) => {
    navigate('/diagnosticos', { state: { diagnostico } });
  };

  const handleDelete = async (idDiagnostico) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este diagnóstico?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/diagnosticos/${idDiagnostico}/`);
        alert('Diagnóstico eliminado con éxito');
        window.location.reload(); // Recarga la página para mostrar la lista actualizada
      } catch (error) {
        console.error('Error al eliminar el diagnóstico:', error);
        alert('Hubo un error al eliminar el diagnóstico');
      }
    }
  };

  const handleRegister = () => {
    navigate('/diagnosticos');
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
      <button style={buttonStyle} onClick={handleRegister}>Registrar Diagnóstico</button>
      <div style={cardContainerStyle}>
        {diagnosticos.map((diagnostico) => (
          <div key={diagnostico.id} style={cardStyle}>
            <h3>Diagnóstico</h3>
            <p>{diagnostico.descripcion}</p>
            <button onClick={() => handleEdit(diagnostico)}>Editar</button>
            <button onClick={() => handleDelete(diagnostico.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}