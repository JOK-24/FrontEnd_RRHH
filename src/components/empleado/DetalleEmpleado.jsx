import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DetalleEmpleado = ({ idEmpleado, onClose }) => {
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(
          `http://localhost:5025/api/Empleado/GetEmpleadoDetalle/${idEmpleado}`
        );
        if (!response.ok) throw new Error("Error al obtener detalle");
        const data = await response.json();
        setEmpleado(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (idEmpleado) {
      fetchDetalle();
    }
  }, [idEmpleado]);

  if (!empleado) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nombre:</strong> {empleado.nombreCompleto}</p>
        <p><strong>DNI:</strong> {empleado.dni}</p>
        <p><strong>Correo:</strong> {empleado.correo}</p>
        <p><strong>Teléfono:</strong> {empleado.telefono}</p>
        <p><strong>Dirección:</strong> {empleado.direccion}</p>
        <p><strong>Fecha Nacimiento:</strong> {empleado.fechaNacimiento}</p>
        <p><strong>Fecha Contratación:</strong> {empleado.fechaContratacion}</p>
        <p><strong>Salario:</strong> {empleado.salario}</p>
        <p><strong>Estado:</strong> {empleado.estadoEmpleado}</p>
        <hr />
        <p><strong>Usuario:</strong> {empleado.nombreUsuario}</p>
        <p><strong>Departamento:</strong> {empleado.nombreDepartamento}</p>
        <p><strong>Puesto:</strong> {empleado.tituloPuesto}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetalleEmpleado;
