const db = require("../models/db");

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.addStudent = (req, res) => {
  const { name, email, course } = req.body;
  db.query("INSERT INTO students (name, email, course) VALUES (?, ?, ?)", 
    [name, email, course], 
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Student added!", id: result.insertId });
    });
};
