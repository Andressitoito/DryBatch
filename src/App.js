import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Layout/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Lotes from './pages/Lotes/Lotes';
import '@fontsource/lato'; // Defaults to weight 400
import CreateUser from './pages/Auth/SignIn';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/mHlMAi8ExJ17Euc/SignIn" element={<CreateUser />} />
          <Route path="/lotes" element={<Lotes />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
