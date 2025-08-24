import { useState, useEffect } from "react";

function RegistrarEmpleado() {
  const [empleado, setEmpleado] = useState({
    idUsuario: 0,
    nombreCompleto: "",
    dni: "",
    correo: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",      // yyyy-MM-dd
    fechaContratacion: "",    // yyyy-MM-dd
    idDepartamento: 0,
    idPuesto: 0,
    salario: 0,
    estadoEmpleado: "", // valor por defecto
    enabled: true             // siempre true al registrar
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState([]);

  useEffect(() => {
    // Cargar departamentos
    fetch("http://localhost:5025/api/Departamento/GetDepartamentos")
      .then(res => res.json())
      .then(data => setDepartamentos(data))
      .catch(err => console.error("Error cargando departamentos:", err));

    // Cargar puestos
    fetch("http://localhost:5025/api/Puesto/GetPuestos")
      .then(res => res.json())
      .then(data => setPuestos(data))
      .catch(err => console.error("Error cargando puestos:", err));

      // Cargar usuarios disponibles
    fetch("http://localhost:5025/api/Usuario/GetUsuariosDisponibles")
      .then(res => res.json())
      .then(data => setUsuariosDisponibles(data))
      .catch(err => console.error("Error cargando usuarios disponibles:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpleado({
      ...empleado,
      [name]:
        name.startsWith("id") || name === "salario"
          ? Number(value) // IDs y salario a número
          : type === "checkbox"
          ? checked
          : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Armamos el JSON tal cual espera el backend
    const empleadoData = {
      ...empleado,
      salario: empleado.salario ? Number(empleado.salario) : 0,
      fechaNacimiento: empleado.fechaNacimiento || null,
      fechaContratacion: empleado.fechaContratacion || null
    };

    try {
      const res = await fetch("http://localhost:5025/api/Empleado/EmpleadoPost", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(empleadoData)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.text();
      alert("✅ Empleado registrado con éxito");
      console.log("Empleado creado:", data);

      // Limpiar formulario
      setEmpleado({
        idUsuario: 0,
        nombreCompleto: "",
        dni: "",
        correo: "",
        telefono: "",
        direccion: "",
        fechaNacimiento: "",
        fechaContratacion: "",
        idDepartamento: 0,
        idPuesto: 0,
        salario: 0,
        estadoEmpleado: "",
        enabled: true
      });
    } catch (err) {
      console.error("❌ Error en el registro:", err);
      alert("❌ Error al registrar empleado: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Empleado</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

          {/* Usuario (Select con NombreUsuario) */}
        <div>
          <label className="block font-medium">Usuario</label>
          <select
            name="idUsuario"
            value={empleado.idUsuario}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value={0}>Seleccione un usuario</option>
            {usuariosDisponibles.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombreUsuario}
              </option>
            ))}
          </select>
        </div>

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

        {/* Fecha Nacimiento */}
        <div>
          <label className="block font-medium">Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={empleado.fechaNacimiento}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Fecha Contratación */}
        <div>
          <label className="block font-medium">Fecha de Contratación</label>
          <input
            type="date"
            name="fechaContratacion"
            value={empleado.fechaContratacion}
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

        {/* Botón */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistrarEmpleado;
