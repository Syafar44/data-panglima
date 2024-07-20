const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  database: "produk_panglima",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Database connected...");

  app.get("/", (req, res) => {
    const sql = "SELECT * FROM produk_gerai";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Database query error" });
        return;
      }
      res.json(result); // Mengirimkan data dalam bentuk JSON
    });
  });

  app.listen(8000, () => {
    console.log("Server ready on port 8000");
  });
});
