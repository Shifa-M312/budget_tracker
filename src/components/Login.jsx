import { useState } from "react"

function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const storedUser = JSON.parse(localStorage.getItem("user"))

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true")
      onLogin()
    } else {
      alert("Invalid credentials or user not registered")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  )
}

export default Login