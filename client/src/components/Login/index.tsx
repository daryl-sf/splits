import React, { useState } from "react";
import { useUser } from "../../contexts/user";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login, logout } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }
    setError("");
    try {
      await login(email, password, "/");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      {user && <p>{user.email}</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {!user && (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
        </>
      )}
      {!user && (
        <>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Log In
          </button>
          <Link
            to="/signup"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full block text-center"
          >
            Sign Up
          </Link>
        </>
      )}
      {user && (
        <button
          type="button"
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Log Out
        </button>
      )}
    </form>
  );
};

export default Login;
