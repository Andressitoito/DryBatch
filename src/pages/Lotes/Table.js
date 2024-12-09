import React from "react";

const Table = ({ measurements }) => {
  if (!measurements || measurements.length === 0) return <p>No hay mediciones disponibles.</p>;

  const calculateTimeElapsed = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const elapsedMs = end - start;
    return (elapsedMs / (1000 * 60 * 60)).toFixed(1); // Convert ms to hours with one decimal
  };

  return (
    <div className="overflow-x-auto">
      {measurements
        .slice() // Copy the array
        .map((measurement, groupIndex) => {
          // Sort containers by `tare` and then by `id` for consistency
          const containers = [...measurement.Containers].sort((a, b) => {
            if (a.tare !== b.tare) return a.tare - b.tare;
            return a.id - b.id;
          });

          // Calculate totals for the current measurement
          const totalTare = containers.reduce((acc, cur) => acc + cur.tare, 0);
          const totalInitialGross = containers.reduce((acc, cur) => acc + cur.initialGross, 0);
          const totalCurrentGross = containers.reduce((acc, cur) => acc + cur.currentGross, 0);
          const totalNetWeight = containers.reduce((acc, cur) => acc + (cur.currentGross - cur.tare), 0);
          const totalWeightLoss = containers.reduce(
            (acc, cur) => acc + (cur.initialGross - cur.tare - (cur.currentGross - cur.tare)),
            0
          );

          // Get the previous measurement to calculate differences
          const previousMeasurement = measurements[groupIndex + 1];
          const previousContainers = previousMeasurement?.Containers || [];
          const totalTimeElapsed =
            groupIndex === 0
              ? calculateTimeElapsed(measurements[measurements.length - 1].timestamp, measurement.timestamp)
              : null;

          return (
            <div key={groupIndex} className="mb-6 border-b-2 border-gray-800 pb-4">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100 font-semibold">
                  <tr>
                    <th className="px-4 py-2 border align-middle">Tara (gr)</th>
                    <th className="px-4 py-2 border align-middle">Peso Bruto Inicial (gr)</th>
                    <th className="px-4 py-2 border align-middle">Peso Bruto Actual (gr)</th>
                    <th className="px-4 py-2 border align-middle">Pérdida de Peso (gr)</th>
                    <th className="px-4 py-2 border align-middle">Cambio desde Anterior (gr)</th>
                    <th className="px-4 py-2 border align-middle">Peso Neto (gr)</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((container, index) => {
                    const netWeight = container.currentGross - container.tare;
                    const initialNetWeight = container.initialGross - container.tare;
                    const weightLoss = initialNetWeight - netWeight;

                    // Calculate the difference from the previous measurement
                    const previousContainer = previousContainers[index];
                    const differenceSinceLast = previousContainer
                      ? container.currentGross - previousContainer.currentGross
                      : null;

                    return (
                      <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                        <td className="px-4 py-2 border text-center align-middle">
                          {container.tare.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 border text-center align-middle">
                          {container.initialGross.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 border text-center align-middle">
                          {container.currentGross.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 border text-center align-middle">
                          {weightLoss !== 0 ? (
                            <span
                              className={
                                weightLoss > 0
                                  ? "text-green-600 font-bold text-xl"
                                  : "text-red-600 font-bold text-xl"
                              }
                            >
                              <span className="text-2xl font-bold">
                                {weightLoss > 0 ? "↓" : "↑"}
                              </span>{" "}
                              <span className="text-base">
                                {Math.abs(weightLoss).toFixed(2)}
                              </span>
                            </span>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td className="px-4 py-2 border text-center align-middle">
                          {differenceSinceLast !== null ? (
                            <span
                              className={
                                differenceSinceLast < 0
                                  ? "text-green-600 font-bold text-xl"
                                  : "text-red-600 font-bold text-xl"
                              }
                            >
                              <span className="text-2xl font-bold">
                                {differenceSinceLast < 0 ? "↓" : "↑"}
                              </span>{" "}
                              <span className="text-base">
                                {Math.abs(differenceSinceLast).toFixed(2)}
                              </span>
                            </span>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td className="px-4 py-2 border text-center align-middle">
                          {netWeight.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Total row */}
                  <tr className="font-semibold italic align-middle bg-gray-200">
                    <td className="px-4 py-2 border text-center">
                      {totalTare.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {totalInitialGross.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {totalCurrentGross.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {totalWeightLoss.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border text-center">-</td>
                    <td className="px-4 py-2 border text-center">
                      {totalNetWeight.toFixed(2)}
                    </td>
                  </tr>
                  {/* Last row with user and timestamp */}
                  <tr className="font-semibold italic align-middle">
                    <td className="px-4 py-2 border text-left" colSpan={2}>
                      {measurement.lastUpdatedBy}
                    </td>
                    <td className="px-4 py-2 border text-left" colSpan={3}>
                      {new Date(measurement.timestamp)
                        .toLocaleDateString("es-ES", {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        .replace(",", " ")}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {groupIndex === 0 && totalTimeElapsed
                        ? `${totalTimeElapsed} hs`
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
};

export default Table;
