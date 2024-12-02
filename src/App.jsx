import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Pacientes } from './pages/pacientes';
import { Pacientesviews } from './pages/pacientesviews';
import { Inicio } from './pages/inicio'; 
import { Citas } from './pages/citas';
import { Citasviews } from './pages/citasviews';
import { Medicos } from './pages/medicos';
import { Medicosviews } from './pages/medicosviews';
import { Diagnosticos } from './pages/diagnosticos';
import { Diagnosticosviews } from './pages/diagnosticosviews';
import { Historiales } from './pages/historiales';
import { Historialesviews } from './pages/historialesviews';
import { Medicamentos } from './pages/medicamentos';
import { Medicamentosviews } from './pages/medicamentosviews';
import { Recetas } from './pages/recetas';
import { Recetasviews } from './pages/recetasviews';
import { Tratamientos } from './pages/tratamientos';
import { Tratamientosviews } from './pages/tratamientosviews';
import { Navigation } from './components/Navigation';
import './App.css'; // Importa el archivo CSS



function App() {
  return (
    <BrowserRouter>
      <Navigation /> {/* Añade el componente Navigation */}


      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientesviews" element={<Pacientesviews />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/citasviews" element={<Citasviews />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/medicosviews" element={<Medicosviews />} />
        <Route path="/diagnosticos" element={<Diagnosticos />} />
        <Route path="/diagnosticosviews" element={<Diagnosticosviews />} />
        <Route path="/historiales" element={<Historiales />} />
        <Route path="/historialesviews" element={<Historialesviews />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/medicamentosviews" element={<Medicamentosviews />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/recetasviews" element={<Recetasviews />} />
        <Route path="/tratamientos" element={<Tratamientos />} />
        <Route path="/tratamientosviews" element={<Tratamientosviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
