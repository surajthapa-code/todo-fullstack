import e from "express";
import { Router } from "express";

const authRouter = e.Router();

authRouter.post("/auth/register")