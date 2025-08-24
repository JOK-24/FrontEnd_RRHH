import { useState } from "react";

function Login({ onLogin }) { // 👈 recibe onLogin desde App
  const [form, setForm] = useState({
    nombreUsuario: "",
    contrasena: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5025/api/Usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al iniciar sesión");
      }

      const data = await response.json();

      // Guardamos usuario y rol en localStorage
      sessionStorage.setItem("usuario", data.usuario);
      sessionStorage.setItem("rol", data.rol);

      // Notificamos a App que el usuario se logueó
      onLogin(data);

      setMensaje("✅ Inicio de sesión exitoso");
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

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

        <div className="mb-4">
          <label className="block mb-1 font-medium">Usuario</label>
          <input
            type="text"
            name="nombreUsuario"
            value={form.nombreUsuario}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingrese su usuario"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
