import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Lotes from './pages/Lotes';

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
