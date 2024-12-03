import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewProductModal = ({ isOpen, onClose, addProduct, existingProductCodes = [] }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      productName: "",
      productCode: "",
      containers: [{ tare: "", initialGross: "" }],
    },
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
    console.log("Submitted data:", data);  // Debugging log to inspect form data

    // Ensure containers is defined as an array
    if (!data.containers || !Array.isArray(data.containers)) {
      alert("Error: Containers data is missing or not an array.");
      return;
    }

    const productCodes = existingProductCodes || [];

    // Validate if product code is unique
    if (productCodes.includes(data.productCode)) {
      alert("El código del producto ya existe. Por favor ingrese un código único.");
      return;
    }

    addProduct(data);  // Passing the entire data object to the parent handler
    reset(); // Clear the form after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Nombre del Producto</label>
            <input
              type="text"
              {...register("productName", { required: "Este campo es obligatorio" })}
              className={`border p-2 w-full ${errors.productName ? 'border-red-500' : ''}`}
              placeholder="Ingrese el nombre del producto"
            />
            {errors.productName && (
              <span className="text-red-500 text-sm">{errors.productName.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Código del Producto (00000 - 99999)</label>
            <input
              type="text"
              {...register("productCode", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "El código debe ser un número de 5 dígitos (00000 - 99999)",
                },
              })}
              className={`border p-2 w-full ${errors.productCode ? 'border-red-500' : ''}`}
              placeholder="Ingrese el código del producto (00000 - 99999)"
            />
            {errors.productCode && (
              <span className="text-red-500 text-sm">{errors.productCode.message}</span>
            )}
          </div>

          <h3 className="text-lg font-bold mb-2">Bandejas</h3>
          {/* Handling a static number of containers (only one for now) */}
          <div className="mb-2">
            <label className="block mb-1">Tara de la Bandeja 1 (kg)</label>
            <input
              type="number"
              {...register("containers.0.tare", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]+(\.[0-9]*)?$/,
                  message: "Ingrese un número válido",
                },
              })}
              className={`border p-2 w-full mb-2 ${errors?.containers?.[0]?.tare ? 'border-red-500' : ''}`}
              placeholder="Ingrese la tara de la bandeja"
            />
            {errors?.containers?.[0]?.tare && (
              <span className="text-red-500 text-sm">{errors.containers[0].tare.message}</span>
            )}

            <label className="block mb-1">Peso Bruto Inicial (kg)</label>
            <input
              type="number"
              {...register("containers.0.initialGross", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]+(\.[0-9]*)?$/,
                  message: "Ingrese un número válido",
                },
              })}
              className={`border p-2 w-full ${errors?.containers?.[0]?.initialGross ? 'border-red-500' : ''}`}
              placeholder="Ingrese el peso bruto inicial"
            />
            {errors?.containers?.[0]?.initialGross && (
              <span className="text-red-500 text-sm">{errors.containers[0].initialGross.message}</span>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="bg-gray-500 text-white p-2 rounded mr-2"
            >
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
