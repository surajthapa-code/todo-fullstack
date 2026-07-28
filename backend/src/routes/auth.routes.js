import e from "express";
import { Router } from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/auth.controllers.js";

export const authRouter = e.Router();

authRouter.post("/register", registerUser);
authRouter.get("/login", loginUser);
authRouter.get("/logout", logOutUser);
