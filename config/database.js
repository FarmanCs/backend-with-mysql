// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// const connectionDB = mysql.createConnection({
//   host: process.env.MySQL_HOST,
//   user: process.env.MySQL_USER,
//   port: process.env.MySQL_PORT,
//   password: process.env.MySQL_PASSWORD,
//   database: process.env.MySQL_DB,
// });

// connectionDB.connect((err) => {
//   if (err) throw console.log("something wrong with error", err.message);
//   console.log("MySQL database  connected successfully!");
// });

// export default connectionDB;

//working
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connectionDB = mysql.createConnection({
  host: process.env.MySQL_HOST,
  user: process.env.MySQL_USER,
  port: process.env.MySQL_PORT,
  password: process.env.MySQL_PASSWORD,
  database: process.env.MySQL_DB,
});

connectionDB.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.message);
    throw err;
  }
  console.log("MySQL database connected successfully!");
});

export default connectionDB;
