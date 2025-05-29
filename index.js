import express from "express";
import dotenv from "dotenv";
import connectionDB from "./config/database.js";
import userRouter from "./routers/User-routes.js";
dotenv.config();
const app = express();

//middleware to parese jsong data
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server started at : http://localhost:${process.env.PORT}`);
});
