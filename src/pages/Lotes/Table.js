import React from "react";

const Table = ({ measurements, initialTime }) => {
	if (!measurements || measurements.length === 0)
		return <p>No hay mediciones disponibles.</p>;

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
				// (Other calculations for containers remain unchanged)
				const containers = [...measurement.Containers].sort((a, b) => {
					if (a.tare !== b.tare) return a.tare - b.tare;
					return a.id - b.id;
				});
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
				const totalWeightLoss = containers.reduce(
					(acc, cur) => acc + (cur.initialGross - cur.currentGross),
					0
				);

				// Calculate the cumulative elapsed time from the very start to this measurement
				const totalTimeElapsed = calculateTimeElapsed(
					initialTime,
					measurement.updatedAt
				);

				return (
					<div key={groupIndex} className="mb-6 border-b-2 border-gray-800 pb-4">
						<table className="min-w-full bg-white">
							<thead className="bg-gray-100 font-semibold">
								<tr>
									<th className="px-4 py-2 border align-middle">Tara (gr)</th>
									<th className="px-4 py-2 border align-middle">
										Peso Bruto Inicial (gr)
									</th>
									<th className="px-4 py-2 border align-middle">
										Peso Bruto Actual (gr)
									</th>
									<th className="px-4 py-2 border align-middle">Pérdida de Peso (gr)</th>
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
									const netWeight = container.currentGross - container.tare;
									const weightLoss = container.initialGross - container.currentGross;
									// Calculate difference from the previous measurement's container if it exists
									const previousContainer =
										measurements[groupIndex + 1]?.Containers[index];
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
														<span className="inline-block relative -top-1">
															{weightLoss > 0 ? "↓" : "↑"}
														</span>
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
														<span className="inline-block relative -top-1">
															{differenceSinceLast < 0 ? "↓" : "↑"}
														</span>
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

									<td className="px-4 py-2 border" colSpan={3}>
										<div className="flex flex-row items-center justify-center gap-4">
											{/* Date Block */}
											<div className="flex flex-col items-center">
												<span className="text-base font-semibold capitalize">
													{new Date(measurement.updatedAt).toLocaleDateString("es-ES", {
														weekday: "long",
													})}
												</span>
												<span className="text-gray-600 text-sm tracking-wide">
													{new Date(measurement.updatedAt)
														.toLocaleDateString("es-ES", {
															day: "2-digit",
															month: "2-digit",
															year: "numeric",
														})
														.replace(/\//g, " \u2013 ")}
												</span>
											</div>

											{/* Vertical Separator */}
											{/* <div className="h-8 w-px bg-gray-200"></div> */}

											{/* Time Block */}
											<div className="flex flex-col items-center justify-center gap-1">
												<span className="text-sm font-medium text-gray-500 tracking-wide">
													Hora
												</span>
												<span className="font-mono text-gray-700 text-base px-3 rounded-lg">
													{new Date(measurement.updatedAt).toLocaleTimeString("es-ES", {
														hour: "2-digit",
														minute: "2-digit",
														hour12: false,
													})}
												</span>
											</div>
										</div>
									</td>

									<td className="px-4 py-2 border text-center">
										<div className="flex flex-col items-center justify-center">
											{/* Title - Smaller text */}
											<span className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide">
												Secado
											</span>

											{/* Time - Main number */}
											<span className="whitespace-nowrap text-base sm:text-lg font-medium text-gray-700">
												{totalTimeElapsed && Number(totalTimeElapsed) !== 0
													? `${totalTimeElapsed} hs`
													: "Inicio"}
											</span>
										</div>
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
