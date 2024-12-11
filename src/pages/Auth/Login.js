import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import apiService from "../../services/apiService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { updateUser } = useUser(); // Access updateUser from UserContext
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [serverError, setServerError] = useState(""); // Error message from server
  const navigate = useNavigate(); // React Router's navigation hook

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validate fields on change
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    setServerError(""); // Clear previous error message
    try {
      // Call the login API and get the response
      const result = await apiService.login(data); // Ensure apiService.login returns the response body
      // Log the response to verify its structure
      console.log("Login Response:", result);
  
      // Update user context with server response
      const { user } = result; // Extract the user object from the response
      console.log("from backend ", user)
      updateUser(user.name, user.lastname); // Update user context with name and lastname
     
      reset(); // Clear all input fields
      navigate("/lotes"); // Redirect after a brief delay
    } catch (error) {
      // Handle server error, set error message
      setServerError(error.response?.data?.error || "Error al iniciar sesión.");
      resetField("password"); // Clear only the password field
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-background rounded shadow">
      <h2 className="text-2xl font-bold text-primary">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-textSecondary">Nombre</label>
          <input
            type="text"
            {...register("name", {
              required: "El nombre es obligatorio", // Field is required
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
            className={`border rounded w-full p-2 ${
              errors.name ? "border-red-500" : ""
            }`}
            disabled={isLoading} // Disable input while loading
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-textSecondary">Apellido</label>
          <input
            type="text"
            {...register("lastname", {
              required: "El apellido es obligatorio", // Field is required
              minLength: {
                value: 2,
                message: "El apellido debe tener al menos 2 caracteres",
              },
            })}
            className={`border rounded w-full p-2 ${
              errors.lastname ? "border-red-500" : ""
            }`}
            disabled={isLoading} // Disable input while loading
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}
        </div>
        <div>
          <label className="block text-textSecondary">Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria", // Field is required
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
            className={`border rounded w-full p-2 ${
              errors.password ? "border-red-500" : ""
            }`}
            disabled={isLoading} // Disable input while loading
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}{" "}
        {/* Display server error */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded disabled:bg-gray-300 flex items-center"
            disabled={!isValid || isLoading} // Disable button if form is invalid or loading
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
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
