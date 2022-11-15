const authorController= require("../Controlers/authorController");
const blogController= require("../Controlers/blogController");
const express = require ("express")
const router = express.Router();

router.post('/createAuthor', authorController.createAuthor);

router.post('/createBlog', blogController.createBlog);

router.get('/getBlog', blogController.getBlog);

router.put("/blogs/:blogId", blogController.updateBlog);

router.delete("/blogs/:blogId", blogController.deleteBlogByPathParam);



module.exports = router;