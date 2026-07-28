import e from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";

export const app = e();

app.use(e.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
