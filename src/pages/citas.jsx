import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Citas() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir
  const cita = location.state?.cita;

  useEffect(() => {
    // Función para obtener los médicos y pacientes desde la API
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/medicos/');
        setMedicos(response.data);
      } catch (error) {
        console.error('Error al obtener los médicos:', error);
      }
    };

    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pacientes/');
        setPacientes(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    fetchMedicos();
    fetchPacientes();

    if (cita) {
      setValue('fecha', cita.fecha);
      setValue('medico', cita.medico.id);
      setValue('paciente', cita.paciente.id);
    }
  }, [cita, setValue]);

  const onSubmit = async (data) => {
    const today = new Date().toISOString().split('T')[0];
    if (data.fecha < today) {
      alert('No se puede registrar una cita en una fecha anterior a la actual.');
      return;
    }

    try {
      if (cita) {
        await axios.put(`http://127.0.0.1:8000/api/citas/${cita.id}/`, data);
        alert('Cita actualizada con éxito');
      } else {
        await axios.post('http://127.0.0.1:8000/api/citas/', data);
        alert('Cita registrada con éxito');
      }
      reset();
      navigate('/citasviews'); // Redirige a Citasviews después de la actualización
    } catch (error) {
      console.error('Error al registrar la cita:', error);
      alert('Hubo un error al registrar la cita');
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

  return (
    <div className="container mt-5" style={containerStyle}>
      <h2 style={titleStyle}><strong>CITA</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <label htmlFor="fecha" style={formLabelStyle}>FECHA</label>
        <input
          type="date"
          className="form-control"
          id="fecha"
          {...register('fecha', { required: true })}
          required
        />

        <label htmlFor="medico" style={formLabelStyle}>MÉDICO</label>
        <select
          className="form-control"
          id="medico"
          {...register('medico', { required: true })}
          required
        >
          {medicos.map((medico) => (
            <option key={medico.idMedico} value={medico.idMedico}>{medico.nombreCompleto}</option>
          ))}
        </select>

        <label htmlFor="paciente" style={formLabelStyle}>PACIENTE</label>
        <select
          className="form-control"
          id="paciente"
          {...register('paciente', { required: true })}
          required
        >
          {pacientes.map((paciente) => (
            <option key={paciente.idPaciente} value={paciente.idPaciente}>{paciente.nombreCompleto}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary" style={buttonStyle}>GUARDAR</button>
      </form>
    </div>
  );
}