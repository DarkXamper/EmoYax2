import React, { useState, useEffect } from "react";
import App from "./App";
import "./Layout.css";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a 5-second loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div
          id="loader"
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-100 animate-scale-up z-50 bg-blue-400 backdrop-blur-xl"
        >
          <div id="loader-inner" className="flex justify-center items-center">
            <div
              id="loader-content"
              className="text-xl text-white text-Lexend-Deca"
            >
              Take A Deep Breath
            </div>
          </div>
        </div>
      ) : (
        <App />
      )}
    </>
  );
};

export default Layout;
