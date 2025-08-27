import React, { useEffect, useState } from "react";
import "./Content.css"; //  importar CSS
import EmpleadoList from "./empleado/EmpleadoList";
import RegistrarEmpleado from "./empleado/RegistrarEmpleado";
//
import PuestoList from "./puesto/PuestoList";
import RegistrarPuesto from "./puesto/RegistrarPuesto";
//
import DepartamentoList from "./departamento/DepartamentoList";
import RegistrarDepa from "./departamento/RegistrarDepa";
//
import RegistrarUser from "./usuario/RegistrarUser";
import UserList from "./usuario/UserList";
import { i } from "framer-motion/client";

import listContratos from "./reporte/ReportesContratos";
//
import RegistrarPermiso from "./permiso/RegistrarPermiso";
import PermisoList from "./permiso/PermisoList";
import ListarSolicitud from "./permiso/ListarSolicitud";
import MisSolicitudes from "./permiso/MisSolicitudes"
//
import SolicitarPermiso from "./permiso/SolicitarPermiso";
//
import UpdatePassword from "./password/UpdatePassword";
import ResetPassword from "./password/ResetPassword";
import ReporteContratos from "./reporte/ReportesContratos";

function Content({ active }) {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5025/api/Empleado/GetEmpleados")
      .then(res => res.json())
      .then(data => setListaEmpleados(data))
      .catch(err => console.error(err));

    fetch("http://localhost:5025/api/Usuario/GetUsuarios")
      .then(res => res.json())
      .then(data => setListaUsuarios(data))
      .catch(err => console.error(err));
  }, []);

  const contratosPorVencer = listaEmpleados.filter(emp => {
    const fechaContratacion = new Date(emp.fechaContratacion);
    const fechaVencimiento = new Date(fechaContratacion);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);
    return fechaVencimiento <= new Date();
  });

  return (
    <div className="flex-grow-1 p-3">
      {active === "dashboard" && (
        <div className="dashboard">
          {/* Encabezado */}
          <div className="dashboard-header">
            <h2>Bienvenido al Dashboard</h2>
            <span>{fechaHora.toLocaleDateString()} {fechaHora.toLocaleTimeString()}</span>
          </div>

          {/* Cards */}
          <div className="dashboard-cards">
            <div className="dashboard-card" style={{backgroundColor: "#cce5ff"}}>
              <h3>Usuarios Registrados</h3>
              <p>{listaUsuarios.length}</p>
            </div>

            <div className="dashboard-card" style={{backgroundColor: "#d4edda"}}>
              <h3>Empleados Totales</h3>
              <p>{listaEmpleados.length}</p>
            </div>

            <div className="dashboard-card" style={{backgroundColor: "#fff3cd"}}>
              <h3>Contratos por Vencer</h3>
              <p>{contratosPorVencer.length}</p>
            </div>
          </div>

          {/* Alertas */}
          {contratosPorVencer.length > 0 && (
            <div className="dashboard-alert">
              <h4>Alerta de contratos</h4>
              <ul>
                {contratosPorVencer.map(emp => (
                  <li key={emp.idEmpleado}>⚠ El contrato de {emp.nombreCompleto} vence pronto.</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Otras vistas */}
      {active === "empleadosList" && <EmpleadoList />}
      {active === "empleadosAdd" && <RegistrarEmpleado />} 
      {active === "puestosList" && <PuestoList />}
      {active === "puestosAdd" && <RegistrarPuesto />}
      {active === "departamentosList" && <DepartamentoList />}
      {active === "departamentosAdd" && <RegistrarDepa />}
      {active === "usuariosAdd" && <RegistrarUser />}
      {active === "usuariosList" && <UserList />}
      {active === "listContratos" && <ReporteContratos />}
      {active === "cambiarPassword" && <UpdatePassword />}
      {active === "permisoAdd" && <RegistrarPermiso />}
      {active === "permisoList" && <PermisoList />}
      {active === "solicitudEmpleado" && <ListarSolicitud />}
      {active === "solicitudAdd" && <SolicitarPermiso />}
      {active === "resetPassword" && <ResetPassword />}
      {active === "misSolicitudes" && <MisSolicitudes/>}
    </div>
  );
}

export default Content;
