const {Router} = require('express');
const Comment = require('../models/Comment');

const router = Router();

router.get('/', async (req, res)=>{
  try{
    const comments = await Comment.find();
    return res.json(comments);
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

router.post('/', async (req, res)=>{
  try{
    const postId = req.body.postId;
    const author = req.body.author[0];
    const content = req.body.content[0];
    const newComment = new Comment({postId, author, content});
    newComment.save();
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

router.post('/delete/:id', async (req, res)=>{
  try{
    await Comment.deleteOne({_id: req.params.id});
  }catch(error){
    return res.status(500).json({Error: error.message});
  }
});

module.exports = router;