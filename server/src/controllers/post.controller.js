//Imports
const Post = require("../models/Post");

//Object
const PostCtrl = {};

//Functions

PostCtrl.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      res.status(200).send(posts);
    } else {
      res.status(404).send({ error: "Notes not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

PostCtrl.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(200).send({ message: "Post Created" });
  } catch (error) {
    res.status(500).send(error);
  }
};

PostCtrl.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({slug: req.params.slug});
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send(err);
  }
};

PostCtrl.updatePost = async (req, res) => {
  const { image, title, description, markdown } = req.body;
  try {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      { image, title, description, markdown }
    );
    res.status(200).send({ message: "Post update successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

PostCtrl.deletePost = async (req, res) => {
  try {
    await Post.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

PostCtrl.updateComment = async(req,res)=>{
  var{comment1,slug1}=req.body;
var date=new Date();
  var str="- commented at "+date.toLocaleDateString()+" "+date.toLocaleTimeString()
  comment1=comment1+str;
  try{
      await Post.findOneAndUpdate({slug:slug1.slug},{$push:{comment:comment1}});
      res.status(200).send({message:{slug1}});
      
  }catch (error) {
    res.status(500).send(error);
  }
};

PostCtrl.getComment= async(req,res)=>{
  const{slug1}=req.body;
try{
    comment=await Post.find({slug:slug1})
    res.status(200).send(comment[0].comment);
}catch (error) {
  res.status(500).send(error);
}
};

//Export
module.exports = PostCtrl;
