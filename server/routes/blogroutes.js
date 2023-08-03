const express = require('express');
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const mongoose=require("mongoose")
const {verifyAdmin}=require("../utils/verifyToken")
// Blog model
const Blog = require('../models/blog');
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// Get all blog posts
router.get("/blogget", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

// Create a new blog post
// router.post("/blogpost", async (req, res) => {
//   const newBlog = new Blog(req.body);
//   try {
//     const savedBlog = await newBlog.save();
//     res.status(201).json(savedBlog);
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error!" });
//   }
// });
router.post('/blogpost', upload.single('blogImg'),verifyAdmin, async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const newBlog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    blogTitle: req.body.blogTitle,
    blogDesc:req.body.blogDesc,
    blogImg: url + '/public/' + req.file.filename,
    // Include other properties of the blog as needed
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Internal server error!" });
  }
});
// Delete a blog post
router.delete("/blogdelete/:id", verifyAdmin,async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json({ message: "Blog post deleted", deletedBlog });
  } catch (err) { 
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
