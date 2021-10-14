import Comment from '../models/comment.js';

export const indexGetController = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 }).limit(20);
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(400)
  }
};
