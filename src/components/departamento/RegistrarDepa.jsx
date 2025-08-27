import React, { useState } from "react";
import Swal from "sweetalert2";

function RegistrarDepa() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [enabled, setEnabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const departamento = {
      codigo,
      nombre,
      enabled,
    };

    try {
      const response = await fetch("http://localhost:5025/api/Departamento/DepartamentoPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departamento),
      });

      if (response.ok) {
        const message = await response.text();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: message,
          confirmButtonColor: "#3085d6",
        });
        // limpiar formulario
        setCodigo("");
        setNombre("");
        setEnabled(true);
      } else {
        const error = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Departamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Código</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="mr-2"
          />
          <label>Habilitado</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistrarDepa;
