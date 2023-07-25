import React from "react";

function FilterStatus({ status, setStatus }) {
  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setStatus({ status: [...status.status, value] });
    } else {
      setStatus({ status: status.status.filter((e) => e !== value) });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between m-2">
      <h1 className="text-xs text-center"> Filtrar por estado de usuario</h1>
      <div className="grid grid-cols-1  ">
        <div className="flex items-center mt-1 ">
          <input
            onChange={(e) => handleChange(e)}
            type="checkbox"
            value="consulta"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
          />
          <label className="ml-2 text-sm font-medium text-gray-500">
            Consulta
          </label>
        </div>
        {/* ---------------------- */}
        <div className="flex items-center mt-1">
          <input
            onChange={(e) => handleChange(e)}
            type="checkbox"
            value="carpeta"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
          />
          <label className="ml-2 text-sm font-medium text-gray-500">
            Carpeta
          </label>
        </div>
        {/* ---------------------- */}
        <div className="flex items-center mt-1">
          <input
            onChange={(e) => handleChange(e)}
            type="checkbox"
            value="derivado"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
          />
          <label className="ml-2 text-sm font-medium text-gray-500">
            Derivado
          </label>
        </div>
        {/* ---------------------- */}
      </div>
    </div>
  );
}

export default FilterStatus;
