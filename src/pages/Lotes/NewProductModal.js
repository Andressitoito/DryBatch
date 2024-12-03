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

  const onSubmit = async (data) => {
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

    try {
      await addProduct({
        name: data.productName,
        code: data.productCode,
        createdAt: new Date().toISOString(),
        measurements: [
          {
            timestamp: new Date().toISOString(),
            lastUpdatedBy: "Usuario Actual",
            containers: data.containers.map(container => ({
              tare: parseFloat(container.tare),
              initialGross: parseFloat(container.initialGross),
              currentGross: parseFloat(container.initialGross),
            })),
          },
        ],
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }

    reset(); // Clear the form after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ... the rest of the form fields ... */}
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
