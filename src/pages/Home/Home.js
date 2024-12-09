import React from "react";
import axios from "axios";

// Set up the base URL for the API calls using the environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensure cookies are included in requests
});

// Define the Home component
const Home = () => {
  // Function to log the user session (calls the /auth/session endpoint)
  const logSession = async () => {
    try {
      const response = await api.get("/auth/session");
      console.log("User session:", response.data);
      alert(`User session: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("Error fetching session:", error.response?.data || error);
      alert("Error fetching session. Check the console for details.");
    }
  };

  // Function to log the browser cookies
  const logCookies = () => {
    console.log("Browser cookies:", document.cookie);
    alert(`Browser cookies: ${document.cookie}`);
  };

  // Function to test setting and logging cookies
  const testCookie = async () => {
    try {
      const response = await api.get("/auth/test-cookie"); // Call the test cookie endpoint
      console.log("Test cookie response:", response.data);
      alert("Test cookie has been set. Check browser cookies.");
    } catch (error) {
      console.error("Error testing cookie:", error.response?.data || error);
      alert("Error testing cookie. Check the console for details.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Bienvenido a DryBatch</h2>
      <p>Gestiona y supervisa el secado de productos de manera eficiente.</p>

      {/* Debugging buttons */}
      <div className="mt-4">
        <button
          onClick={logSession}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Log User Session
        </button>
        <button
          onClick={logCookies}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          Log Browser Cookies
        </button>
        <button
          onClick={testCookie}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Test Cookie
        </button>
      </div>
    </div>
  );
};

export default Home;
