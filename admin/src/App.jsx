import React from "react";
import Navber from "./components/Navber/Navber";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Add, List, Orders } from "./pages/pages.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const url = "https://just-cheers-backend.onrender.com";
  // const url = "http://localhost:5000";
  return (
    <>
      <ToastContainer />
      <div className="px-6">
        <Navber />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
