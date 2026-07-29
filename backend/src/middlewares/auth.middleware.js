import { User } from ".js";
import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {
  const UserToken = req.cookies?.token;
  if (!UserToken) {
    return res.status(404).json({
      message:
        "no longer have access to this service, check are you logged in or not!",
    });
  }
  try {
    const isRealUser = jwt.verify(UserToken, process.env.JWT_SECRET);
    if (!isRealUser) {
      console.log("not a real user!");
      return res.status(409).json({
        message: "not real user!",
      });
    }
    const isExistingUser = await User.findOne({
      id: isRealUser.id,
    });
    if (!isExistingUser) {
      console.log("user not found!");
      return res.status(409).json({
        message: "user not found!",
      });
    }
    req.user.id = isExistingUser.id;
    next();
  } catch (err) {
    console.log("middleware error", err);
    throw err;
  }
}
