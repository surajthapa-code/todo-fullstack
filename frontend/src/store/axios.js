import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
// //register user
// export async function registerUser(data) {
//   try {
//     const res = await api.post("/api/auth/register", data);
//     return res;
//   } catch (err) {
//     console.log(err, "error while register!");
//   }
// }
// //login user
// export async function loginUser(data) {
//   try {
//     const res = await api.post("/api/auth/login", data);
//     return res;
//   } catch (err) {
//     console.log(err, "error while login!");
//   }
// }
// //todolist fetch
// export async function TodoFetch() {
//   try {
//     const res = await api.get("/api/todo");
//     return res;
//   } catch (err) {
//     console.log(err, "error while fetching todolist!");
//   }
// }
