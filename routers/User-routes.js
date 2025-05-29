import express from "express";
import { singUp, login, getAllusers } from "../controller/User-controller.js";
const route = express.Router();

route.post("/signup", singUp);
route.post("/login", login);
route.get("/", getAllusers);

export default route;
