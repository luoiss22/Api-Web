import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Medicamentos() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir
  const medicamento = location.state?.medicamento;

  useEffect(() => {
    if (medicamento) {
      setValue('nombre', medicamento.nombre);
    }
  }, [medicamento, setValue]);

  const onSubmit = async (data) => {
    try {
      if (medicamento) {
        await axios.put(`http://127.0.0.1:8000/api/medicamentos/${medicamento.id}/`, data);
        alert('Medicamento actualizado con éxito');
      } else {
        await axios.post('http://127.0.0.1:8000/api/medicamentos/', data);
        alert('Medicamento registrado con éxito');
      }
      reset();
      navigate('/medicamentosviews'); // Redirige a Medicamentosviews después de la actualización
    } catch (error) {
      console.error('Error al registrar el medicamento:', error);
      alert('Hubo un error al registrar el medicamento');
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
      <h2 className="text-center" style={titleStyle}><strong>MEDICAMENTO</strong></h2>
      <div className="container" style={formContainerStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label" style={formLabelStyle}><strong>NOMBRE</strong></label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              {...register('nombre', { required: true })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={buttonStyle}><strong>GUARDAR</strong></button>
        </form>
      </div>
    </div>
  );
}