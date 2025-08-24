// src/components/Empleado/EmpleadoForm.jsx
import { useState, useEffect } from "react";

function EmpleadoForm({ empleadoInicial, modo, onSubmit }) {
  const [empleado, setEmpleado] = useState(empleadoInicial);

  const [departamentos, setDepartamentos] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState([]);

  useEffect(() => {
    setEmpleado(empleadoInicial); // actualizar cuando cambie el empleado
  }, [empleadoInicial]);

  useEffect(() => {
    fetch("http://localhost:5025/api/Departamento/GetDepartamentos")
      .then((res) => res.json())
      .then(setDepartamentos);

    fetch("http://localhost:5025/api/Puesto/GetPuestos")
      .then((res) => res.json())
      .then(setPuestos);

    fetch("http://localhost:5025/api/Usuario/GetUsuariosDisponibles")
      .then((res) => res.json())
      .then(setUsuariosDisponibles);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpleado({
      ...empleado,
      [name]:
        name.startsWith("id") || name === "salario"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(empleado);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-xl font-bold mb-2">
        {modo === "registrar" ? "Registrar Empleado" : "Actualizar Empleado"}
      </h2>

      {/* Usuario 
      <div>
        <label className="block font-medium">Usuario</label>
        <select
          name="idUsuario"
          value={empleado.idUsuario}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={modo === "editar"} // ya no se cambia usuario al editar
        >
          <option value={0}>Seleccione un usuario</option>
          {usuariosDisponibles.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombreUsuario}
            </option>
          ))}
        </select>
      </div>*/}

      {/* Nombre */}
      <div>
        <label className="block font-medium">Nombre Completo</label>
        <input
          type="text"
          name="nombreCompleto"
          value={empleado.nombreCompleto}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* DNI */}
      <div>
        <label className="block font-medium">DNI</label>
        <input
          type="text"
          name="dni"
          value={empleado.dni}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Correo */}
      <div>
        <label className="block font-medium">Correo</label>
        <input
          type="email"
          name="correo"
          value={empleado.correo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block font-medium">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={empleado.telefono}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Dirección */}
      <div>
        <label className="block font-medium">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={empleado.direccion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Fechas */}
      <div>
        <label className="block font-medium">Fecha de Nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={empleado.fechaNacimiento?.substring(0, 10) || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Fecha de Contratación</label>
        <input
          type="date"
          name="fechaContratacion"
          value={empleado.fechaContratacion?.substring(0, 10) || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Departamento */}
      <div>
        <label className="block font-medium">Departamento</label>
        <select
          name="idDepartamento"
          value={empleado.idDepartamento}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value={0}>Seleccione un departamento</option>
          {departamentos.map((d) => (
            <option key={d.idDepartamento} value={d.idDepartamento}>
              {d.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Puesto */}
      <div>
        <label className="block font-medium">Puesto</label>
        <select
          name="idPuesto"
          value={empleado.idPuesto}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value={0}>Seleccione un puesto</option>
          {puestos.map((p) => (
            <option key={p.idPuesto} value={p.idPuesto}>
              {p.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Salario */}
      <div>
        <label className="block font-medium">Salario</label>
        <input
          type="number"
          name="salario"
          value={empleado.salario}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block font-medium">Estado</label>
        <select
          name="estadoEmpleado"
          value={empleado.estadoEmpleado}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Seleccione Estado --</option>
          <option value="CONTRATADO">CONTRATADO</option>
          <option value="FINALIZADO">FINALIZADO</option>
          <option value="RETIRADO">RETIRADO</option>
        </select>
      </div>

      {/* Enabled */}
      <div>
        <label className="block font-medium">Habilitado</label>
        <input
          type="checkbox"
          name="enabled"
          checked={empleado.enabled}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {modo === "registrar" ? "Registrar" : "Actualizar"}
      </button>
    </form>
  );
}

export default EmpleadoForm;
