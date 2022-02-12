const {Router} = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const router = Router();

router.get('/', async (req, res)=>{
  try{
    const posts = await Post.find();
    return res.json(posts);
  }catch(error){
    return res.stauts(500).json({Error: error.message});
  }
});

router.post('/create', async (req, res)=>{
  try{
    const title = req.body.title[0];
    const description = req.body.description[0];
    const newPost = new Post({title: title, description: description});
    newPost.link = `/posts/detail/t/${newPost._id}`;
    newPost.save();
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

router.post('/edit/:id', async (req, res)=>{
  try{
    const title = req.body.title;
    const description = req.body.description;
    await Post.findOneAndUpdate({_id: req.params.id}, {$set: {
      title: title,
      description: description
    }});
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

router.post('/upvote/:id', async (req, res)=>{
  try{
    const post = await Post.findOne({_id: req.params.id});
    const upvotesValue = post.upvotes + 1;
    await Post.findOneAndUpdate({_id: req.params.id}, {$set: {
      upvotes: upvotesValue
    }});
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

router.post('/delete/:id', async (req, res)=>{
  try{
    await Comment.deleteMany({postId: req.params.id});
    await Post.deleteOne({_id: req.params.id});
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

module.exports = router;