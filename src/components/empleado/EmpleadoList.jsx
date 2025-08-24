// src/components/Empleado/EmpleadoList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmpleadoForm from "./EmpleadoForm";
import DetalleEmpleado from "./DetalleEmpleado";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoEdit, setEmpleadoEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [detalleEmpleadoId, setDetalleEmpleadoId] = useState(null);
  const [showDetalle, setShowDetalle] = useState(false);

  const obtenerEmpleados = () => {
    axios
      .get("http://localhost:5025/api/Empleado/GetEmpleados")
      .then((response) => setEmpleados(response.data))
      .catch((error) => console.error("Error al obtener empleados:", error));
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const handleEdit = (empleado) => {
    setEmpleadoEdit(empleado);
    setShowModal(true);
  };

  const handleSave = (empleadoActualizado) => {
    axios
      .put(
        `http://localhost:5025/api/Empleado/EmpleadoPut/${empleadoActualizado.idEmpleado}`,
        empleadoActualizado
      )
      .then(() => {
        setShowModal(false);
        setEmpleadoEdit(null);
        obtenerEmpleados();
      })
      .catch((error) => console.error("Error al actualizar empleado:", error));
  };

  const handleDetalle = (idEmpleado) => {
    setDetalleEmpleadoId(idEmpleado);
    setShowDetalle(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Lista de Empleados</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre Completo</th>
            <th>DNI</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Fecha Nacimiento</th>
            <th>Fecha Contratación</th>
            <th>Salario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((emp, index) => (
              <tr key={index}>
                <td>{emp.nombreCompleto}</td>
                <td>{emp.dni}</td>
                <td>{emp.correo}</td>
                <td>{emp.telefono}</td>
                <td>{emp.direccion}</td>
                <td>{emp.fechaNacimiento?.split("-").reverse().join("/")}</td>
                <td>{emp.fechaContratacion?.split("-").reverse().join("/")}</td>
                <td>S/ {emp.salario}</td>
                <td>{emp.estadoEmpleado}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleDetalle(emp.idEmpleado)}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No hay empleados registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Actualizar */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Empleado</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <EmpleadoForm
                  empleadoInicial={empleadoEdit || {}}
                  modo="editar"
                  onSubmit={handleSave}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalle */}
      {showDetalle && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Detalle del Empleado</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetalle(false)}
                ></button>
              </div>
              <div className="modal-body">
                <DetalleEmpleado
                  idEmpleado={detalleEmpleadoId}
                  onClose={() => setShowDetalle(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpleadoList;
