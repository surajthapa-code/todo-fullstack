import e from "express";
import {
  createTodo,
  deleteTodo,
  showTodo,
} from "../controllers/todo.controllers.js";
import { authUser } from "../middlewares/auth.middleware.js";

export const todoRouter = e.Router();

todoRouter.get("/", authUser, showTodo);
todoRouter.post("/createtodo", authUser, createTodo);
todoRouter.delete("/delete/:id", authUser, deleteTodo);
