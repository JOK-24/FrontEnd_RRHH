import { useState, useEffect } from "react";

function RegistrarPuesto() {
  const [puesto, setPuesto] = useState({
    titulo: "",
    salarioBase: 0,
    idDepartamento: 0,
    enabled: true,
  });

  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    // Cargar departamentos desde la API
    fetch("http://localhost:5025/api/Departamento/GetDepartamentos")
      .then((res) => res.json())
      .then((data) => setDepartamentos(data))
      .catch((err) => console.error("Error cargando departamentos:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPuesto({
      ...puesto,
      [name]:
        name.startsWith("id") || name === "salarioBase"
          ? Number(value) // IDs y salario en número
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5025/api/Puesto/PuestoPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(puesto),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.text();
      alert("✅ Puesto registrado con éxito");
      console.log("Puesto creado:", data);

      // Limpiar formulario
      setPuesto({
        titulo: "",
        salarioBase: 0,
        idDepartamento: 0,
        enabled: true,
      });
    } catch (err) {
      console.error("❌ Error en el registro:", err);
      alert("❌ Error al registrar puesto: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Puesto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block font-medium">Título de Puesto</label>
          <input
            type="text"
            name="titulo"
            value={puesto.titulo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Salario Base */}
        <div>
          <label className="block font-medium">Salario Base</label>
          <input
            type="number"
            name="salarioBase"
            value={puesto.salarioBase}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Departamento */}
        <div>
          <label className="block font-medium">Departamento</label>
          <select
            name="idDepartamento"
            value={puesto.idDepartamento}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value={0}>Seleccione un departamento</option>
            {departamentos.map((d) => (
              <option key={d.idDepartamento} value={d.idDepartamento}>
                {d.nombre}
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
            checked={puesto.enabled}
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

export default RegistrarPuesto;
