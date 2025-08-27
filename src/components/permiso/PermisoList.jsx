// src/components/permiso/PermisoList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PermisoList = () => {
  const [permisos, setPermisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Traer los permisos desde la API
    axios
      .get("http://localhost:5025/api/Permiso/GetPermisos") // ruta de tu API
      .then((res) => {
        setPermisos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener permisos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando permisos...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Lista de Permisos</h2>
      {permisos.length === 0 ? (
        <p>No hay permisos registrados</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {permisos.map((permiso) => (
              <tr key={permiso.idPermiso}>
                <td>{permiso.idPermiso}</td>
                <td>{permiso.nombre}</td>
                <td>{permiso.descripcion}</td>
                <td>{permiso.enabled ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PermisoList;
