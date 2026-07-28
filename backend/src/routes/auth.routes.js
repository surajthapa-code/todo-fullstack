import e from "express";
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";

export const authRouter = e.Router();

authRouter.post("/register", registerUser);
authRouter.get("/login", loginUser);
