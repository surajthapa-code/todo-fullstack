import { app } from "./src/app.js";
import env from "dotenv";

env.config();

app.listen(3000, () => {
  console.log(`server is live \nListening on PORT ${process.env.PORT}`);
});
