import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "bad request!",
      });
    }
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const [isUsernameTaken, isEmailTaken] = await Promise.all([
      User.findOne({
        username,
      }),
      User.findOne({
        email,
      }),
    ]);

    // if (isUsernameTaken) {
    //   res.status(409).json({
    //     message: "username is already taken",
    //   });
    // }
    // if (isEmailTaken) {
    //   res.status(409).json({
    //     message: "email is already taken",
    //   });
    // }

    if (isUsernameTaken || isEmailTaken) {
      return res.status(409).json({
        message: "user already exist sir, Username and Email already in Use!",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const registerInstance = await User.create({
      username,
      email,
      password: hash,
    });
    const token = jwt.sign(
      { id: registerInstance._id },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "User Register Sucess...",
      user: {
        id: registerInstance._id,
        username: registerInstance.username,
        email: registerInstance.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
