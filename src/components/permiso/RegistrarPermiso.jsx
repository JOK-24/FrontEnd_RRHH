import React, { useState } from "react";
import Swal from "sweetalert2";

function RegistrarPermiso() {
  const [permiso, setPermiso] = useState({
    nombre: "",
    descripcion: "",
    enabled: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPermiso({
      ...permiso,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5025/api/Permiso/PermisoPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(permiso)
      });

      if (!res.ok) throw new Error("Error al registrar permiso");

      Swal.fire("¡Éxito!", "Permiso registrado con éxito", "success");
      setPermiso({ nombre: "", descripcion: "", enabled: true });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Registrar Permiso</h2>

      <div className="mb-3">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={permiso.nombre}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-3">
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={permiso.descripcion}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-3 flex items-center">
        <input
          type="checkbox"
          name="enabled"
          checked={permiso.enabled}
          onChange={handleChange}
          className="mr-2"
        />
        <label>Habilitado</label>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Registrar
      </button>
    </form>
  );
}

export default RegistrarPermiso;
