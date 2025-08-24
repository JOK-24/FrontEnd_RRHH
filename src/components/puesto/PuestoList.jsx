import React, { useEffect, useState } from "react";

function PuestoList() {
  const [puestos, setPuestos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5025/api/Puesto/GetPuestos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los puestos");
        }
        return res.json();
      })
      .then((data) => setPuestos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Puestos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Salario Base</th>
            <th>ID Departamento</th>
            <th>Habilitado</th>
          </tr>
        </thead>
        <tbody>
          {puestos.map((p) => (
            <tr key={p.idPuesto}>
              <td>{p.idPuesto}</td>
              <td>{p.titulo}</td>
              <td>{p.salarioBase ?? "No definido"}</td>
              <td>{p.nombreDepartamento}</td>
              <td>{p.enabled ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PuestoList;
