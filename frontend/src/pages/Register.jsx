import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async () => {

    try {

      const response = await api.post(
        "/auth/register",
        form
      );

      alert(response.data);

    } catch {

      alert("Registration Failed");
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h2>Create Account</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })}
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })}
        />

        <button onClick={register}>
          Register
        </button>

        <div className="link">
          <Link to="/login">
            Already have an account?
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;
