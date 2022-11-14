const blogModel = require("../Models/blogModel")
const authorModel = require("../Models/authorModel")

const createBlog = async function (req, res) {
    try {
      let data = req.body;
      if(!data.authorId){
        return res.status(400).send({err:"author is required"})
      }
      let authid= await authorModel.findById(data.authorId)
      if(!authid){
        return res.status(400).send({err:"invalid authorid "})
      }
      let savedData = await blogModel.create(data);
      res.status(201).send({ msg: savedData });
    
    } catch (err) {
      console.log("this is the error :",err.message)
      res.status(500).send({msg: "Error", error: err.message})
    }
  
  };

  const getBlog = async function (req, res){
    try {
        let allblog =req.query
        let {authorId,category}=allblog
 
        let blogDetails =await blogModel.find({$and:[{isDeleted:false,isPublished:true},allblog]})
        if(blogDetails==0){
        return res.status(404).send({msg:"blog not found"})
        }
        else{
            res.status(200).send({data:blogDetails})
        }
    } catch (err) {
        console.log("this is the error :",err.message)
        res.status(500).send({msg: "Error", error: err.message})
      }
    
        
    }
  
  module.exports.createBlog= createBlog;
  module.exports.getBlog= getBlog;