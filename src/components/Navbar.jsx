function Navbar({ onLogout }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* Logo image (put logo.png inside src/assets/) */}
        <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-xl font-bold">Budget Tracker</h1>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn")
          onLogout()
        }}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar