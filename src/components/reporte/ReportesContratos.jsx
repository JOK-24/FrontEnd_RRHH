import React, { useEffect, useState } from "react";
import axios from "axios";

const ReporteContratos = () => {
  const [contratos, setContratos] = useState([]);
  const [filtrado, setFiltrado] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchContratos = async (soloFinalizados = false) => {
    setLoading(true);
    try {
      const url = soloFinalizados
        ? "http://localhost:5025/api/ReporteContrato/GetContratosFinalizados"
        : "http://localhost:5025/api/ReporteContrato/GetContratos";

      const response = await axios.get(url);
      setContratos(response.data);
    } catch (error) {
      console.error("Error al obtener contratos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContratos();
  }, []);

  const handleFiltrar = () => {
    setFiltrado(!filtrado);
    fetchContratos(!filtrado);
  };

  return (
    <div className="container mt-4">
      <h2>Reporte de Contratos</h2>
      <button className="btn btn-primary mb-3" onClick={handleFiltrar}>
        {filtrado ? "Ver todos" : "Filtrar vencidos"}
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : contratos.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre Completo</th>
              <th>Fecha Contratación</th>
              <th>Fecha Vencimiento</th>
              <th>Días Restantes</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((emp) => (
              <tr key={emp.idEmpleado}>
                <td>{emp.nombreCompleto}</td>
                <td>{emp.fechaContratacion}</td>
                <td>{emp.fechaVencimiento}</td>
                <td>{emp.diasRestantes}</td>
                <td>{emp.estadoEmpleado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReporteContratos;
