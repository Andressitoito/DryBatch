import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { useUser } from "../../contexts/UserContext";

const NewProductModal = ({ isOpen, onClose, addProduct }) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      productName: "",
      productCode: "",
      containers: [{ tare: "", initialGross: "" }],
    },
    mode: "onBlur"
  });
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // useFieldArray to handle dynamic fields for containers
  const { fields, append, remove } = useFieldArray({
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

  const onSubmit = async (data) => {
    setIsLoading(true)
    const newProduct = {
      name: data.productName,
      code: data.productCode,
      createdAt: new Date().toISOString(),
      measurements: [
        {
          timestamp: new Date().toISOString(),
          lastUpdatedBy: user.username || "Usuario Actual",
          containers: data.containers.map((container) => ({
            tare: parseInt(container.tare),
            initialGross: parseInt(container.initialGross),
            currentGross: parseInt(container.initialGross),
            lastChange: 0,
          })),
        },
      ],
    };

    try {

      await addProduct(newProduct);
      reset();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded-lg w-full md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Nombre del Producto</label>
            <input
              type="text"
              {...register("productName", { required: "Este campo es obligatorio" })}
              className={`border p-2 w-full ${errors.productName ? "border-red-500" : ""}`}
              placeholder="Ingrese el nombre del producto"
            />
            {errors.productName && (
              <span className="text-red-500 text-sm">{errors.productName.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Lote de Producto (00000 - 99999)</label>
            <input
              type="text"
              {...register("productCode", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^\d{5}$/, // Asegura exactamente 5 dígitos numéricos
                  message: "El lote debe ser un número de 5 dígitos (00000 - 99999)",
                },
                validate: (value) => /^\d{5}$/.test(value) || "El lote debe contener exactamente 5 dígitos",
              })}
              className={`border p-2 w-full ${errors.productCode ? "border-red-500" : ""}`}
              placeholder="Ingrese el lote del producto (00000 - 99999)"
              maxLength={5} // Evita más de 5 caracteres
            />
            {errors.productCode && (
              <span className="text-red-500 text-sm">{errors.productCode.message}</span>
            )}
          </div>


          <h3 className="text-lg font-bold mb-2">Bandejas</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 border p-4 rounded-lg flex items-center gap-4">
              <div className="flex-1">
                <label className="block mb-1">Tara de la bandeja (gr)</label>
                <input
                  type="number"
                  {...register(`containers.${index}.tare`, {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]*)?$/,
                      message: "Ingrese un número válido",
                    },
                  })}
                  className={`border p-2 w-full mb-2 ${errors?.containers?.[index]?.tare ? "border-red-500" : ""
                    }`}
                  placeholder="Ingrese la tara de la bandeja"
                />
                {errors?.containers?.[index]?.tare && (
                  <span className="text-red-500 text-sm">
                    {errors.containers[index].tare.message}
                  </span>
                )}

                <label className="block mb-1">Peso Bruto Inicial (gr)</label>
                <input
                  type="number"
                  {...register(`containers.${index}.initialGross`, {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]*)?$/,
                      message: "Ingrese un número válido",
                    },
                  })}
                  className={`border p-2 w-full ${errors?.containers?.[index]?.initialGross ? "border-red-500" : ""
                    }`}
                  placeholder="Ingrese el peso bruto inicial"
                />
                {errors?.containers?.[index]?.initialGross && (
                  <span className="text-red-500 text-sm">
                    {errors.containers[index].initialGross.message}
                  </span>
                )}
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-gray-400 text-white p-1.5 rounded-full flex items-center justify-center"
                  title="Eliminar Bandeja"
                  style={{ fontSize: "24px" }}
                >
                  <AiOutlineDelete size={24} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ tare: "", initialGross: "" })}
            className="bg-blue-500 text-white p-1.5 rounded-full flex items-center justify-center mt-2"
            title="Añadir Bandeja"
            style={{ fontSize: "24px" }}
          >
            <AiOutlinePlus size={24} />
          </button>

          <div className="flex justify-end mt-4">
            {!isLoading && (
              <button
                disabled={isLoading}
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="bg-gray-400 text-white p-2 rounded mr-2"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={isLoading}
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {isLoading ? "Creando..." : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>


  );
};

export default NewProductModal;
