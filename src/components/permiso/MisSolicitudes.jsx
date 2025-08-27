// src/components/historial/MisSolicitudes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MisSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEmpleadoId = () => {
    const id = sessionStorage.getItem("idEmpleado");
    if (id) return parseInt(id);
    // Fallback hardcodeado (solo pruebas)
    return 1;
  };

  useEffect(() => {
    const empleadoId = getEmpleadoId();

    if (!empleadoId || empleadoId <= 0) {
      console.error("ID de empleado no válido");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5025/api/Historial/GetSolicitudesByEmpleado/${empleadoId}`)
      .then((res) => {
        console.log("Mis solicitudes:", res.data);
        setSolicitudes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener mis solicitudes:", err);
        setLoading(false);
      });
  }, []);

  const formatearFecha = (fecha) => fecha ? new Date(fecha).toLocaleDateString("es-ES") : "N/A";

  const renderEstado = (estado) => {
    const map = {
      "PENDIENTE": "bg-warning text-dark",
      "APROBADO": "bg-success",
      "RECHAZADO": "bg-danger"
    };
    return <span className={`badge ${map[estado?.toUpperCase()] || "bg-secondary"}`}>{estado}</span>;
  };

  const calcularDias = (inicio, fin) => {
    if (!inicio || !fin) return "N/A";
    const diff = Math.ceil((new Date(fin) - new Date(inicio)) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Cargando mis solicitudes...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mis Solicitudes de Permisos</h2>

      {solicitudes.length === 0 ? (
        <div className="alert alert-info">No has realizado ninguna solicitud de permiso aún.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Tipo Permiso</th>
                <th>Fecha Solicitud</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Días</th>
                <th>Motivo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map(s => (
                <tr key={s.idHistorial}>
                  <td>{s.idHistorial}</td>
                  <td>{s.nombrePermiso || `ID: ${s.idPermiso}`}</td>
                  <td>{formatearFecha(s.fechaSolicitud)}</td>
                  <td>{formatearFecha(s.fechaInicio)}</td>
                  <td>{formatearFecha(s.fechaFin)}</td>
                  <td>{calcularDias(s.fechaInicio, s.fechaFin)} días</td>
                  <td>{s.motivo || "Sin motivo"}</td>
                  <td>{renderEstado(s.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MisSolicitudes;
