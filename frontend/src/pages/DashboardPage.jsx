import { Link } from "react-router";
import Todolist from "../components/Todolist";

function DashboardPage() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/login"> to login</Link>
      <Link to="/logout">log out</Link>
      <Todolist />
    </div>
  );
}

export default DashboardPage;
