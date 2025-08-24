import React from "react";
import { 
  FaUser, 
  FaClipboardList, 
  FaChartLine, 
  FaBuilding, 
  FaBriefcase, 
  FaHome, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import { motion } from "framer-motion";

function Sidebar({ active, setActive, openSubmenu, setOpenSubmenu, onLogout }) {
  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuBtnClass = (isActive) =>
    `menu-btn ${isActive ? "active" : ""}`;

  // 🔑 Recuperar usuario y rol desde sessionStorage
  const usuario = sessionStorage.getItem("usuario");
  const rol = sessionStorage.getItem("rol");

  return (
    <motion.div
      className="sidebar-modern"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="sidebar-title">Gestor RRHH</h2>

      {/* --- Info del usuario --- */}
      {usuario && (
        <div
          className="sidebar-user-info"
          style={{
            padding: "10px 15px",
            marginBottom: "15px",
            borderBottom: "1px solid #ccc",
            color: "#333"
          }}
        >
          <p style={{ margin: 0, fontWeight: "600" }}>Usuario: {usuario}</p>
          <small style={{ color: "#555" }}>Rol: {rol}</small>
        </div>
      )}

      {/* Siempre aparece el Inicio */}
      <button 
        className={menuBtnClass(active === "dashboard")} 
        onClick={() => setActive("dashboard")}
      >
        <FaHome className="icon" /> Inicio
      </button>

      {/* --- SOLO ADMIN --- */}
      {rol === "ADMIN" && (
        <>
          <button className="menu-btn" onClick={() => toggleSubmenu("departamentos")}>
            <FaBuilding className="icon" /> Departamentos
          </button>
          {openSubmenu === "departamentos" && (
            <div className="submenu-modern">
              <button onClick={() => setActive("departamentosList")}>Listar</button>
              <button onClick={() => setActive("departamentosAdd")}>Registrar</button>
            </div>
          )}

          <button className="menu-btn" onClick={() => toggleSubmenu("puestos")}>
            <FaBriefcase className="icon" /> Puestos
          </button>
          {openSubmenu === "puestos" && (
            <div className="submenu-modern">
              <button onClick={() => setActive("puestosList")}>Listar</button>
              <button onClick={() => setActive("puestosAdd")}>Registrar</button>
            </div>
          )}

          <button className="menu-btn" onClick={() => toggleSubmenu("empleados")}>
            <FaUser className="icon" /> Empleados
          </button>
          {openSubmenu === "empleados" && (
            <div className="submenu-modern">
              <button onClick={() => setActive("empleadosList")}>Listar</button>
              <button onClick={() => setActive("empleadosAdd")}>Registrar</button>
            </div>
          )}

          <button className="menu-btn" onClick={() => toggleSubmenu("usuarios")}>
            <FaUser className="icon" /> Usuarios
          </button>
          {openSubmenu === "usuarios" && (
            <div className="submenu-modern">
              <button onClick={() => setActive("usuariosList")}>Listar</button>
              <button onClick={() => setActive("usuariosAdd")}>Registrar</button>
            </div>
          )}

          <button 
            className={menuBtnClass(active === "reportes")} 
            onClick={() => setActive("reportes")}
          >
            <FaChartLine className="icon" /> Reportes
          </button>

          <button className="menu-btn" onClick={() => toggleSubmenu("configuracion")}>
            <FaCog className="icon" /> Configuración
          </button>
          {openSubmenu === "configuracion" && (
            <div className="submenu-modern">
              <button onClick={() => setActive("puestosAdd")}>Registrar Puesto</button>
              <button onClick={() => setActive("departamentosAdd")}>Registrar Departamento</button>
            </div>
          )}
        </>
      )}

      {/* --- SOLO EMPLEADO --- */}
      {rol === "EMPLOYEE" && (
        <>
          <button className="menu-btn" onClick={() => toggleSubmenu("permisos")}>
            <FaClipboardList className="icon" /> Permisos
          </button>
          {openSubmenu === "permisos" && (
            <div className="submenu-modern">
              <button onClick={() => setActive("permisosList")}>Listar</button>
              <button onClick={() => setActive("permisosAdd")}>Solicitar</button>
            </div>
          )}

          <button className="menu-btn" onClick={() => toggleSubmenu("configuracion")}>
            <FaCog className="icon" /> Configuración
          </button>
          {openSubmenu === "configuracion" && (
            <div className="submenu-modern">
              <button onClick={() => setActive("cambiarPassword")}>Cambiar Contraseña</button>
            </div>
          )}
        </>
      )}

      {/* --- Cerrar Sesión --- */}
      <div className="logout-container">
        <button className="menu-btn logout-btn" onClick={onLogout}>
          <FaSignOutAlt className="icon" /> Cerrar Sesión
        </button>
      </div>
    </motion.div>
  );
}

export default Sidebar;
