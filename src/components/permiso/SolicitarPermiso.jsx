import React, { useEffect, useState } from "react";
import axios from "axios";

function SolicitarPermiso() {
  const [permisos, setPermisos] = useState([]);
  const [empleado, setEmpleado] = useState(null);
  const [form, setForm] = useState({
    idPermiso: "",
    fechaInicio: "",
    fechaFin: "",
    motivo: ""
  });
  const [mensaje, setMensaje] = useState("");

  // Obtener el empleado logueado desde sessionStorage
  useEffect(() => {
    const idUsuario = sessionStorage.getItem("idUsuario"); // Guardado en login
    console.log("idUsuario en sessionStorage:", idUsuario);

    if (idUsuario) {
      axios
        .get(`http://localhost:5025/api/Empleado/GetEmpleadoByUsuario/${idUsuario}`)
        .then((res) => {
          console.log("Empleado obtenido:", res.data);
          setEmpleado(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener empleado:", err);
          setMensaje("❌ Error al obtener información del empleado");
        });
    } else {
      setMensaje("❌ No se encontró un usuario en la sesión");
    }
  }, []);

  // Obtener permisos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:5025/api/Permiso/GetPermisos")
      .then((res) => {
        const activos = res.data.filter((p) => p.enabled);
        setPermisos(activos);
      })
      .catch((err) => {
        console.error("Error al obtener permisos:", err);
        setMensaje("❌ Error al cargar permisos");
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empleado) {
      setMensaje("❌ No se ha identificado el empleado");
      return;
    }

    if (!form.idPermiso || !form.fechaInicio || !form.fechaFin) {
      setMensaje("❌ Complete todos los campos obligatorios");
      return;
    }

    if (new Date(form.fechaFin) <= new Date(form.fechaInicio)) {
      setMensaje("❌ La fecha fin debe ser posterior a la fecha inicio");
      return;
    }

    try {
      const data = {
        IdEmpleado: empleado.idEmpleado, // Este viene del backend
        IdPermiso: parseInt(form.idPermiso),
        FechaInicio: form.fechaInicio,
        FechaFin: form.fechaFin,
        Motivo: form.motivo || ""
      };

      console.log("Datos a enviar:", data);

      const res = await axios.post(
        "http://localhost:5025/api/Historial/SolicitarPermisoPost",
        data,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setMensaje(`✅ ${res.data}`);
      setForm({ idPermiso: "", fechaInicio: "", fechaFin: "", motivo: "" });
    } catch (err) {
      console.error("Error completo:", err);

      if (err.response) {
        if (err.response.data && err.response.data.errors) {
          const errores = Object.values(err.response.data.errors).flat();
          setMensaje(`❌ Errores de validación: ${errores.join(", ")}`);
        } else {
          setMensaje(`❌ Error del servidor: ${err.response.data || "Error desconocido"}`);
        }
      } else if (err.request) {
        setMensaje("❌ No se pudo conectar con el servidor");
      } else {
        setMensaje(`❌ Error: ${err.message}`);
      }
    }
  };

  if (!empleado && !mensaje.startsWith("❌")) {
    return (
      <div className="p-4 max-w-md mx-auto bg-white shadow rounded mt-10">
        <div className="text-center">Cargando información del empleado...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Solicitar Permiso</h2>

      {empleado && (
        <div className="mb-4 p-2 bg-blue-50 rounded">
          <p className="text-sm text-blue-600">
            <strong>Empleado:</strong> {empleado.nombreCompleto}
          </p>
        </div>
      )}

      {mensaje && (
        <div
          className={`mb-4 p-2 rounded text-center ${
            mensaje.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tipo de Permiso</label>
          <select
            name="idPermiso"
            value={form.idPermiso}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">-- Seleccione --</option>
            {permisos.map((permiso) => (
              <option key={permiso.idPermiso} value={permiso.idPermiso}>
                {permiso.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha Inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha Fin</label>
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={form.fechaInicio || new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Motivo</label>
          <textarea
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Opcional - Describa el motivo de su solicitud"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          disabled={!empleado}
        >
          Solicitar Permiso
        </button>
      </form>
    </div>
  );
}

export default SolicitarPermiso;
