import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Tratamientos() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [medicamentos, setMedicamentos] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir
  const tratamiento = location.state?.tratamiento;

  useEffect(() => {
    // Función para obtener los medicamentos desde la API
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/medicamentos/');
        setMedicamentos(response.data);
      } catch (error) {
        console.error('Error al obtener los medicamentos:', error);
      }
    };

    fetchMedicamentos();

    if (tratamiento) {
      setValue('descripcion', tratamiento.descripcion);
      setValue('duracion', tratamiento.duracion);
      setValue('medicamentos', tratamiento.medicamentos.map(medicamento => medicamento.id));
    }
  }, [tratamiento, setValue]);

  const onSubmit = async (data) => {
    try {
      if (tratamiento) {
        await axios.put(`http://127.0.0.1:8000/api/tratamientos/${tratamiento.id}/`, data);
        alert('Tratamiento actualizado con éxito');
      } else {
        await axios.post('http://127.0.0.1:8000/api/tratamientos/', data);
        alert('Tratamiento registrado con éxito');
      }
      reset();
      navigate('/tratamientosviews'); // Redirige a Tratamientosviews después de la actualización
    } catch (error) {
      console.error('Error al registrar el tratamiento:', error);
      alert('Hubo un error al registrar el tratamiento');
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
    height: '50px', // Limita la altura de los campos de selección múltiple
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
      <h2 style={titleStyle}><strong>TRATAMIENTO</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <label htmlFor="descripcion" style={formLabelStyle}>DESCRIPCIÓN</label>
        <textarea
          className="form-control"
          id="descripcion"
          {...register('descripcion', { required: true })}
          required
        />

        <label htmlFor="duracion" style={formLabelStyle}>DURACIÓN (días)</label>
        <input
          type="number"
          className="form-control"
          id="duracion"
          {...register('duracion', { required: true })}
          required
        />

        <label htmlFor="medicamentos" style={formLabelStyle}>MEDICAMENTOS</label>
        <select
          className="form-control"
          id="medicamentos"
          {...register('medicamentos', { required: true })}
          multiple
          required
          style={selectStyle}
        >
          {medicamentos.map((medicamento) => (
            <option key={medicamento.id} value={medicamento.id}>{medicamento.nombre}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary" style={buttonStyle}>GUARDAR</button>
      </form>
    </div>
  );
}