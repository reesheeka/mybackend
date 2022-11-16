const blogModel = require("../Models/blogModel");
const authorModel = require("../Models/authorModel");
// const mongoose = require("mongoose")
// const objectId = mongoose.Types.ObjectId


function stringVerify(value) {
  if (typeof value !== "string" || value.length == 0) {
    return false
  }
  return true;
}

//--------------------------createBlog api--------------------------//

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let { title, body, authorId, tags, category, subCategory } = data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "Please Enter details" });
    }

    if (!title) {
      return res.status(400).send({ status: false, msg: "Title is required" });
    }

    if (!body) {
      return res.status(400).send({ status: false, msg: "Body is required" });
    }

    if (!authorId) {
      return res.status(400).send({ status: false, msg: "AuthorId is required" });
    }

    if (!category) {
      return res.status(400).send({ status: false, msg: "Category is required" });
    }

    if (!stringVerify(title)) {
      return res.status(400).send({ status: false, msg: "Title should be type String" });
    }

    if (!stringVerify(body)) {
      return res.status(400).send({ status: false, msg: "Body should be type String" });
    }

    if (!stringVerify(authorId)) {
      return res.status(400).send({ status: false, msg: "AuthorId should be type String" });
    }

    if (!stringVerify(category)) {
      return res.status(400).send({ status: false, msg: "Category should be type String" });
    }

    if (typeof (tags && subCategory) !== "object") {
      return res.status(400).send({ status: false, msg: "tags/subCategory should be in Array of String only" });
    }

    let authId = await authorModel.findById(data.authorId)

    if (!authId) {
      return res.status(400).send({ status: false, msg: "AuthorId is not Present" });
    }

    let blogData = await blogModel.create(data);
    return res.status(201).send({ status: true, msg: blogData });

  } catch (err) {
    return res.status(500).send({ msg: "Error", error: err.message });
  }

};


//----------------------------getBlog api-------------------------------//

const getBlog = async function (req, res) {
  try {
    let allblog = req.query;
    let { authorId, category, tags, subCategory } = allblog;

    if (Object.keys(allblog).length == 0) {
      return res.status(400).send({ status: false, msg: "Please Enter details" });
    }

    if (!stringVerify(category)) {
      return res.status(400).send({ msg: "Category should be type String" });
    }

    if (typeof ( tags || subCategory) !== "object") {
      return res.status(400).send({ status: false, msg: "authorId/tags/subCategory should be in Array of String only" });
    }

    let blogDetails = await blogModel.find({ $and: [{ isDeleted: false, isPublished: true }, allblog] }).populate("authorId")
    if (blogDetails == 0) {
      return res.status(404).send({ status: false, msg: "blog not found" })
    }
    else {
      res.status(200).send({ status: true, data: blogDetails })
    }
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
}


//------------------------------updateBlog api----------------------//

const updateBlog = async function (req, res) {
  try {
    let data = req.params.blogId
    let update = req.body

    let { title, body, tags, subCategory } = update

    if (Object.keys(update).length == 0) { return res.status(400).send({ status: false, msg: "incomplete request data provide more data" }) }

    if (title || body) {
      if (typeof (title || body) !== "string") {
        return res.status(400).send({ status: false, msg: "title/body should be in string only" })
      }
    }
    if (tags || subCategory) {
      if (typeof (tags || subCategory) !== "object") {
        return res.status(400).send({ status: false, msg: "tags/subcategory should be in array of string only" })
      }
    }


    let checkisDleted = await blogModel.findOne({ _id: data, isDeleted: true })
    if (checkisDleted) return res.status(404).send({ status: false, msg: "no blog found" })


    let blogs = await blogModel.findOneAndUpdate({ _id: data },
      {
        title: title, body: body, isPublished: true, publishedAt: Date.now()
        , $push: { tags: tags, subCategory: subCategory }
      }, { new: true })
    return res.status(200).send({ status: true, msg: blogs })
  } catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}


//-------------------------------deleteByPathParams api------------------------//

const deleteBlogByPathParam = async function (req, res) {

  try {
    let blogId = req.params.blogId

    let blogData = await blogModel.findById(blogId)

    if (!blogData) {
      return res.status(404).send({ msg: "No Blog exists with this blogId" })
    }

    if (blogData.isDeleted === true) {
      return res.status(404).send({ msg: "Blog is already deleted" })
    }

    let deleteBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
    res.status(200).send({ status: true, msg: "Blog is sucessfully deleted", data: deleteBlog })
  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}


//--------------------deleteByQueryParam api-----------------------//

const deleteBlogByQueryParam = async function (req, res) {

  try {
    let data = req.query;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "No parameters passed" });
    }

   
    let blog = await blogModel.findOne({ $set: [{ isDeleted: false }, data] })
    if (!blog) {
      return res.status(404).send({ status: false, msg: "no such blog present ok" })
    }
    // let authid = blog.authorId.toString()

    await blogModel.updateMany(data, { isDeleted: true, deletedAt: Date.now() })
    return res.status(200).send({ status: true, Deleted: "deletion of blog is completed" })
  }

  catch (err) { return res.status(500).send({ status: false, error: err.message }) };

}



module.exports = { createBlog, getBlog, updateBlog, deleteBlogByPathParam, deleteBlogByQueryParam }
