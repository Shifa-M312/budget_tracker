import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();


    const users = JSON.parse(localStorage.getItem("users")) || [];

   
    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      setError("Username already taken. Please choose another.");
      return;
    }

   
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

   
    localStorage.setItem("isLoggedIn", "false");

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSignup}
        className="p-8 bg-white shadow-xl rounded-2xl w-96 border border-gray-100"
      >
        <h2 className="text-3xl font-black mb-6 text-green-600">Create Account</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;