const multer = require("multer");
const express = require("express");
const cloudinary = require('cloudinary').v2;

require("dotenv").config();

const router = express.Router();

const Element = require("../models/element");

// Screenshot upload constraints
const upload = multer({
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(JPG|jpeg|png)$/)) {
      return cb(new Error("Please upload an image in JPG, JPEG or PNG format"));
    } else if (file.size > 1024 * 1024) {
      return cb(new Error("Please upload a screenshot under 1 MB"));
    }
    cb(null, true);
  },
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
} else {
  console.log('cloudinary config:');
  console.log(cloudinary.config()); //this will log here your config coming from the .env file
}

// Upload images to cloud
router.post("/img", async (req, res) => {

  const string = req.body.string;

  cloudinary.uploader.upload(`data:image/jpg;base64,${string}`, 
  function(error, result) {console.log(result, error); });
})

// Get all elements
router.get("/", async (req, res) => {
  var elements = [];
  elements = await Element.find();
  res.json({elements: elements});
});

// Get all the elements of specific type
// Not working
router.get("/:name", async (req, res) => {
  var elements = [];
  elements = await Element.find({ name: {$regex: req.params.name} });
  res.send(elements);
});

// Save a new element to DB
router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const newElement = new Element({
      name: req.body.name,
      JSCode: req.body.JSCode,
      HTMLCode: req.body.HTMLCode,
      CSSCode: req.body.CSSCode,
      screenshot: req.body.buffer,
    });

    await newElement.save();
    res.send("Data uploaded successfully!");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;