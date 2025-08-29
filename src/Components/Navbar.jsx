import React from "react"

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AgriDrone Monitor</h1>
      <div className="space-x-4">
        <a href="/" className="hover:text-gray-300">Dashboard</a>
        <a href="/about" className="hover:text-gray-300">About</a>
      </div>
    </nav>
  )
}
