import React from "react";

const Table = ({ measurements }) => {
  if (!measurements || measurements.length === 0)
    return <p></p>;

  const formatNumber = (value) => {
    if (isNaN(value)) return "-";
    const hasDecimal = Math.round(value * 10) % 10 !== 0;
    return new Intl.NumberFormat("sv-SE", {
      minimumFractionDigits: hasDecimal ? 1 : 0,
      maximumFractionDigits: hasDecimal ? 1 : 0,
    }).format(value);
  };

  const calculateTimeElapsed = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }
    const elapsedMs = Math.abs(end - start);
    const hours = elapsedMs / (1000 * 60 * 60);
    return formatNumber(hours);
  };

  return (
    <div className="overflow-x-auto">
      {measurements.slice().map((measurement, groupIndex) => {
        // Sort containers by tare then by id for consistency
        const containers = [...measurement.Containers].sort((a, b) => {
          if (a.tare !== b.tare) return a.tare - b.tare;
          return a.id - b.id;
        });

        // Calculate totals for the current measurement
        const totalTare = containers.reduce((acc, cur) => acc + cur.tare, 0);
        const totalInitialGross = containers.reduce(
          (acc, cur) => acc + cur.initialGross,
          0
        );
        const totalCurrentGross = containers.reduce(
          (acc, cur) => acc + cur.currentGross,
          0
        );
        const totalNetWeight = containers.reduce(
          (acc, cur) => acc + (cur.currentGross - cur.tare),
          0
        );
        // Updated: Weight loss is now initialGross minus currentGross
        const totalWeightLoss = containers.reduce(
          (acc, cur) => acc + (cur.initialGross - cur.currentGross),
          0
        );

        // Get the previous measurement (next in array since measurements are ordered latest to oldest)
        const previousMeasurement = measurements[groupIndex + 1];
        const totalTimeElapsed = previousMeasurement
          ? calculateTimeElapsed(
            previousMeasurement.timestamp,
            measurement.timestamp
          )
          : null;

        return (
          <div
            key={groupIndex}
            className="mb-6 border-b-2 border-gray-800 pb-4"
          >
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="px-4 py-2 border align-middle">
                    Tara (gr)
                  </th>
                  <th className="px-4 py-2 border align-middle">
                    Peso Bruto Inicial (gr)
                  </th>
                  <th className="px-4 py-2 border align-middle">
                    Peso Bruto Actual (gr)
                  </th>
                  <th className="px-4 py-2 border align-middle">
                    Pérdida de Peso (gr)
                  </th>
                  <th className="px-4 py-2 border align-middle">
                    Cambio desde Anterior (gr)
                  </th>
                  <th className="px-4 py-2 border align-middle">
                    Peso Neto Actual (gr)
                  </th>
                </tr>
              </thead>
              <tbody>
                {containers.map((container, index) => {
                  // Net weight: currentGross minus tare
                  const netWeight = container.currentGross - container.tare;
                  // Weight loss: initialGross minus currentGross
                  const weightLoss = container.initialGross - container.currentGross;

                  // Calculate the difference from the previous measurement's container (if exists)
                  const previousContainer = previousMeasurement?.Containers[index];
                  const differenceSinceLast = previousContainer
                    ? container.currentGross - previousContainer.currentGross
                    : null;

                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-4 py-2 border text-center align-middle">
                        {formatNumber(container.tare)}
                      </td>
                      <td className="px-4 py-2 border text-center align-middle">
                        {formatNumber(container.initialGross)}
                      </td>
                      <td className="px-4 py-2 border text-center align-middle">
                        {formatNumber(container.currentGross)}
                      </td>
                      <td className="px-4 py-2 border text-center align-middle">
                        {weightLoss !== 0 ? (
                          <span
                            className={
                              weightLoss > 0
                                ? "inline-flex items-center text-green-600 font-bold text-xl"
                                : "inline-flex items-center text-red-600 font-bold text-xl"
                            }
                          >
                            {weightLoss > 0 ? "↓" : "↑"}
                            <span className="ml-1 text-base">
                              {formatNumber(Math.abs(weightLoss))}
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
                                ? "inline-flex items-center text-green-600 font-bold text-xl"
                                : "inline-flex items-center text-red-600 font-bold text-xl"
                            }
                          >
                            {differenceSinceLast < 0 ? "↓" : "↑"}
                            <span className="ml-1 text-base">
                              {formatNumber(Math.abs(differenceSinceLast))}
                            </span>
                          </span>
                        ) : (
                          "0"
                        )}
                      </td>
                      <td className="px-4 py-2 border text-center align-middle">
                        {formatNumber(netWeight)}
                      </td>
                    </tr>
                  );
                })}

                {/* Totals row */}
                <tr className="font-semibold italic align-middle bg-gray-200">
                  <td className="px-4 py-2 border text-center">
                    {formatNumber(totalTare)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {formatNumber(totalInitialGross)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {formatNumber(totalCurrentGross)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {formatNumber(totalWeightLoss)}
                  </td>
                  <td className="px-4 py-2 border text-center">-</td>
                  <td className="px-4 py-2 border text-center">
                    {formatNumber(totalNetWeight)}
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
                    <span>
                      {totalTimeElapsed ? `${totalTimeElapsed}hs` : "Inicio"}
                    </span>
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
