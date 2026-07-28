import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
  try {
    // const cookieToken = req.body?.token;
    // if (cookieToken) {
    //   const decodedT = jwt.verify(cookieToken, process.env.JWT_SECRET);
    //   console.log(decodedT);
    // }
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

export async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const isUserRegistered = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!isUserRegistered) {
    return res.status(401).json({
      message: "User Not Found!",
    });
  }
  if (!username || !email || !password) {
    return res.status(400).json({
      message: " cannot accept empty field || all fields are required",
    });
  }
  try {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserRegistered.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "wrong password !",
      });
    }
    const userDetails = isUserRegistered.toObject();
    delete userDetails.password;
    const token = jwt.sign(
      {
        id: isUserRegistered._id,
      },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Login sucess",
      userDetails,
    });
  } catch (err) {
    console.log("error while loging in");
    res.status(500).json({
      message: "login failed",
    });

    throw err;
  }
}

export async function logOutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "log out sucess!",
  });
}
