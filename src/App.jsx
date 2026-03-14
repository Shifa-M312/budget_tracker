import { useState, useEffect } from "react"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (loggedIn === "true") setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <div>
        <Login onLogin={() => setIsLoggedIn(true)} />
        <p className="text-center mt-4">
          New user?{" "}
          <button
            onClick={() => setShowSignup(true)}
            className="text-blue-600 underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={() => setIsLoggedIn(false)} />
      <Home />
    </div>
  )
}

export default App