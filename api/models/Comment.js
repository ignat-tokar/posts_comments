const {model, Schema} = require('mongoose');

const schema = Schema({
  postId: {type: String},
  author: {type: String},
  content: {type: String},
  date: {type: Date, default: Date.now()}
});

module.exports = model('Comment', schema);