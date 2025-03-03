import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "../../contexts/UserContext"; // Import the UserContext

const Modal = ({
	isOpen,
	onClose,
	containers = [],
	latestContainers = [],
	addMeasurement,
	productId,
}) => {
	const { user } = useUser(); // Access the current user from context
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);

	const handleBackgroundClick = (e) => {
		if (e.target.id === "modal-background") {
			reset();
			onClose();
		}
	};

	const onSubmit = async (data) => {
		if (!user.username) {
			console.error("No user is logged in. Measurement cannot be added.");
			return;
		}

		if (!containers || containers.length === 0) {
			console.error("No containers available to update.");
			return;
		}

		// Calculate `lastChange` for each container
		const newMeasurement = {
			timestamp: new Date().toISOString(),
			lastUpdatedBy: user.username, // Use username from context
			containers: containers.map((container, index) => {
				const currentGross = parseFloat(data[`measurement_${index}`]);
				const lastChange = latestContainers[index]
					? currentGross - latestContainers[index].currentGross
					: 0; // Default to 0 if no previous data

				return {
					tare: container.tare,
					initialGross: container.initialGross,
					currentGross,
					lastChange,
				};
			}),
		};

		try {
			if (!productId) {
				console.error("No product ID provided for adding measurement.");
				return;
			}

			setIsLoading(true); // Set loading state to true

			// Call addMeasurement with both productId and newMeasurement
			await addMeasurement(productId, newMeasurement);

			reset(); // Reset the form after submission
			onClose();
		} catch (error) {
			console.error("Error adding measurement:", error);
		} finally {
			setIsLoading(false); // Set loading state to false
		}
	};

	if (!isOpen) return null;

	return (
		<div
			id="modal-background"
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
			onClick={handleBackgroundClick} // Close modal when clicking outside
		>
			<div className="bg-white p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-2xl relative overflow-y-auto max-h-[80vh] scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
				<h2 className="text-xl font-bold mb-4">Agregar Próxima Medición</h2>
				{!user.username ? (
					<div>
						<p className="text-red-500 text-center mb-4">
							Debe iniciar sesión para realizar esta acción.
						</p>
						<div className="flex justify-center">
							<button
								type="button"
								onClick={() => {
									reset();
									onClose();
								}}
								className="bg-primary text-white p-2 rounded"
							>
								OK
							</button>
						</div>
					</div>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						{containers.length > 0 ? (
							containers.map((container, index) => (
								<div key={index} className="mb-2">
									<label className="block mb-1">
										{`Contenedor ${index + 1}`} (Tara: {container.tare.toFixed(2)} kg)
									</label>
									<Controller
										name={`measurement_${index}`}
										control={control}
										defaultValue=""
										rules={{
											required: "Este campo es obligatorio",
											pattern: {
												value: /^[0-9]+(\.[0-9]*)?$/,
												message: "Ingrese un número válido",
											},
										}}
										render={({ field }) => (
											<input
												{...field}
												type="number"
												className={`border p-2 w-full ${
													errors[`measurement_${index}`] ? "border-red-500" : ""
												}`}
												placeholder={`Ingrese el peso bruto actual para el contenedor ${
													index + 1
												}`}
												disabled={isLoading} // Disable input while loading
											/>
										)}
									/>
									{errors[`measurement_${index}`] && (
										<span className="text-red-500 text-sm">
											{errors[`measurement_${index}`].message}
										</span>
									)}
								</div>
							))
						) : (
							<p>No hay contenedores disponibles para actualizar.</p>
						)}
						<div className="flex justify-end mt-4">
							<button
								type="button"
								onClick={() => {
									reset();
									onClose();
								}}
								className="bg-gray-400 text-white p-2 rounded mr-2"
								disabled={isLoading} // Disable Cancel button while loading
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="bg-blue-500 text-white p-2 rounded flex items-center justify-center"
								disabled={isLoading} // Disable Submit button while loading
							>
								{isLoading && (
									<svg
										className="animate-spin h-5 w-5 mr-2 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v8H4z"
										></path>
									</svg>
								)}
								{isLoading ? "Procesando..." : "Actualizar Control"}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default Modal;
