import jwt from 'jsonwebtoken';
import ImageKit from 'imagekit'
import Post from '../models/post.js';

export const postPostController = async (req, res) => {
  const { refresh_token } = req.cookies;
  jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) return res.sendStatus(403);
  });

  try {
    const { title, image, text } = req.body;

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
      text,
    });
    await newPost.save();
    res.status(201).json('Posted!');
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad request');
  }
};
