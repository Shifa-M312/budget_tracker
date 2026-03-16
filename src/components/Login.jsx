import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const storedUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (storedUser) {
      onLogin(storedUser.username);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", storedUser.username);
      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white shadow-xl rounded-2xl w-96 border border-gray-100"
      >
        <h2 className="text-3xl font-black mb-6 text-blue-600">Welcome Back</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;