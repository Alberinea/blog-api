import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comments: {
    type: Number,
    default: 0,
  },
  introduction: {
    type: String,
  },
});

const Post = mongoose.model('posts', postSchema);

export default Post;
