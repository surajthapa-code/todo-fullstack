import e from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { todoRouter } from "./routes/todo.routes.js";

export const app = e();

app.use(e.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
