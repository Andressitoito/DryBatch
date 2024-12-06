import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateUser = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword && data.password === data.thirdPassword) {
      try {
        const response = await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            lastname: data.lastname,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Hubo un problema al registrar el usuario.");
      }
    } else {
      alert("Las contraseñas no coinciden.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-background rounded shadow">
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
          <label className="block text-textSecondary">Repetir Contraseña (por tercera vez)</label>
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
        <button className="bg-primary text-white py-2 px-4 rounded">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
