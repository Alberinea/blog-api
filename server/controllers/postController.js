import ImageKit from 'imagekit'
import Post from '../models/post.js';

export const postPostController = async (req, res) => {
  try {
    const { title, image, introduction, text, date } = req.body;

    const imagekit = new ImageKit({
      publicKey: 'public_txng6l4dKqtvsRfoqDBKhA+jrck=',
      privateKey: process.env.IMAGE_KIT_KEY,
      urlEndpoint: 'https://ik.imagekit.io/banx5x22uoy'
    })

    const newImage = await imagekit.upload({
      file: image,
      fileName: 'blog',
      useUniqueFileName: true,
    })

    const newPost = new Post({
      title,
      image: newImage.url,
      introduction,
      text,
      date,
    });
    await newPost.save();
    res.status(201).json('Posted!');
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad request');
  }
}

