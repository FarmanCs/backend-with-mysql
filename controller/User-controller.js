import connectionDB from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const singUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    connectionDB.query(sql, [name, email, hashpassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log(result);
      res.status(201).json({
        message: "User created",
        user: result,
      });
    });
  } catch (error) {
    return res.status(404).json({
      message: "something went wrong",
      error: error.mesage,
    });
  }
};

//login
export const login = (req, res) => {
  const { email, password } = req.body;

  //sql query to get user data
  const sql = "SELECT * FROM users WHERE email = ?";
  connectionDB.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log(typeof result);
    console.log(result);
    //check if the users is there in db or not
    if (result.length === 0) {
      return res.status(401).json({
        error: "Email doesn't exest in the db, sigup before login...!",
      });
    }

    // check password
    const user = result[0];

    console.log(user);
    try {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(401).json({ error: "password is not correct!" });
      }
    } catch (error) {
      console.error("ERROR :", error.message);
      return res.status(500).json({ error: error.message });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      message: "Login successful...",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};

//get all usrs;
export const getAllusers = async (req, res) => {
  try {
    const sql = "select * from users ";
    connectionDB.query(sql, (err, result) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
        });
      }
      return res.status(200).json({
        message: "All users are:",
        users: result,
      });
    });
  } catch (error) {
    console.log("ERROR: ", error.message);
    return res.status(500).json({
      mesage: "Something went wrong!",
      error: error.mesage,
    });
  }
};
