import { Link } from "react-router-dom";
import './Navigation.css'; // Asegúrate de importar el archivo CSS

export function Navigation() {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/inicio">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/pacientesviews">Pacientes</Link>
          <ul className="sub-menu">
            <li><Link to="/pacientes">Registrar Pacientes</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/citasviews">Citas</Link>
          <ul className="sub-menu">
            <li><Link to="/citas">Registrar Citas</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/medicosviews">Medicos</Link>
          <ul className="sub-menu">
            <li><Link to="/medicos">Registrar Medicos</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/diagnosticosviews">Diagnosticos</Link>
          <ul className="sub-menu">
            <li><Link to="/diagnosticos">Registrar Diagnosticos</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/historialesviews">Historiales</Link>
          <ul className="sub-menu">
            <li><Link to="/historiales">Registrar Historiales</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/medicamentosviews">Medicamentos</Link>
          <ul className="sub-menu">
            <li><Link to="/medicamentos">Registrar Medicamentos</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/recetasviews">Recetas</Link>
          <ul className="sub-menu">
            <li><Link to="/recetas">Registrar Recetas</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/tratamientosviews">Tratamientos</Link>
          <ul className="sub-menu">
            <li><Link to="/tratamientos">Registrar Tratamientos</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
