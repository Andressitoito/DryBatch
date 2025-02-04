import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const CreateUser = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [successMessage, setSuccessMessage] = useState(""); // State for messages
  const [messageType, setMessageType] = useState(""); // State to track success or error
  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword && data.password === data.thirdPassword) {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`https://lumpy-wax-cello.glitch.me/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            lastname: data.lastname,
            password: data.password,
            token: data.token,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccessMessage("Usuario creado exitosamente.");
          setMessageType("success"); // Mark as success
          setTimeout(() => {
            navigate("/lotes");
          }, 3000);
        } else {
          setSuccessMessage(result.error || "Hubo un error en el registro.");
          setMessageType("error"); // Mark as error
        }
      } catch (error) {
        console.error("Error creating user:", error);
        setSuccessMessage("Hubo un problema al registrar el usuario.");
        setMessageType("error"); // Mark as error
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuccessMessage("Las contraseñas no coinciden.");
      setMessageType("error"); // Mark as error
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto my-5 bg-background rounded shadow relative">
      <h2 className="text-2xl font-bold text-primary">Crear Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-textSecondary">Nombre</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es requerido" })}
            className="border rounded w-full p-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-textSecondary">Apellido</label>
          <input
            type="text"
            {...register("lastname", { required: "El apellido es requerido" })}
            className="border rounded w-full p-2"
          />
          {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
        </div>
        <div>
          <label className="block text-textSecondary">Token</label>
          <input
            type="text"
            {...register("token", { required: "El token es requerido" })}
            className="border rounded w-full p-2"
          />
          {errors.token && <p className="text-red-500">{errors.token.message}</p>}
        </div>
        <div>
          <label className="block text-textSecondary">Contraseña</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
              className="border rounded w-full p-2"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-2 text-primary"
            >
              {passwordVisible ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-textSecondary">Repetir Contraseña</label>
          <input
            type={passwordVisible ? "text" : "password"}
            {...register("confirmPassword", {
              required: "La confirmación es requerida",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
            className="border rounded w-full p-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div>
          <label className="block text-textSecondary">Repetir Contraseña</label>
          <input
            type={passwordVisible ? "text" : "password"}
            {...register("thirdPassword", {
              required: "La confirmación es requerida",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
            className="border rounded w-full p-2"
          />
          {errors.thirdPassword && (
            <p className="text-red-500">{errors.thirdPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded flex items-center justify-center"
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
          {isLoading ? "Creando..." : "Crear Usuario"}
        </button>
      </form>

      {/* Success/Error Notification */}
      {successMessage && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded text-white text-center ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CreateUser;
