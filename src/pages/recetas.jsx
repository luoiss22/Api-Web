import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export function Recetas() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [medicamentos, setMedicamentos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const receta = location.state?.receta;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicamentosResponse, pacientesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/medicamentos/'),
          axios.get('http://127.0.0.1:8000/api/pacientes/')
        ]);

        setMedicamentos(medicamentosResponse.data);
        setPacientes(pacientesResponse.data);

        if (receta) {
          setValue('paciente', receta.paciente);
          setValue('medicamentos', receta.medicamentos);
          setValue('indicaciones', receta.indicaciones);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [receta, setValue]);

  const onSubmit = async (data) => {
    try {
      const pacienteSeleccionado = pacientes.find(
        (paciente) => paciente.nombreCompleto === data.paciente
      );

      if (!pacienteSeleccionado) {
        alert('Paciente no encontrado');
        return;
      }

      const recetaData = {
        paciente: pacienteSeleccionado.idPaciente,
        medicamentos: data.medicamentos.map((id) => parseInt(id)),
        indicaciones: data.indicaciones,
      };

      if (receta) {
        await axios.put(`http://127.0.0.1:8000/api/recetas/${receta.id}/`, recetaData);
        alert('Receta actualizada con éxito');
      } else {
        await axios.post('http://127.0.0.1:8000/api/recetas/', recetaData);
        alert('Receta registrada con éxito');
      }

      reset();
      navigate('/recetasviews');
    } catch (error) {
      console.error('Error al registrar la receta:', error);
      if (error.response && error.response.data) {
        console.error('Detalles del error:', error.response.data);
        alert(`Error al registrar la receta: ${JSON.stringify(error.response.data)}`);
      } else {
        alert('Hubo un error al registrar la receta');
      }
    }
  };

  const containerStyle = {
    backgroundColor: '#e0f1ff',
    borderRadius: '30px',
    maxWidth: '700px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '50px auto',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '15px',
    alignItems: 'center',
  };

  const formLabelStyle = {
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: '10px',
  };

  const buttonStyle = {
    gridColumn: '1 / -1',
    padding: '10px',
    fontSize: '16px',
  };

  const titleStyle = {
    paddingTop: '20px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  return (
    <div className="container mt-5" style={containerStyle}>
      <h2 style={titleStyle}><strong>RECETA</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <label htmlFor="paciente" style={formLabelStyle}>PACIENTE</label>
        <select
          id="paciente"
          {...register('paciente', { required: true })}
          required
          style={selectStyle}
        >
          <option value="">Seleccione un Paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.nombreCompleto}>
              {paciente.nombreCompleto}
            </option>
          ))}
        </select>

        <label htmlFor="medicamentos" style={formLabelStyle}>MEDICAMENTOS</label>
        <select
          id="medicamentos"
          name="medicamentos"
          {...register('medicamentos', { required: true })}
          multiple
          required
          style={selectStyle}
        >
          {medicamentos.map((medicamento) => (
            <option key={medicamento.id} value={medicamento.id}>{medicamento.nombre}</option>
          ))}
        </select>

        <label htmlFor="indicaciones" style={formLabelStyle}>INDICACIONES</label>
        <textarea
          id="indicaciones"
          {...register('indicaciones', { required: true })}
          required
          style={selectStyle}
        />

        <button type="submit" className="btn btn-primary" style={buttonStyle}>GUARDAR</button>
      </form>
    </div>
  );
}