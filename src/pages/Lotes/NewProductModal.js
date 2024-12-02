import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const NewProductModal = ({ isOpen, onClose, addProduct, existingProductCodes }) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      productName: "",
      productCode: "",
      containers: [{ tare: "", initialGross: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "containers",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        productName: "",
        productCode: "",
        containers: [{ tare: "", initialGross: "" }],
      });
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    if (data.productName && data.productCode && data.containers.every(c => c.tare && c.initialGross)) {
      // Check if productCode is unique
      if (existingProductCodes.includes(data.productCode)) {
        alert("El código del producto ya existe. Por favor ingrese un código único.");
        return;
      }

      // Transform data to be consistent with the structure used elsewhere in the app
      const newProduct = {
        id: Date.now(),
        name: data.productName,
        code: data.productCode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        Measurements: [
          {
            id: 1,
            timestamp: new Date().toISOString(),
            lastUpdatedBy: "Usuario Actual",
            containers: data.containers.map(container => ({
              tare: parseFloat(container.tare),
              initialGross: parseFloat(container.initialGross),
              currentGross: parseFloat(container.initialGross), // Set currentGross equal to initialGross initially
            })),
          },
        ],
      };

      addProduct(newProduct);
      reset(); // Clear the form after submission
      onClose();
    } else {
      alert("Por favor complete todos los campos para crear un nuevo producto.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Nombre del Producto</label>
            <Controller
              name="productName"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`border p-2 w-full ${errors.productName ? 'border-red-500' : ''}`}
                  placeholder="Ingrese el nombre del producto"
                />
              )}
            />
            {errors.productName && (
              <span className="text-red-500 text-sm">{errors.productName.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Código del Producto (00000 - 99999)</label>
            <Controller
              name="productCode"
              control={control}
              rules={{
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "El código debe ser un número de 5 dígitos (00000 - 99999)",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`border p-2 w-full ${errors.productCode ? 'border-red-500' : ''}`}
                  placeholder="Ingrese el código del producto (00000 - 99999)"
                />
              )}
            />
            {errors.productCode && (
              <span className="text-red-500 text-sm">{errors.productCode.message}</span>
            )}
          </div>
          <h3 className="text-lg font-bold mb-2">Bandejas</h3>
          {fields.map((container, index) => (
            <div key={container.id} className="mb-2">
              <label className="block mb-1">Tara de la Bandeja {index + 1} (kg)</label>
              <Controller
                name={`containers.${index}.tare`}
                control={control}
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
                    className={`border p-2 w-full mb-2 ${errors?.containers?.[index]?.tare ? 'border-red-500' : ''}`}
                    placeholder="Ingrese la tara de la bandeja"
                  />
                )}
              />
              {errors?.containers?.[index]?.tare && (
                <span className="text-red-500 text-sm">{errors.containers[index].tare.message}</span>
              )}
              <label className="block mb-1">Peso Bruto Inicial (kg)</label>
              <Controller
                name={`containers.${index}.initialGross`}
                control={control}
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
                    className={`border p-2 w-full ${errors?.containers?.[index]?.initialGross ? 'border-red-500' : ''}`}
                    placeholder="Ingrese el peso bruto inicial"
                  />
                )}
              />
              {errors?.containers?.[index]?.initialGross && (
                <span className="text-red-500 text-sm">{errors.containers[index].initialGross.message}</span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ tare: "", initialGross: "" })}
            className="bg-secondary text-white p-2 rounded mt-2"
          >
            + Agregar Bandeja
          </button>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={() => { reset(); onClose(); }} className="bg-gray-500 text-white p-2 rounded mr-2">
              Cancelar
            </button>
            <button type="submit" className="bg-primary text-white p-2 rounded">
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
