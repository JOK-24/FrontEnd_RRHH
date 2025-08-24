import { useState, useEffect } from "react";

function RegistrarUser() {
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    contrasena: "",
    nombreCompleto: "",
    idRol: 0,
    enabled: true,
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Cargar roles disponibles desde el backend
    fetch("http://localhost:5025/api/Role/GetRoles")
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error cargando roles:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsuario({
      ...usuario,
      [name]:
        name.startsWith("id") ? Number(value) : type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioData = {
      ...usuario,
    };

    try {
      const res = await fetch("http://localhost:5025/api/Usuario/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      alert("✅ Usuario registrado con éxito");
      console.log("Usuario creado:", data);

      // Limpiar formulario
      setUsuario({
        nombreUsuario: "",
        contrasena: "",
        nombreCompleto: "",
        idRol: 0,
        enabled: true,
      });
    } catch (err) {
      console.error("❌ Error en el registro:", err);
      alert("❌ Error al registrar usuario: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Nombre de Usuario */}
        <div>
          <label className="block font-medium">Nombre de Usuario</label>
          <input
            type="text"
            name="nombreUsuario"
            value={usuario.nombreUsuario}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block font-medium">Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={usuario.contrasena}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Nombre Completo */}
        <div>
          <label className="block font-medium">Nombre Completo</label>
          <input
            type="text"
            name="nombreCompleto"
            value={usuario.nombreCompleto}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Rol */}
        <div>
          <label className="block font-medium">Rol</label>
          <select
            name="idRol"
            value={usuario.idRol}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value={0}>Seleccione un rol</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Enabled */}
        <div>
          <label className="block font-medium">Habilitado</label>
          <input
            type="checkbox"
            name="enabled"
            checked={usuario.enabled}
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

export default RegistrarUser;
