import React, { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebaseConfig.js"

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setIsAuthenticated(true)
      const successMessages = [
        "✅ Login successful! Redirecting you now...",
      ]
      toast.success(successMessages[Math.floor(Math.random() * successMessages.length)])
      setTimeout(() => navigate("/dashboard"), 2000)
    } catch (error) {
      const errorMessages = [
        "⚠️ Incorrect email or password. Please try again.",
        "❌ Login failed. Double-check your credentials.",
        "😕 We couldn’t sign you in. Please check your details.",
        + error.message
      ]
      toast.error(errorMessages[Math.floor(Math.random() * errorMessages.length)])
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Login to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
