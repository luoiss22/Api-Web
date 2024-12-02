import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Recetasviews() {
  const [recetas, setRecetas] = useState([]);
  const [medicamentos, setMedicamentos] = useState({});
  const [pacientes, setPacientes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const [recetasResponse, medicamentosResponse, pacientesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/recetas/"),
          axios.get("http://127.0.0.1:8000/api/medicamentos/"),
          axios.get("http://127.0.0.1:8000/api/pacientes/")
        ]);

        setRecetas(recetasResponse.data);

        const medicamentosMap = medicamentosResponse.data.reduce((map, med) => {
          map[med.id] = med.nombre;
          return map;
        }, {});

        const pacientesMap = pacientesResponse.data.reduce((map, pac) => {
          map[pac.idPaciente] = pac.nombreCompleto;
          return map;
        }, {});

        setMedicamentos(medicamentosMap);
        setPacientes(pacientesMap);
      } catch (error) {
        console.error("Error al obtener las recetas, medicamentos o pacientes:", error);
      }
    };

    fetchRecetas();
  }, []);

  const handleEdit = (receta) => {
    navigate("/recetas", { state: { receta } });
  };

  const handleDelete = async (idReceta) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta receta?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/recetas/${idReceta}/`);
        setRecetas((prevRecetas) => prevRecetas.filter((receta) => receta.id !== idReceta));
        alert("Receta eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la receta:", error);
        alert("Hubo un error al eliminar la receta");
      }
    }
  };

  const handleRegister = () => {
    navigate("/recetas");
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto", padding: "20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
        <button
          style={{
            backgroundColor: "#87CEEB",
            color: "white",
            padding: "10px 20px",
            margin: "20px 0",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={handleRegister}
        >
          Registrar Receta
        </button>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          {recetas.map((receta) => (
            <div
              key={receta.id}
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                width: "300px",
                textAlign: "center",
              }}
            >
              <h3>Receta</h3>
              <p><strong>Paciente:</strong> {pacientes[receta.paciente] || "Cargando..."}</p>
              <p><strong>Indicaciones:</strong> {receta.indicaciones}</p>
              <p><strong>Medicamentos:</strong></p>
              <ul>
                {receta.medicamentos.map((idMed) => (
                  <li key={idMed}>{medicamentos[idMed] || "Cargando..."}</li>
                ))}
              </ul>
              <button onClick={() => handleEdit(receta)}>Editar</button>
              <button onClick={() => handleDelete(receta.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
