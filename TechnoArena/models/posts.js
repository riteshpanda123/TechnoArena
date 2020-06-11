const mongoose = require('mongoose');
require('mongoose-type-url');

const PostsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image:{
	  type:String,
  },
  source: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now
  }
});

const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;