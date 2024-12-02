import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Medicamentosviews() { // Cambia el nombre de la función a Medicamentosviews
  const [medicamentos, setMedicamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/medicamentos/');
        setMedicamentos(response.data);
      } catch (error) {
        console.error('Error al obtener los medicamentos:', error);
      }
    };

    fetchMedicamentos();
  }, []);

  const handleEdit = (medicamento) => {
    navigate('/medicamentos', { state: { medicamento } });
  };

  const handleDelete = async (idMedicamento) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este medicamento?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/medicamentos/${idMedicamento}/`);
        alert('Medicamento eliminado con éxito');
        window.location.reload(); // Recarga la página para mostrar la lista actualizada
      } catch (error) {
        console.error('Error al eliminar el medicamento:', error);
        alert('Hubo un error al eliminar el medicamento');
      }
    }
  };

  const handleRegister = () => {
    navigate('/medicamentos');
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
      <button style={buttonStyle} onClick={handleRegister}>Registrar Medicamento</button>
      <div style={cardContainerStyle}>
        {medicamentos.map((medicamento) => (
          <div key={medicamento.id} style={cardStyle}>
            <h3>Medicamento</h3>
            <p>{medicamento.nombre}</p>
            <button onClick={() => handleEdit(medicamento)}>Editar</button>
            <button onClick={() => handleDelete(medicamento.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}