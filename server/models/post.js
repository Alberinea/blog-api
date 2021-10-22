import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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

postSchema.plugin(uniqueValidator);

const Post = mongoose.model('posts', postSchema);

export default Post;
