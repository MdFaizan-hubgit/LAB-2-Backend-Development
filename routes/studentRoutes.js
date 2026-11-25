const express = require("express");
const router = express.Router();
const students = require("../data/students");

// GET /students - View all students.
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    students: students
  });
});

// GET /students/:id - View a student by ID.
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID must be a positive number"
    });
  }

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.status(200).json({
    success: true,
    student: student
  });
});

// POST /students - Add a new student.
router.post("/", (req, res) => {
  const { name, course } = req.body;

  if (
    typeof name !== "string" || name.trim() === "" ||
    typeof course !== "string" || course.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and course are required"
    });
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    student: newStudent
  });
});

// PUT /students/:id - Update a student's details.
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID must be a positive number"
    });
  }

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const { name, course } = req.body;

  if (
    typeof name !== "string" || name.trim() === "" ||
    typeof course !== "string" || course.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and course are required"
    });
  }

  student.name = name.trim();
  student.course = course.trim();

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    student: student
  });
});

// DELETE /students/:id - Delete a student.
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID must be a positive number"
    });
  }

  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

module.exports = router;
