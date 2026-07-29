import e from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { todoRouter } from "./routes/todo.routes.js";
import cors from "cors";

export const app = e();

app.use(e.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Required if you are sending cookies or authorization headers
};

app.use(cors(corsOptions));
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
