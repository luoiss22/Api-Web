import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Historiales() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const historial = location.state?.historial;

  useEffect(() => {
    const fetchDiagnosticos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/diagnosticos/');
        setDiagnosticos(response.data);
      } catch (error) {
        console.error('Error al obtener los diagnósticos:', error);
      }
    };

    const fetchTratamientos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tratamientos/');
        setTratamientos(response.data);
      } catch (error) {
        console.error('Error al obtener los tratamientos:', error);
      }
    };

    fetchDiagnosticos();
    fetchTratamientos();

    if (historial) {
      setValue('antecedentes', historial.antecedentes);
      setValue('alergias', historial.alergias);
      setValue('notas', historial.notas);
      setValue('diagnosticos', historial.diagnosticos.map(diagnostico => diagnostico.id));
      setValue('tratamientos', historial.tratamientos.map(tratamiento => tratamiento.id));
    }
  }, [historial, setValue]);

  const onSubmit = async (data) => {
    try {
      if (historial) {
        await axios.put(`http://127.0.0.1:8000/api/historiales_medicos/${historial.id}/`, data);
        alert('Historial médico actualizado con éxito');
      } else {
        await axios.post('http://127.0.0.1:8000/api/historiales_medicos/', data);
        alert('Historial médico registrado con éxito');
      }
      reset();
      navigate('/historialesviews');
    } catch (error) {
      console.error('Error al registrar el historial médico:', error);
      alert('Hubo un error al registrar el historial médico');
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

  const selectStyle = {
    height: '50px',
    overflowY: 'auto',
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
      <h2 style={titleStyle}><strong>HISTORIALES MÉDICOS</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <label htmlFor="antecedentes" style={formLabelStyle}>ANTECEDENTES</label>
        <textarea
          className="form-control"
          id="antecedentes"
          {...register('antecedentes', { required: true })}
          required
        />

        <label htmlFor="alergias" style={formLabelStyle}>ALERGIAS</label>
        <input
          type="text"
          className="form-control"
          id="alergias"
          {...register('alergias', { required: true })}
          required
        />

        <label htmlFor="notas" style={formLabelStyle}>NOTAS</label>
        <textarea
          className="form-control"
          id="notas"
          {...register('notas', { required: true })}
          required
        />

        <label htmlFor="diagnosticos" style={formLabelStyle}>DIAGNÓSTICOS</label>
        <select
          className="form-control"
          id="diagnosticos"
          {...register('diagnosticos', { required: true })}
          multiple
          required
          style={selectStyle}
        >
          {diagnosticos.map((diagnostico) => (
            <option key={diagnostico.id} value={diagnostico.id}>{diagnostico.descripcion}</option>
          ))}
        </select>

        <label htmlFor="tratamientos" style={formLabelStyle}>TRATAMIENTOS</label>
        <select
          className="form-control"
          id="tratamientos"
          {...register('tratamientos', { required: true })}
          multiple
          required
          style={selectStyle}
        >
          {tratamientos.map((tratamiento) => (
            <option key={tratamiento.id} value={tratamiento.id}>{tratamiento.descripcion}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary" style={buttonStyle}>GUARDAR</button>
      </form>
    </div>
  );
}
