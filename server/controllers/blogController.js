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

export const blogDeleteController = async (req, res) => {
  try {
    const { id } = req.body;
    await Post.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad Request');
  }
};

export const blogFindOneController = async (req, res) => {
  try {
    let { title } = req.params;
    title = title.split('-').join(' ');
    const exactMatch = new RegExp(`^${title}$`, 'i');
    const post = await Post.findOne({
      title: { $regex: exactMatch },
    });

    if (!post) {
      return res.status(404).json({ message: 'This page does not exist' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad Request');
  }
}; 
