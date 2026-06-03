import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  const isLoggedIn =
    !!localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (

    <BrowserRouter>

      <div className="navbar">

        <div>

          <h1>TalentSphere</h1>

          <p>
            DevOps Portfolio Platform
          </p>

        </div>

        <div className="nav-links">

          <Link to="/">Home</Link>

          {!isLoggedIn && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/">
                Dashboard
              </Link>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
