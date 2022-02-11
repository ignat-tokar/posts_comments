const {model, Schema} = require('mongoose');

const schema = Schema ({
  title: {type: String},
  description: {type: String},
  link: {type: String},
  date: {type: Date, default: Date.now()},
  upvotes: {type: Number, default: 0}
});

module.exports = model('Post', schema);