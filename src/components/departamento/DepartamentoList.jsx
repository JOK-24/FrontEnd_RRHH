import { useEffect, useState } from "react";

function DepartamentoList() {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5025/api/Departamento/GetDepartamentos")
      .then((res) => res.json())
      .then((data) => {
        setDepartamentos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando departamentos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Cargando departamentos...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Lista de Departamentos</h2>

      {departamentos.length === 0 ? (
        <p className="text-gray-500">No hay departamentos registrados.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Código</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map((d) => (
              <tr key={d.idDepartamento}>
                <td className="border border-gray-300 px-4 py-2 text-center">{d.idDepartamento}</td>
                <td className="border border-gray-300 px-4 py-2">{d.codigo}</td>
                <td className="border border-gray-300 px-4 py-2">{d.nombre}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {d.enabled ? (
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

export default DepartamentoList;
