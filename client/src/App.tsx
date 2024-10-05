import { Outlet, NavLink } from "react-router-dom";
import { useUser } from "./contexts/user";

function App() {
  const { user, logout } = useUser();
  return (
    <div className=" bg-gray-200">
      <header className="p-4 bg-green-600 text-white">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-semibold">
            <a href="/">Splits</a>
          </h1>
          <nav>
            <ul className="flex gap-4">
              <li>
                <NavLink to="/" className="hover:underline p-2">
                  Home
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink to="/signup" className="hover:underline p-2">
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="hover:underline p-2">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <NavLink to="/profile" className="hover:underline p-2">
                      🏃🏼‍♂️ {user.username}
                    </NavLink>
                  </li>
                  <li>
                    <span
                      onClick={logout}
                      className="hover:underline p-2 cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex items-center justify-center min-h-screen max-w-screen-xl mx-auto bg-gray-100 gap-12 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
