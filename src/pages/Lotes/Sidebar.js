import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClockCircle } from "react-icons/ai";
import { FaSortAlphaDown } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";

const Sidebar = ({
	selectedProductId,
	onSelectProduct,
	onAddProduct,
	products,
}) => {
	const { user } = useUser();

	// Default sort is "updated" (updatedAt DESC)
	const [sortBy, setSortBy] = useState("updated");

	// Sort products based on current sorting method
	const sortedProducts = [...products];
	if (sortBy === "updated") {
		sortedProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
	} else if (sortBy === "name") {
		sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
	}

	// Ensure the parent knows about the initial selection on the first render
	useEffect(() => {
		if (!selectedProductId && products.length > 0) {
			const lastCreatedProduct = [...products].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			)[0];
			onSelectProduct(lastCreatedProduct.id); // Notify parent
		}
	}, [products, selectedProductId, onSelectProduct]);

	// Handle product selection
	const handleSelectProduct = (id) => {
		onSelectProduct(id); // Notify parent of the selection
	};

	// Toggle sortBy between "updated" and "name"
	const toggleSort = () => {
		setSortBy((prev) => (prev === "updated" ? "name" : "updated"));
	};

	return (
		<div
			className="
        w-full md:w-1/4 bg-primary p-4 text-white relative
        overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200
        h-[40vh] md:h-full
      "
		>
			<h2 className="text-xl font-bold mb-4 flex items-center">
				Productos
				{user?.username && (
					<button
						onClick={() => onAddProduct()}
						className="bg-blue-500 text-white p-1.5 rounded-full ml-2 flex items-center justify-center"
						style={{ fontSize: "30px" }}
						title="Crear Nuevo Producto"
					>
						<AiOutlinePlus size={24} />
					</button>
				)}
			</h2>

			{/* Toggle sort button */}
			<button
				onClick={toggleSort}
				className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full flex items-center justify-center"
				title={`Ordenar por ${
					sortBy === "updated" ? "Nombre" : "Última Actualización"
				}`}
			>
				{sortBy === "updated" ? (
					<FaSortAlphaDown size={18} />
				) : (
					<AiOutlineClockCircle size={18} />
				)}
			</button>

			<ul>
				{sortedProducts.map((product) => (
					<li
						key={product.id}
						className={`cursor-pointer p-2 mb-2 rounded-lg ${
							selectedProductId === product.id
								? "bg-lightAccent text-white" // Highlight the selected product
								: "hover:bg-secondary"
						}`}
						onClick={() => handleSelectProduct(product.id)} // Allow clicking to select
					>
						{product.name} ({product.code})
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
