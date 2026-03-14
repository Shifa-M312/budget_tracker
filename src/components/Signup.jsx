import { useState } from "react"

function Signup({ onSignup }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = { username, password }
    localStorage.setItem("user", JSON.stringify(newUser))
    alert("User registered successfully! Please login.")
    onSignup() // switch back to login screen
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  )
}

export default Signup