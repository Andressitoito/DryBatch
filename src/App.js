import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Layout/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Lotes from "./pages/Lotes/Lotes";
import About from "./pages/About/About";
import "@fontsource/lato"; // Defaults to weight 400
import CreateUser from "./pages/Auth/SignIn";

const App = () => {
	return (
		<div>
			<Navbar />
			<div className="container w-full max-w-[1200px] px-2 sm:px-4 mx-0 sm:mx-auto">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/auth/mHlMAi8ExJ17Euc/SignIn" element={<CreateUser />} />
					<Route path="/lotes" element={<Lotes />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
