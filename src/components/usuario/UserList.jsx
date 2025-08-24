import { useEffect, useState } from "react";

function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5025/api/Usuario/GetUsuarios")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando usuarios:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Cargando usuarios...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>

      {usuarios.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Usuario</th>
              <th className="border border-gray-300 px-4 py-2">Nombre Completo</th>
              <th className="border border-gray-300 px-4 py-2">Rol</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{u.id}</td>
                <td className="border border-gray-300 px-4 py-2">{u.nombreUsuario}</td>
                <td className="border border-gray-300 px-4 py-2">{u.nombreCompleto}</td>
                <td className="border border-gray-300 px-4 py-2">{u.rol}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {u.enabled ? (
                    <span className="text-green-600 font-semibold">Activo</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactivo</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
