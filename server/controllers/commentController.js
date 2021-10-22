import Post from '../models/post.js';
import Comment from '../models/comment.js';
import authenticate from '../utils/authenticate.js';

export const commentGetController = async (req, res) => {
  try {
    const { blogID } = req.params;
    const comments = await Comment.find({ blogID }).sort({ date: -1 });
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
  }
};

export const commentPostController = async (req, res) => {
  try {
    const { role, blogID } = req.body;
    if (!req.cookies.refresh_token && role !== 'guest') {
      return res.sendStatus(403);
    }
    if (req.cookies.refresh_token) {
      authenticate(req, res);
    }

    const newComment = new Comment(req.body);
    await newComment.save();
    await Post.findByIdAndUpdate(blogID, { $inc: { comments: 1 } });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad Request');
  }
};
