import React from "react";

const Table = ({ measurements }) => {
  return (
    <div className="overflow-x-auto">
      {measurements && measurements.length > 0 && measurements.slice(0).reverse().map((measurement, groupIndex) => {
        // We should access the "Containers" array, not "containers"
        const containers = measurement.Containers;

        // Calculate totals from containers array
        const totalInitialGross = containers.reduce((acc, cur) => acc + cur.initialGross, 0);
        const totalCurrentGross = containers.reduce((acc, cur) => acc + cur.currentGross, 0);
        const totalNetWeight = containers.reduce((acc, cur) => acc + (cur.currentGross - cur.tare), 0);
        const totalWeightLoss = containers.reduce((acc, cur) => acc + ((cur.initialGross - cur.tare) - (cur.currentGross - cur.tare)), 0);
        const totalLossSinceLast = containers.reduce((acc, cur) => acc + (cur.lossSinceLast || 0), 0);

        return (
          <div key={groupIndex} className="mb-6 border-b-2 border-gray-800 pb-4">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="px-4 py-2 border align-middle">Contenedor</th>
                  <th className="px-4 py-2 border align-middle">Tara (kg)</th>
                  <th className="px-4 py-2 border align-middle">Peso Bruto Inicial (kg)</th>
                  <th className="px-4 py-2 border align-middle">Peso Bruto Actual (kg)</th>
                  <th className="px-4 py-2 border align-middle">Pérdida de Peso (kg)</th>
                  <th className="px-4 py-2 border align-middle">Cambio desde Anterior (kg)</th>
                  <th className="px-4 py-2 border align-middle">Peso Neto (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-200 font-semibold italic align-middle">
                  <td className="px-4 py-2 border text-left" colSpan={2}>
                    {new Date(measurement.timestamp).toLocaleDateString('es-ES', {
                      weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
                    }).replace(',', ' ')} - {measurement.lastUpdatedBy}
                  </td>
                  <td className="px-4 py-2 border text-center align-middle">{totalInitialGross.toFixed(2)}</td>
                  <td className="px-4 py-2 border text-center align-middle">{totalCurrentGross.toFixed(2)}</td>
                  <td className="px-4 py-2 border text-center align-middle">
                    {totalWeightLoss !== 0 ? (
                      <span className={totalWeightLoss > 0 ? 'text-green-600 font-bold text-xl' : 'text-red-600 font-bold text-xl'}>
                        <span className="text-2xl font-bold">{totalWeightLoss > 0 ? '↓' : '↑'}</span> <span className="text-base">{Math.abs(totalWeightLoss).toFixed(2)}</span>
                      </span>
                    ) : (
                      "0"
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center align-middle">
                    {totalLossSinceLast !== 0 ? (
                      <span className={totalLossSinceLast > 0 ? 'text-green-600 font-bold text-xl' : 'text-red-600 font-bold text-xl'}>
                        <span className="text-2xl font-bold">{totalLossSinceLast > 0 ? '↓' : '↑'}</span> <span className="text-base">{Math.abs(totalLossSinceLast).toFixed(2)}</span>
                      </span>
                    ) : (
                      "0"
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center align-middle">{totalNetWeight.toFixed(2)}</td>
                </tr>
                {containers.map((container, index) => {
                  const netWeight = container.currentGross - container.tare;
                  const initialNetWeight = container.initialGross - container.tare;
                  const weightLoss = initialNetWeight - netWeight;
                  return (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                      <td className="px-4 py-2 border text-center align-middle">{`Contenedor ${index + 1}`}</td>
                      <td className="px-4 py-2 border text-center align-middle">{container.tare.toFixed(2)}</td>
                      <td className="px-4 py-2 border text-center align-middle">{container.initialGross.toFixed(2)}</td>
                      <td className="px-4 py-2 border text-center align-middle">{container.currentGross.toFixed(2)}</td>
                      <td className="px-4 py-2 border text-center align-middle">
                        {weightLoss !== 0 ? (
                          <span className={weightLoss > 0 ? 'text-green-600 font-bold text-xl' : 'text-red-600 font-bold text-xl'}>
                            <span className="text-2xl font-bold">{weightLoss > 0 ? '↓' : '↑'}</span> <span className="text-base">{Math.abs(weightLoss).toFixed(2)}</span>
                          </span>
                        ) : (
                          "0"
                        )}
                      </td>
                      <td className="px-4 py-2 border text-center align-middle">
                        {container.lossSinceLast !== undefined && container.lossSinceLast !== 0 ? (
                          <span className={container.lossSinceLast > 0 ? 'text-green-600 font-bold text-xl' : 'text-red-600 font-bold text-xl'}>
                            <span className="text-2xl font-bold">{container.lossSinceLast > 0 ? '↓' : '↑'}</span> <span className="text-base">{Math.abs(container.lossSinceLast).toFixed(2)}</span>
                          </span>
                        ) : (
                          "0"
                        )}
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
