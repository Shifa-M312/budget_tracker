import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

function Navbar({ onLogout, username }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50 shadow-md">
     
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10 w-10 object-cover rounded" />
        <h1 className="font-bold text-lg">Budget Tracker</h1>
      </div>

      
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/transactions" className="hover:underline">Transactions</Link>
        {username && <span className="font-semibold">👤 {username}</span>}
        <button
          onClick={onLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;