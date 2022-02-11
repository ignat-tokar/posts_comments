const express = require('express');
const mongoose = require('mongoose');

app = express();
app.use(express.json({extended: true}));
app.use('/api/posts', require('./routes/posts.routes'));
app.use('/api/comments', require('./routes/comments.routes'));

async function start(){
  try{
    await mongoose.connect('mongodb://mongodb:27017/posts_comments');
    app.listen(5000, () => console.log('Server was started on port 5000...'));
  }catch(error){
    console.log(`Server was stoped with Error: ${error}`);
    process.exit(1);
  }
}

start();