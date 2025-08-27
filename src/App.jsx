import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Login from "./components/Login";

function App() {
  const [active, setActive] = useState("dashboard");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [user, setUser] = useState(
    sessionStorage.getItem("usuario")
      ? { usuario: sessionStorage.getItem("usuario"),
         rol: sessionStorage.getItem("rol") ,
        }
      : null
  );

  // 👇 cerrar sesión
  const handleLogout = () => {
    sessionStorage.clear();
  setUser(null);
  setActive("dashboard"); // 🔥 reset al salir
    setOpenSubmenu(null);
  };

  return (
    <div className="app d-flex">
      {!user ? (
        <Login
          onLogin={(data) => {
            setUser(data);
            setActive("dashboard"); // 🔥 reset al entrar
            setOpenSubmenu(null);
          }}
        />
      ) : (
        <>
          <Sidebar
            active={active}
            setActive={setActive}
            openSubmenu={openSubmenu}
            setOpenSubmenu={setOpenSubmenu}
            rol={user.rol}
            onLogout={handleLogout} // 👈 pasamos logout
          />
          <Content 
  active={active} 
  rol={user.rol} 
  usuario={user.usuario} 
/>
        </>
      )}
    </div>
  );
}

export default App;
