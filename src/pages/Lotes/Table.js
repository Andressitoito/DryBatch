import React from "react";

const Table = ({ measurements }) => {
  return (
    <div className="overflow-x-auto">
      {measurements.slice(0).reverse().map((measurementGroup, groupIndex) => {
        const totalInitialGross = measurementGroup.reduce((acc, cur) => acc + cur.initialGross, 0);
        const totalCurrentGross = measurementGroup.reduce((acc, cur) => acc + cur.currentGross, 0);
        const totalNetWeight = measurementGroup.reduce((acc, cur) => acc + (cur.currentGross - cur.tare), 0);
        const totalWeightLoss = measurementGroup.reduce((acc, cur) => acc + ((cur.initialGross - cur.tare) - (cur.currentGross - cur.tare)), 0);

        return (
          <div key={groupIndex} className="mb-6 border-b-2 border-gray-800 pb-4">
            {/* Title for Each Data Block */}
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="px-4 py-2 border align-middle">Contenedor</th>
                  <th className="px-4 py-2 border align-middle">Tara (kg)</th>
                  <th className="px-4 py-2 border align-middle">Peso Bruto Inicial (kg)</th>
                  <th className="px-4 py-2 border align-middle">Peso Bruto Actual (kg)</th>
                  <th className="px-4 py-2 border align-middle">Pérdida de Peso (kg)</th>
                  <th className="px-4 py-2 border align-middle">Peso Neto (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-200 font-semibold italic align-middle">
                  <td className="px-4 py-2 border text-left" colSpan={2}>
                    {new Date(measurementGroup[0].timestamp).toLocaleDateString('es-ES', {
                      weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
                    }).replace(',', ' ')} - Usuario Actual
                  </td>
                  <td className="px-4 py-2 border text-center align-middle">{totalInitialGross.toFixed(2)}</td>
                  <td className="px-4 py-2 border text-center align-middle">{totalCurrentGross.toFixed(2)}</td>
                  <td className="px-4 py-2 border text-center align-middle">
                    <span className={totalWeightLoss > 0 ? 'text-green-600 font-bold text-xl' : 'text-red-600 font-bold text-xl'}>
                      <span className="text-2xl font-bold">{totalWeightLoss > 0 ? '↓' : '↑'}</span> <span className="text-base">{Math.abs(totalWeightLoss).toFixed(2)}</span>
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-center align-middle">{totalNetWeight.toFixed(2)}</td>
                </tr>
                {/* Data Rows */}
                {measurementGroup.map((measurement, index) => {
                  const netWeight = measurement.currentGross - measurement.tare;
                  const initialNetWeight = measurement.initialGross - measurement.tare;
                  const weightLoss = initialNetWeight - netWeight;
                  return (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                      <td className="px-4 py-2 border text-center align-middle">{measurement.container}</td>
                      <td className="px-4 py-2 border text-center align-middle">{measurement.tare}</td>
                      <td className="px-4 py-2 border text-center align-middle">{measurement.initialGross}</td>
                      <td className="px-4 py-2 border text-center align-middle">{measurement.currentGross}</td>
                      <td className="px-4 py-2 border text-center align-middle">
                        <span className={weightLoss > 0 ? 'text-green-600 font-bold text-xl' : 'text-red-600 font-bold text-xl'}>
                          <span className="text-2xl font-bold">{weightLoss > 0 ? '↓' : '↑'}</span> <span className="text-base">{Math.abs(weightLoss).toFixed(2)}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2 border text-center align-middle">{netWeight.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
