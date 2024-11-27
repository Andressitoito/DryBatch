const Login = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Usuario</label>
          <input type="text" className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block text-gray-700">Contraseña</label>
          <input type="password" className="border rounded w-full p-2" />
        </div>
        <button className="bg-blue-700 text-white py-2 px-4 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
