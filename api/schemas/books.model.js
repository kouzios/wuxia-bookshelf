const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Books = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  uri: {
    type: String,
    unique: true,
    required: true
  },
  current_position: {
      type: Number,
      required: true
  },
  total_chapters: {
    type: Number,
    required: true
  }
},{
    collection: 'books'
});

module.exports = mongoose.model('Books', Books);