import { Link } from "react-router";
import { api } from "../store/axios";

function LogoutPage() {
  async function LogOutUser() {
    try {
      const res = await api.get("/api/auth/logout");
      console.log(res.data);
    } catch (err) {
      console.log(err, "error while login!");
    }
  }
  return (
    <div>
      <h2>LogoutPage</h2>
      <button onClick={LogOutUser}>logout</button>
      <Link to="/">go back to Dashboard</Link>
    </div>
  );
}

export default LogoutPage;
