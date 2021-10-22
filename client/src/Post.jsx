import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import fetchData from './utils/fetchData';

const Post = ({ user, setUser }) => {
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const post = (e) => {
    e.preventDefault();
    fetchData('post', 'POST', {
      title,
      image,
      introduction,
      text,
      date: new Date(),
    })
      .then((res) => res.json())
      .then((res) => setMessage(res))
      .catch(() => {});
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <main className="py-5">
        {user?.role === 'admin' ? (
          <form className="p-3 border rounded text-center container bg-white">
            {message.length > 0 && (
              <div className="alert alert-primary">{message}</div>
            )}
            <div className="mb-3">
              <input
                placeholder="Title"
                type="text"
                className="form-control"
                autoComplete="on"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleImage(e)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Introduction"
                type="text"
                className="form-control"
                autoComplete="on"
                onChange={(e) => setIntroduction(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                onChange={(e) => setText(e.target.value)}
                placeholder="Text"
                className="form-control"
                required
              />
            </div>
            <button
              onClick={(e) => post(e)}
              type="submit"
              className="btn btn-dark px-3"
            >
              Post
            </button>
          </form>
        ) : (
          <h1 className="text-center">Unauthorized Access</h1>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Post;
