import axios from 'axios';

// Función para obtener la lista de pacientes desde la API
export const getAllPacientes = () => {
    return axios.get('http://localhost:8000/api/pacientes/');  // Asegúrate de que esta URL sea correcta
};
