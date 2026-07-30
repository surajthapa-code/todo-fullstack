import { Link } from "react-router";
import Todolist from "../components/Todolist";
import CreateTodo from "../components/CreateTodo";

const navLinkClass =
  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors";

function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col justify-between border-r border-gray-200 bg-white p-6">
        <div>
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white shadow-sm">
              T
            </div>

            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Todo
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <Link to="/" className={`${navLinkClass} bg-blue-50 text-blue-700`}>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
                />
              </svg>
              Dashboard
            </Link>

            <Link
              to="/login"
              className={`${navLinkClass} text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Switch Account
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <Link
          to="/logout"
          className={`${navLinkClass} w-full text-red-600 hover:bg-red-50`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Log Out
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your active tasks and review progress.
          </p>
        </header>

        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <CreateTodo />
          <Todolist />
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
