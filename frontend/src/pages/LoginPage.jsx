import { useForm } from "react-hook-form";
import { api } from "../store/axios";
import { useNavigate } from "react-router";
import { useState } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [resState, setResState] = useState(null);
  const navigate = useNavigate();
  async function loginUser(data) {
    try {
      const res = await api.post("/api/auth/login", data);
      console.log(res);
      console.log(res.data);
      setResState(res.status);
    } catch (err) {
      console.log(err.response?.data || err.message, "error while login!");
    }
  }

  if (resState === 200) {
    navigate("/");
  }
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit(loginUser)}>
        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label>Username</label>
          <br />

          <input
            type="text"
            placeholder="Enter your email"
            {...register("username", {
              required: "username is required",
            })}
          />

          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <br />

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
