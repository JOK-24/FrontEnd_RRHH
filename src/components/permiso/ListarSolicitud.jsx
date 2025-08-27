// src/components/historial/ListarSolicitud.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListarSolicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5025/api/Historial/GetSolicitudes")
      .then((res) => {
        setSolicitudes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener solicitudes:", err);
        setLoading(false);
      });
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha) return "N/A";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES");
  };

  const renderEstado = (estado) => {
    let colorClass = "";
    switch (estado?.toUpperCase()) {
      case "PENDIENTE":
        colorClass = "text-warning";
        break;
      case "APROBADO":
        colorClass = "text-success";
        break;
      case "RECHAZADO":
        colorClass = "text-danger";
        break;
      default:
        colorClass = "text-secondary";
    }
    return <span className={`fw-bold ${colorClass}`}>{estado}</span>;
  };

  if (loading) return <p>Cargando solicitudes...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Lista de Solicitudes de Permisos</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Empleado</th>
              <th>Permiso</th>
              <th>Fecha Solicitud</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Motivo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.idHistorial}>
                <td>{solicitud.idHistorial}</td>
                <td>{solicitud.nombreEmpleado}</td>
                <td>{solicitud.nombrePermiso}</td>
                <td>{formatearFecha(solicitud.fechaSolicitud)}</td>
                <td>{formatearFecha(solicitud.fechaInicio)}</td>
                <td>{formatearFecha(solicitud.fechaFin)}</td>
                <td>{solicitud.motivo || "Sin motivo"}</td>
                <td>{renderEstado(solicitud.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarSolicitud;
