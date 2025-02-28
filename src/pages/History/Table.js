import React from "react";

const Table = ({ delayEvents, initialTime }) => {
  if (!delayEvents || delayEvents.length === 0)
    return <p>No hay eventos de retraso disponibles.</p>;

  const formatNumber = (value) => {
    if (isNaN(value)) return "-";
    return new Intl.NumberFormat("sv-SE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateTimeElapsed = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
    const elapsedMs = Math.abs(end - start);
    const hours = elapsedMs / (1000 * 60 * 60);
    return formatNumber(hours);
  };

  // Calculate total dead time
  const totalDeadTime = delayEvents.reduce((sum, event) => sum + event.deadTime, 0);

  // Map reasonCode to colors and labels
  const reasonCodeStyles = {
    1: { color: "text-yellow-600", label: "Mantenimiento" },
    2: { color: "text-blue-600", label: "Personal" },
    3: { color: "text-green-600", label: "Control de Proceso" },
    4: { color: "text-red-600", label: "Problemas Externos" },
    5: { color: "text-orange-600", label: "Accidentes" },
  };

  return (
    <div className="overflow-x-auto">
      {/* Total Dead Time Display (Pinned at the Top) */}
      <div className="mb-4 bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">
          Tiempo Muerto Total: <span className="text-blue-600">{formatNumber(totalDeadTime / 60)} horas</span>
        </h2>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            <th className="px-4 py-1 border align-middle">Fase</th>
            <th className="px-4 py-1 border align-middle">Fecha</th>
            <th className="px-4 py-1 border align-middle">Causa</th>
            <th className="px-4 py-1 border align-middle">Descripción</th>
            <th className="px-4 py-1 border align-middle">Tiempo Muerto</th>
          </tr>
        </thead>
        <tbody>
          {delayEvents.map((event, index) => {
            const reasonStyle = reasonCodeStyles[event.reasonCode] || { color: "text-gray-600", label: "Desconocido" };
            const shortDate = new Date(event.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <tr key={event.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="px-4 py-1 border text-center align-middle">{event.deadTime}</td>
                <td className="px-4 py-1 border text-center align-middle">{shortDate}</td>
                <td className={`px-4 py-1 border text-center align-middle ${reasonStyle.color}`}>
                  {reasonStyle.label}
                </td>
                <td className="px-4 py-1 border text-left align-middle">{event.description}</td>
                <td className="px-4 py-1 border text-center align-middle">{formatNumber(event.deadTime/60)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;