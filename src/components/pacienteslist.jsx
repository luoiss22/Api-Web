import { useEffect, useState } from "react";
import { getAllPacientes } from "../api/pacienteslist";

export function Pacienteslist({ onEdit, onDelete }) {
  const [pacientes, setPacientes] = useState([]); // Estado para almacenar la lista de pacientes
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const loadPacientes = async () => {
    try {
      setLoading(true); // Inicia la carga
      const res = await getAllPacientes(); // Llama a la API
      setPacientes(res.data); // Actualiza el estado con los pacientes
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  return (
    <div className="container">
      {pacientes.map((paciente) => (
        <div key={paciente.idPaciente} className="card">
          <h3>{paciente.nombreCompleto}</h3>
          <p><strong>ID:</strong> {paciente.idPaciente}</p>
          <p><strong>Edad:</strong> {paciente.edad}</p>
          <p><strong>Fecha de Nacimiento:</strong> {paciente.fechaNac}</p>
          <button onClick={() => onEdit(paciente)}>Editar</button>
          <button onClick={() => onDelete(paciente.idPaciente)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}