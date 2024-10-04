import axios from "axios";
import React, { useEffect, useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ email: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:3000/api/users/me",
          {
            withCredentials: true,
          }
        );
        console.log(userResponse.data);
        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }
    setError("");
    const body = { email, password, username };
    const userResponse = await axios.post(
      "http://localhost:3000/api/users/signup",
      body,
      { withCredentials: true }
    );
    console.log(userResponse.data);
    setUser(userResponse.data);
  };

  if (loading) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      {user && <p>{user.email}</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {!user && (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
            />
          </div>
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign Up
        </button>
      )}
      {user && (
        <button
          type="button"
          onClick={async () => {
            const userResponse = await axios.get(
              "http://localhost:3000/api/users/logout",
              {
                withCredentials: true,
              }
            );
            console.log(userResponse.data);
            setUser(undefined);
          }}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Log Out
        </button>
      )}
    </form>
  );
};

export default SignUp;
