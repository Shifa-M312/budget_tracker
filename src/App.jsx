import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("currentUser");
    if (loggedIn === "true" && user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isLoggedIn && (
        <div className="relative z-50">
          <Navbar onLogout={handleLogout} username={currentUser} />
        </div>
      )}

      <main className="flex-grow container mx-auto p-4 lg:p-8">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/transactions"
            element={isLoggedIn ? <Transactions /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <Signup /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;