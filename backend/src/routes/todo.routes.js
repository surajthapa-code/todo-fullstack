import e from "express";
import { showTodo } from "../controllers/todo.controllers.js";
import { authUser } from "../middlewares/auth.middleware.js";

const todoRouter = e.Router();

todoRouter.get("/", authUser, showTodo);
