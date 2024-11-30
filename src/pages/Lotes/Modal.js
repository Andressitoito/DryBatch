import React, { useState } from "react";

const Modal = ({ isOpen, onClose, measurements, addMeasurement }) => {
  const [currentGrossValues, setCurrentGrossValues] = useState(
    measurements.map(() => "")
  );
  const [activeTab, setActiveTab] = useState("update");
  const [updatedGrossValues, setUpdatedGrossValues] = useState(
    measurements.map(() => "")
  );

  const handleChange = (index, value, type) => {
    if (type === "update") {
      const newValues = [...currentGrossValues];
      newValues[index] = value;
      setCurrentGrossValues(newValues);
    } else if (type === "gross") {
      const newGrossValues = [...updatedGrossValues];
      newGrossValues[index] = value;
      setUpdatedGrossValues(newGrossValues);
    }
  };

  const handleSubmit = () => {
    if (activeTab === "update") {
      addMeasurement(currentGrossValues);
    } else if (activeTab === "gross") {
      addMeasurement(updatedGrossValues);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full md:w-1/4 lg:w-3/4">
        <div className="flex mb-4">
          <button
            className={`flex-1 p-2 ${
              activeTab === "update" ? "bg-accent text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("update")}
          >
            Actualizar Peso Bruto
          </button>
          <button
            className={`flex-1 p-2 ${
              activeTab === "gross" ? "bg-accent text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("gross")}
          >
            Ajustar por Muestra
          </button>
        </div>
        {activeTab === "update" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Agregar Próxima Medición</h2>
            {measurements.map((measurement, index) => (
              <div key={index} className="mb-2">
                <label className="block mb-1">
                  {measurement.container} (Tara: {measurement.tare.toFixed(2)} kg)
                </label>
                <input
                  type="number"
                  value={currentGrossValues[index]}
                  onChange={(e) => handleChange(index, e.target.value, "update")}
                  className="border p-2 w-full"
                  placeholder={`Ingrese el peso bruto actual para ${measurement.container}`}
                />
              </div>
            ))}
          </div>
        )}
        {activeTab === "gross" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Ajustar Peso Bruto por Toma de Muestra</h2>
            {measurements.map((measurement, index) => (
              <div key={index} className="mb-2">
                <label className="block mb-1">
                  {measurement.container} (Tara: {measurement.tare.toFixed(2)} kg)
                </label>
                <input
                  type="number"
                  value={updatedGrossValues[index]}
                  onChange={(e) => handleChange(index, e.target.value, "gross")}
                  className="border p-2 w-full"
                  placeholder={`Ingrese el ajuste de peso para ${measurement.container}`}
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded mr-2">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="bg-primary text-white p-2 rounded">
            Actualizar control
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;