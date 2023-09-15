const express = require('express');
const router = express.Router();
// Import multer to handle file uploads
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload-images', upload.fields([{ name: 'chestXRay', maxCount: 1 }, { name: 'ctScanReport', maxCount: 1 }, { name: 'bloodReport', maxCount: 1 }]), (req, res) => {
  try {
    // Access the uploaded files from req.files
    const chestXRayFile = req.files['chestXRay'][0];
    const ctScanReportFile = req.files['ctScanReport'][0];
    const bloodReportFile = req.files['bloodReport'][0];

    // Add the file paths or other data to the db

    res.json({ success: true, message: 'Upload Images form submitted successfully!' });
  } catch (error) {
    console.error('An error occurred during upload images form submission:', error);
    res.status(500).json({ error: 'An error occurred during upload images form submission. Please try again later.' });
  }
});

module.exports = router;
