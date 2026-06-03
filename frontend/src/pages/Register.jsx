import { useState } from "react";
import api from "../services/api";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async () => {

  console.log("Register button clicked");
  console.log(form);

  try {

    const response = await api.post(
      "/auth/register",
      form
    );

    console.log(response);

    alert("User registered successfully");

  } catch (error) {

    console.error(error);

    alert("Registration failed");
  }
};

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <br />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <br />

      <button onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Register;
