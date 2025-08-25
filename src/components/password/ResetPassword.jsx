import React, { useState } from "react";
import Swal from "sweetalert2";

function ResetPassword() {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    nuevaContrasena: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5025/api/Password/ResetPasswordPut/Admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.text();
        Swal.fire("✅ Éxito", result, "success");
      } else {
        const error = await response.text();
        Swal.fire("⚠️ Error", error, "error");
      }
    } catch (err) {
      Swal.fire("❌ Error", "Error de conexión con el servidor.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Resetear Contraseña (Admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre de Usuario</label>
          <input
            type="text"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium">Nueva Contraseña</label>
          <input
            type="password"
            name="nuevaContrasena"
            value={formData.nuevaContrasena}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
        >
          Resetear Contraseña
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
