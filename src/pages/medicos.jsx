import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Medicos() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [recetas, setRecetas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir
  const medico = location.state?.medico;

  useEffect(() => {
    // Función para obtener las recetas desde la API
    const fetchRecetas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recetas/');
        setRecetas(response.data);
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
      }
    };

    fetchRecetas();

    if (medico) {
      setValue('nombreCompleto', medico.nombreCompleto);
      setValue('especialidad', medico.especialidad);
      setValue('recetas', medico.recetas.map(receta => receta.id));
    }
  }, [medico, setValue]);

  const onSubmit = async (data) => {
    try {
      if (medico) {
        await axios.put(`http://127.0.0.1:8000/api/medicos/${medico.idMedico}/`, data);
        alert('Médico actualizado con éxito');
      } else {
        await axios.post('http://127.0.0.1:8000/api/medicos/', data);
        alert('Médico registrado con éxito');
      }
      reset();
      navigate('/medicosviews'); // Redirige a Medicosviews después de la actualización
    } catch (error) {
      console.error('Error al registrar el médico:', error);
      alert('Hubo un error al registrar el médico');
    }
  };

  const handleTextInput = (event) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (!/^[A-Za-z\s]*$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
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
    height: '150px', // Limita la altura de los campos de selección múltiple
    overflowY: 'scroll', // Permite el desplazamiento vertical
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
      <h2 style={titleStyle}><strong>MÉDICO</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <label htmlFor="nombreCompleto" style={formLabelStyle}>NOMBRE COMPLETO</label>
        <input
          type="text"
          className="form-control"
          id="nombreCompleto"
          {...register('nombreCompleto', { required: true })}
          required
          onKeyDown={handleTextInput}
        />

        <label htmlFor="especialidad" style={formLabelStyle}>ESPECIALIDAD</label>
        <input
          type="text"
          className="form-control"
          id="especialidad"
          {...register('especialidad', { required: true })}
          required
          onKeyDown={handleTextInput}
        />

        <label htmlFor="recetas" style={formLabelStyle}>RECETAS</label>
        <select
          className="form-control"
          id="recetas"
          {...register('recetas', { required: true })}
          multiple
          required
          style={selectStyle}
        >
          {recetas.map((receta) => (
            <option key={receta.id} value={receta.id}>{receta.indicaciones}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary" style={buttonStyle}>GUARDAR</button>
      </form>
    </div>
  );
}