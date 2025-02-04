import React from "react";

const About = () => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="container mx-auto space-y-8">
        {/* Header Section */}
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800">El alma humana en un mundo de riesgos químicos</h1>
          <p className="text-lg text-gray-600 italic mt-4">
            Entre vapores tóxicos y el eco de órdenes imperiosas, son aquellos de la escala mas baja quienes sostienen
            el delicado equilibrio, enfrentándose al peligro con manos temblorosas pero firmes.
          </p>
        </header>

        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">El Entorno Químico</h2>
            <p className="text-gray-600 mt-4">
              Rodeados de cristales frágiles y reactores impredecibles, los operarios caminan una línea
              invisible entre precisión y tragedia. Cada frasco, cada tubo, puede ser el inicio de algo
              grandioso o un error irremediable.
            </p>
            <p className="text-gray-600 mt-2">
              En su anonimato, doblan sus cuerpos bajo la constante amenaza, sin otra guía que no sea el
              eco de órdenes imperiosas que resuenan como un destino ineludible. Son aquellos que no tienen
              nadie bajo su mando, los que obedecen sin pausa, quienes verdaderamente llevan el peso del sistema.
            </p>
          </div>
          <div>
            <img
              src="/images/us1.jpg"
              alt="El Entorno Químico"
              className="w-full max-h-[200px] object-cover rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src="/images/us2.jpg"
              alt="El Ingenio en el Abismo"
              className="w-full max-h-[200px] object-cover rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold text-gray-700">El Ingenio en el Abismo</h2>
            <p className="text-gray-600 mt-4">
              Entre cristales quebradizos y el murmullo del riesgo, surgen las mentes más creativas.
              Los operarios, olvidados por las comodidades, encuentran soluciones mientras su piel siente
              el peso del ambiente químico que los envuelve.
            </p>
            <p className="text-gray-600 mt-2">
              Cada improvisación es un acto de resistencia, cada pequeño logro un poema trágico escrito
              con sudor, esfuerzo y una esperanza tenue que apenas se atreve a existir.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">El Corazón Invisible</h2>
            <p className="text-gray-600 mt-4">
              No tienen nombres grabados en mármol ni canciones que canten su esfuerzo. Los operarios más
              humildes, aquellos que trabajan bajo las sombras, llevan la carga de un sistema que depende
              de su sufrimiento silencioso.
            </p>
            <p className="text-gray-600 mt-2">
              Sus manos, agrietadas y fuertes, sostienen el peso de una industria que nunca duerme,
              entregando su ser a una maquinaria que rara vez les devuelve algo.
            </p>
          </div>
          <div>
            <img
              src="/images/us3.jpg"
              alt="El Corazón Invisible"
              className="w-full max-h-[200px] object-cover rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            />
          </div>
        </div>

        {/* Call to Action */}
        <footer className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-800"> </h3>
          <p className="text-gray-600 mt-4 italic">
            En un mundo de riesgos y sacrificios invisibles, debemos recordar y valorar a aquellos que
            enfrentan los desafíos más peligrosos con una valentía que no tiene precio.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
