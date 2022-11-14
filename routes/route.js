const AuthorController= require("../controllers/authorController");
const BlogController= require("../controllers/blogController");

const router = express.Router();

router.post('/createAuthor', AuthorController.createAuthor);

router.post('/createBlog', BlogController.createBlog);

router.get('/getBlog', BlogController.getBlog);



module.exports = router;