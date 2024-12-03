import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Lotes from './pages/Lotes/Lotes';
import '@fontsource/lato'; // Defaults to weight 400

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lotes" element={<Lotes />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
