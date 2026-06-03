import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

    } catch (error) {

      alert("Login Failed");
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

        <div className="link">
          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;
