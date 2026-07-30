import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { api } from "../store/axios";

function LoginPage() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function loginUser(formData) {
    setApiError("");

    try {
      await api.post("/api/auth/login", formData);

      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Invalid credentials";

      setApiError(message);
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Sign in to your account
        </h1>

        <p className="mt-2 text-center text-sm text-gray-600">
          New User?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 transition-colors hover:text-blue-500"
          >
            Create an account
          </Link>
        </p>
      </div>

      <div className="mx-auto mt-8 w-full max-w-md rounded-xl border border-gray-100 bg-white px-4 py-8 shadow sm:px-10">
        <form
          onSubmit={handleSubmit(loginUser)}
          className="space-y-6"
        >
          {apiError && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>

              {apiError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${
                errors.username
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
            />

            {errors.username && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;