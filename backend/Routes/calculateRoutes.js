const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/", (req, res) => {
  const inputData = req.body.numbers;

  const pythonProcess = spawn("python", [
    "python_scripts/backend_script.py",
    JSON.stringify(inputData),
  ]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.json({ result: parseFloat(result) });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while running the script." });
    }
  });
});

module.exports = router;
