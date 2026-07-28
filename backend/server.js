import { connect } from "mongoose";
import { app } from "./src/app.js";
import env from "dotenv";
import { connectDB } from "./src/DB/index.js";

env.config();

connectDB();

app.listen(3000, () => {
  console.log(`server is live \nListening on PORT ${process.env.PORT}`);
});
