import { useState } from "react";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

  console.log("Login clicked");

  try {

    const response = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    console.log(response);

    localStorage.setItem(
      "token",
      response.data.token
    );

    alert("Login Successful");

  } catch (error) {

    console.error(error);

    alert("Login Failed");
  }
};

  return (
    <div>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}

export default Login;
