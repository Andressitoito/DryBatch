import React from "react";
import { useForm, Controller } from "react-hook-form";

const Modal = ({ isOpen, onClose, containers = [], addMeasurement }) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (!containers || containers.length === 0) {
      console.error("No containers available to update.");
      return;
    }

    const newMeasurement = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      lastUpdatedBy: "Usuario Actual",
      containers: containers.map((container, index) => ({
        tare: container.tare,
        initialGross: container.initialGross,
        currentGross: parseFloat(data[`measurement_${index}`]),
      })),
    };
    
    addMeasurement(newMeasurement);
    reset(); // Clear the form after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/4 md:w-1/4 lg:w-1/4">
        <h2 className="text-xl font-bold mb-4">Agregar Próxima Medición</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {containers.length > 0 ? (
            containers.map((container, index) => (
              <div key={index} className="mb-2">
                <label className="block mb-1">
                  {`Contenedor ${index + 1}`} (Tara: {container.tare.toFixed(2)} kg)
                </label>
                <Controller
                  name={`measurement_${index}`}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]*)?$/,
                      message: "Ingrese un número válido",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className={`border p-2 w-full ${errors[`measurement_${index}`] ? 'border-red-500' : ''}`}
                      placeholder={`Ingrese el peso bruto actual para el contenedor ${index + 1}`}
                    />
                  )}
                />
                {errors[`measurement_${index}`] && (
                  <span className="text-red-500 text-sm">
                    {errors[`measurement_${index}`].message}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p>No hay contenedores disponibles para actualizar.</p>
          )}
          <div className="flex justify-end mt-4">
            <button type="button" onClick={() => { reset(); onClose(); }} className="bg-gray-500 text-white p-2 rounded mr-2">
              Cancelar
            </button>
            <button type="submit" className="bg-primary text-white p-2 rounded">
              Actualizar control
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
