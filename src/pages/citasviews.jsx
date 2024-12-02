import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Citasviews() {
  const [citas, setCitas] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [search, setSearch] = useState({ fecha: '', paciente: '', medico: '' });
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtén las citas
        const citasResponse = await axios.get('http://127.0.0.1:8000/api/citas/');
        const citasData = citasResponse.data;

        // Mapea las citas para incluir detalles de médico y paciente
        const citasConDetalles = await Promise.all(
          citasData.map(async (cita) => {
            const medicoResponse = await axios.get(`http://127.0.0.1:8000/api/medicos/${cita.medico}/`);
            const pacienteResponse = await axios.get(`http://127.0.0.1:8000/api/pacientes/${cita.paciente}/`);

            return {
              ...cita,
              medico: medicoResponse.data,
              paciente: pacienteResponse.data,
            };
          })
        );

        setCitas(citasConDetalles);
        setFilteredCitas(citasConDetalles);

        // Obtén los médicos y pacientes
        const [medicosResponse, pacientesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/medicos/'),
          axios.get('http://127.0.0.1:8000/api/pacientes/')
        ]);

        setMedicos(medicosResponse.data);
        setPacientes(pacientesResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (cita) => {
    navigate('/citas', { state: { cita } });
  };

  const handleDelete = async (idCita) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/citas/${idCita}/`);
        alert('Cita eliminada con éxito');
        window.location.reload(); // Recarga la página para mostrar la lista actualizada
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
        alert('Hubo un error al eliminar la cita');
      }
    }
  };

  const handleRegister = () => {
    navigate('/citas');
  };

  const handleSearch = () => {
    let filtered = citas;
  
    if (search.fecha) {
      filtered = citas.filter(cita => cita.fecha.includes(search.fecha));
    }
    if (search.paciente) {
      filtered = filtered.filter(cita => 
        cita.paciente.nombreCompleto.toLowerCase().includes(search.paciente.toLowerCase())
      );
    }
    if (search.medico) {
      filtered = filtered.filter(cita => 
        cita.medico.nombreCompleto.toLowerCase().includes(search.medico.toLowerCase())
      );
    }
  
    setFilteredCitas(filtered);
    setNoResults(filtered.length === 0);
  };
   

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch(prevState => ({ ...prevState, [name]: value }));
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

  const searchContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const inputStyle = {
    margin: '5px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleRegister}>Registrar Cita</button>
      <div style={searchContainerStyle}>
        <input
          type="date"
          name="fecha"
          value={search.fecha}
          onChange={handleInputChange}
          placeholder="Fecha"
          style={inputStyle}
        />
        <select
          name="paciente"
          value={search.paciente}
          onChange={handleInputChange}
          style={inputStyle}
        >
          <option value="">Seleccione un Paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>{paciente.nombreCompleto}</option>
          ))}
        </select>
        <select
          name="medico"
          value={search.medico}
          onChange={handleInputChange}
          style={inputStyle}
        >
          <option value="">Seleccione un Médico</option>
          {medicos.map((medico) => (
            <option key={medico.id} value={medico.id}>{medico.nombreCompleto}</option>
          ))}
        </select>
        <button onClick={handleSearch} style={buttonStyle}>Buscar</button>
      </div>
      {noResults && <p>No se encontraron resultados</p>}
      <div style={cardContainerStyle}>
        {filteredCitas.map((cita) => (
          <div key={cita.id} style={cardStyle}>
            <h3>Cita</h3>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
            <p><strong>Médico:</strong> {cita.medico?.nombreCompleto || 'No disponible'}</p>
            <p><strong>Paciente:</strong> {cita.paciente?.nombreCompleto || 'No disponible'}</p>
            <button onClick={() => handleEdit(cita)}>Editar</button>
            <button onClick={() => handleDelete(cita.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}