import Post from '../models/post.js';

export const blogGetController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).limit(6);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad Request');
  }
};
