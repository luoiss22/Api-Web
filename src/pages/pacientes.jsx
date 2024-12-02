import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Pacientes() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [historiales, setHistoriales] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir
  const paciente = location.state?.paciente;

  useEffect(() => {
    // Función para obtener los historiales médicos desde la API
    const fetchHistoriales = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/historiales_medicos/');
        setHistoriales(response.data);
      } catch (error) {
        console.error('Error al obtener los historiales médicos:', error);
      }
    };

    fetchHistoriales();

    if (paciente) {
      setValue('nombreCompleto', paciente.nombreCompleto);
      setValue('edad', paciente.edad);
      setValue('fechaNac', paciente.fechaNac);
      setValue('historialMedico', paciente.historialMedico);
    }
  }, [paciente, setValue]);

  const onSubmit = async (data) => {
    try {
      if (paciente) {
        await axios.put(`http://127.0.0.1:8000/api/pacientes/${paciente.idPaciente}/`, data);
        alert('Paciente actualizado con éxito');
      } else {
        await axios.post('http://127.0.0.1:8000/api/pacientes/', data);
        alert('Paciente registrado con éxito');
      }
      reset();
      navigate('/pacientesviews'); // Redirige a Pacientesviews después de la actualización
    } catch (error) {
      console.error('Error al registrar el paciente:', error);
      alert('Hubo un error al registrar el paciente');
    }
  };

  const handleNameInput = (event) => {
    event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, ''); // Permite mayúsculas y minúsculas
  };

  const handleAgeInput = (event) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };
  

  const containerStyle = {
    backgroundColor: '#e0f1ff',
    borderRadius: '30px',
    maxWidth: '700px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '50px auto 0 auto', // Añade un margen superior de 50 píxeles
  };

  const formContainerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const formLabelStyle = {
    fontWeight: 'bold',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginTop: '5px', // Añade un margen superior de 5 píxeles
  };

  const titleStyle = {
    paddingTop: '20px',
    marginBottom: '20px',
  };

  return (
    <div className="container mt-5" style={containerStyle}>
      <h2 className="text-center" style={titleStyle}><strong>PACIENTES</strong></h2>
      <div className="container" style={formContainerStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="nombreCompleto" className="form-label" style={formLabelStyle}><strong>NOMBRE DEL PACIENTE </strong></label>
            <input
              type="text"
              className="form-control"
              id="nombreCompleto"
              {...register('nombreCompleto', { required: true })}
              required
              onInput={handleNameInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edad" className="form-label" style={formLabelStyle}><strong>EDAD </strong></label>
            <input
              type="number"
              className="form-control"
              id="edad"
              {...register('edad', { required: true, min: 1 })}
              required
              onKeyDown={handleAgeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaNac" className="form-label" style={formLabelStyle}><strong>FECHA DE NACIMIENTO </strong></label>
            <input
              type="date"
              className="form-control"
              id="fechaNac"
              {...register('fechaNac', { required: true })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="historialMedico" className="form-label" style={formLabelStyle}><strong>HISTORIAL MÉDICO </strong></label>
            <select
              className="form-control"
              id="historialMedico"
              {...register('historialMedico', { required: true })}
              required
            >
              <option value="">Seleccione un historial médico</option>
              {historiales.map((historial) => (
                <option key={historial.id} value={historial.id}>{historial.id}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={buttonStyle}><strong>GUARDAR</strong></button>
        </form>
      </div>
    </div>
  );
}