import React from "react";

const Table = ({ measurements }) => {
  return (
    <div className="overflow-x-auto">
      {measurements &&
        measurements.length > 0 &&
        measurements
          .slice(0)
          .reverse()
          .map((measurement, groupIndex) => {
            // Access the "Containers" array from the current measurement
            const containers = measurement.Containers;

            // // Calculate totals for the current measurement
            // const totalInitialGross = containers.reduce(
            //   (acc, cur) => acc + cur.initialGross,
            //   0
            // );
            // const totalCurrentGross = containers.reduce(
            //   (acc, cur) => acc + cur.currentGross,
            //   0
            // );
            // const totalNetWeight = containers.reduce(
            //   (acc, cur) => acc + (cur.currentGross - cur.tare),
            //   0
            // );
            // const totalWeightLoss = containers.reduce(
            //   (acc, cur) =>
            //     acc +
            //     (cur.initialGross - cur.tare - (cur.currentGross - cur.tare)),
            //   0
            // );

            // Reference to the previous measurement, if it exists
            const previousMeasurement = measurements[groupIndex + 1];
            const previousContainers = previousMeasurement?.Containers || [];

            return (
              <div
                key={groupIndex}
                className="mb-6 border-b-2 border-gray-800 pb-4"
              >
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 font-semibold">
                    <tr>
                      <th className="px-4 py-2 border align-middle">Tara (kg)</th>
                      <th className="px-4 py-2 border align-middle">
                        Peso Bruto Inicial (kg)
                      </th>
                      <th className="px-4 py-2 border align-middle">
                        Peso Bruto Actual (kg)
                      </th>
                      <th className="px-4 py-2 border align-middle">
                        Pérdida de Peso (kg)
                      </th>
                      <th className="px-4 py-2 border align-middle">
                        Cambio desde Anterior (kg)
                      </th>
                      <th className="px-4 py-2 border align-middle">
                        Peso Neto (kg)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {containers.map((container, index) => {
                      const netWeight = container.currentGross - container.tare;
                      const initialNetWeight =
                        container.initialGross - container.tare;
                      const weightLoss = initialNetWeight - netWeight;

                      // Calculate the difference from the previous measurement
                      const previousContainer = previousContainers[index];
                      let differenceSinceLast = null;
                      if (previousContainer) {
                        differenceSinceLast =
                          container.currentGross - previousContainer.currentGross;
                      }

                      return (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } hover:bg-gray-200`}
                        >
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
                            {differenceSinceLast !== null &&
                            differenceSinceLast !== 0 ? (
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
                    <tr className="font-semibold italic align-middle">
                      <td
                        className="px-4 py-2 border text-left"
                        colSpan={3}
                      >
                        {measurement.lastUpdatedBy}
                      </td>
                      <td
                        className="px-4 py-2 border text-left"
                        colSpan={3}
                      >
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
