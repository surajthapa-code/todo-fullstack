import { Link, useNavigate } from "react-router";
import { api } from "../store/axios";
import { useEffect, useState } from "react";

function LogoutPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("logging_out"); // logging_out, success, error

  useEffect(() => {
    async function logoutUser() {
      try {
        const res = await api.get("/api/auth/logout");
        console.log(res.data);
        setStatus("success");

        // Automatically redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        console.log(err, "error while logout!");
        setStatus("error");
      }
    }

    logoutUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        {/* Loading / Status Icons */}
        <div className="flex justify-center mb-6">
          {status === "logging_out" && (
            <svg
              className="animate-spin h-12 w-12 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}

          {status === "success" && (
            <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}

          {status === "error" && (
            <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Dynamic Headings and Subtext */}
        {status === "logging_out" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Signing out
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we secure your session...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Logged out safely
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting you to the login screen...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Logout failed
            </h2>
            <p className="text-sm text-red-600 mt-2 font-medium">
              There was an issue clearing your session server-side.
            </p>
          </>
        )}

        {/* Global Action Fallback Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
          <Link
            to="/"
            className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Return to Dashboard
          </Link>

          {status === "error" && (
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Go straight to Login page
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
