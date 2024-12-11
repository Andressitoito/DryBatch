import React from "react";

const Home = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800">Control de Medidas de Secado</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explorando las profundidades cuánticas del estado de secado y su impacto en la pureza y calidad del producto.
        </p>
      </header>

      {/* Mixed Content Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text and Image Block */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center md:text-left">El Intrincado Proceso del Secado</h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              El secado, en su forma más esencial, es un fenómeno termodinámico y molecular que implica la
              transición de un sistema humedecido hacia un estado de equilibrio con su entorno. Este proceso está
              gobernado por un entramado de fuerzas intermoleculares, flujos energéticos y, potencialmente, por
              fluctuaciones cuánticas en la distribución de partículas en fases gaseosas y líquidas. Un pequeño
              desajuste en este delicado balance puede perturbar la integridad material del producto final.
            </p>
            <div className="overflow-hidden rounded-lg shadow-lg w-full flex justify-center">
              <img
                src="/images/dry1.jpg"
                alt="Visualización del Proceso de Secado"
                loading="lazy"
                className="h-200 w-250 object-cover transform hover:scale-110 transition-transform duration-300 ease-in-out"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>

          {/* Text and Image Block */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center md:text-left">Impacto en la Pureza del Producto</h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Durante el proceso de secado, la evaporación de solventes no solo afecta la humedad relativa,
              sino también la distribución isotópica y la estructura cristalina de los compuestos. Cualquier
              irregularidad puede inducir defectos a nivel atómico, comprometiendo la pureza química y alterando
              la cinética de interacciones moleculares clave.
            </p>
            <div className="overflow-hidden rounded-lg shadow-lg w-full flex justify-center">
              <img
                src="/images/dry2.jpg"
                alt="Impacto Molecular"
                loading="lazy"
                className="h-200 w-250 object-cover transform hover:scale-110 transition-transform duration-300 ease-in-out"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>

          {/* Text and Image Block */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center md:text-left">La Precisión en las Medidas de Secado</h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              La metrología precisa del estado de secado es crucial para garantizar la estabilidad
              y la reproducibilidad del producto. Instrumentos avanzados capturan datos sobre la
              dinámica higroscópica y el gradiente termal, lo que permite evaluar la entropía del sistema
              con una exactitud cercana al límite cuántico de Heisenberg. Esta atención a los detalles
              asegura que cada lote alcance los estándares específicos requeridos para aplicaciones
              críticas.
            </p>
            <div className="overflow-hidden rounded-lg shadow-lg w-full flex justify-center">
              <img
                src="/images/dry3.jpg"
                alt="Mediciones Precisas"
                loading="lazy"
                className="h-200 w-250 object-cover transform hover:scale-110 transition-transform duration-300 ease-in-out"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>

          {/* Text and Image Block */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center md:text-left">Eficiencia en Secado</h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Durante el secado eficiente, se logran optimizar los recursos energéticos y mantener la calidad
              del producto final, asegurando su estabilidad y uniformidad para aplicaciones industriales o científicas.
            </p>
            <div className="overflow-hidden rounded-lg shadow-lg w-full flex justify-center">
              <img
                src="/images/dry4.jpg"
                alt="Eficiencia en Secado"
                loading="lazy"
                className="h-200 w-250 object-cover transform hover:scale-110 transition-transform duration-300 ease-in-out"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-4 text-center text-gray-500 border-t">
        <p>Copyright &copy; 2024 Control de Medidas de Secado. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;