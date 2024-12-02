import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Tratamientosviews() {
  const [tratamientos, setTratamientos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTratamientos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tratamientos/');
        setTratamientos(response.data);
      } catch (error) {
        console.error('Error al obtener los tratamientos:', error);
      }
    };

    fetchTratamientos();
  }, []);

  const handleEdit = (tratamiento) => {
    navigate('/tratamientos', { state: { tratamiento } });
  };

  const handleDelete = async (idTratamiento) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este tratamiento?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/tratamientos/${idTratamiento}/`);
        alert('Tratamiento eliminado con éxito');
        window.location.reload(); // Recarga la página para mostrar la lista actualizada
      } catch (error) {
        console.error('Error al eliminar el tratamiento:', error);
        alert('Hubo un error al eliminar el tratamiento');
      }
    }
  };

  const handleRegister = () => {
    navigate('/tratamientos');
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
      <button style={buttonStyle} onClick={handleRegister}>Registrar Tratamiento</button>
      <div style={cardContainerStyle}>
        {tratamientos.map((tratamiento) => (
          <div key={tratamiento.id} style={cardStyle}>
            <h3>Tratamiento</h3>
            <p><strong>Descripción:</strong> {tratamiento.descripcion}</p>
            <p><strong>Duración:</strong> {tratamiento.duracion} días</p>
            <button onClick={() => handleEdit(tratamiento)}>Editar</button>
            <button onClick={() => handleDelete(tratamiento.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}