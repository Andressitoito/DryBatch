import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new API
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from "./contexts/UserContext"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create the root

root.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <Router>
          <div className="font-lato font-bold">
            <App />
          </div >
        </Router>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);
