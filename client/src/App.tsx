import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Ticker from "./components/Ticker";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<{ email: string }>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const body = { name, date: Date.now() };
    axios.post("http://localhost:3000/api/races/new", body);
  };

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password, username };
    const userResponse = await axios.post(
      "http://localhost:3000/api/users/signup",
      body,
      { withCredentials: true }
    );
    console.log(userResponse.data);
    setUser(userResponse.data);
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    const userResponse = await axios.post(
      "http://localhost:3000/api/users/login",
      body,
      { withCredentials: true }
    );
    console.log(userResponse.data);
    setUser(userResponse.data);
  };

  const getMe = async () => {
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
    }
  };

  const logout = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:3000/api/users/logout",
        {
          withCredentials: true,
        }
      );
      console.log(userResponse.data);
      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Ticker />
      <form onSubmit={onSubmit}>
        <input type="text" name="name" id="name" placeholder="name" />
        <input type="submit" value="Submit" />
      </form>
      {user && <p>{user.email}</p>}
      <form onSubmit={signup}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        <input type="email" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <input type="submit" value="Sign up" />
      </form>
      <form onSubmit={onLogin}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <input type="submit" value="Sign in" />
      </form>
      <button onClick={getMe}>Me</button>
      <button onClick={logout}>Logout</button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
