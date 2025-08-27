    import { useState } from "react";

    function Login({ onLogin }) {
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al iniciar sesión");
          }

          const data = await response.json();
          console.log("Respuesta del backend:", data);

          // Guardar usuario en sessionStorage
          sessionStorage.setItem("idUsuario", data.idUsuario);
          sessionStorage.setItem("idEmpleado", data.idEmpleado);
          sessionStorage.setItem("usuario", data.usuario);
          sessionStorage.setItem("rol", data.rol);

          if (onLogin) onLogin(data);

          setMensaje("✅ Inicio de sesión exitoso");
        } catch (error) {
          console.error("Error en login:", error);
          setMensaje(`❌ ${error.message}`);
        }
      };

      // 🎨 Estilos
      const containerStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
        zIndex: 1000,
      };

      const cardStyle = {
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        padding: "2.5rem",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        width: "350px",
        display: "flex",
        flexDirection: "column",
      };

      const titleStyle = {
        textAlign: "center",
        fontSize: "1.8rem",
        fontWeight: "bold",
        color: "#fff",
        marginBottom: "1.5rem",
      };

      const labelStyle = {
        marginTop: "0.5rem",
        marginBottom: "0.3rem",
        color: "#fff",
        fontWeight: "500",
      };

      const inputStyle = {
        padding: "0.6rem",
        borderRadius: "10px",
        border: "none",
        marginBottom: "1rem",
        outline: "none",
        fontSize: "1rem",
      };

      const buttonStyle = {
        padding: "0.8rem",
        borderRadius: "12px",
        border: "none",
        background: "#fff",
        color: "#2575fc",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "0.3s",
      };

      const mensajeStyle = {
        textAlign: "center",
        padding: "0.5rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        fontWeight: "500",
        backgroundColor: mensaje.startsWith("✅")
          ? "rgba(0, 255, 100, 0.2)"
          : "rgba(255, 0, 0, 0.2)",
        color: mensaje.startsWith("✅") ? "#0f9d58" : "#d93025",
      };

      return (
        <div style={containerStyle}>
          <form onSubmit={handleSubmit} style={cardStyle}>
            <h2 style={titleStyle}>Iniciar Sesión</h2>

            {mensaje && <div style={mensajeStyle}>{mensaje}</div>}

            <label style={labelStyle}>Usuario</label>
            <input
              type="text"
              name="nombreUsuario"
              value={form.nombreUsuario}
              onChange={handleChange}
              placeholder="Ingrese su usuario"
              required
              style={inputStyle}
            />

            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.background = "#e0e0e0")}
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
            >
              Ingresar
            </button>
          </form>
        </div>
      );
    }

    export default Login;
