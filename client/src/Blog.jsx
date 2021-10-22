import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Header from './components/Header';
import Footer from './components/Footer';
import fetchData from './utils/fetchData';

function Blog({ user, setUser }) {
  const { title } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const abortController = new AbortController();

  useEffect(() => {
    fetchData(`blog/${title}`, 'GET', null, abortController.signal)
      .then((res) => res.json())
      .then((res) => {
        setBlog(res);
      })
      .catch((err) => console.log(err));

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (blog?.text) {
      fetchData(`comment/${blog._id}`, 'GET', null, abortController.signal)
        .then((res) => res.json())
        .then((res) => setComments(res))
        .catch((err) => console.log(err));
    }
  }, [blog]);

  const post = async () => {
    try {
      await fetchData('comment', 'POST', {
        name: user?.username || name,
        role: user?.role || 'guest',
        text,
        date: new Date(),
        blogID: blog._id,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header user={user} setUser={setUser} />

      {blog?.text ? (
        <main>
          <div className="container py-5">
            <section className="">
              <article>
                <h2 className="mb-2">{blog.title}</h2>
                <div className="d-flex opacity-50">
                  <h5>{moment(blog.date).format('ll')}</h5>
                </div>
                <img className="my-4 w-100" src={blog.image} alt={blog.title} />
                <p className="pt-3">{blog.text}</p>
              </article>
            </section>
            <section id="comments" className="border-top border-2 mt-5 py-3">
              <div className="d-flex py-2">
                <span className="p-1 me-2 bg-primary" />
                <h5>
                  {blog.comments > 1 ? 'Comments' : 'Comment'}
                  <span className="ms-2 opacity-50 fs-6">{`(${blog.comments})`}</span>
                </h5>
              </div>
              <form className="border p-3 my-4 rounded d-flex flex-column">
                {!user ? (
                  <input
                    className="form-control w-50"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                ) : (
                  <h5>{user.username}</h5>
                )}
                <textarea
                  className="form-control mt-3"
                  rows="4"
                  required
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  className="btn btn-outline-primary mt-3 w-50 mx-auto"
                  type="button"
                  onClick={() => post()}
                >
                  Post
                </button>
              </form>
              {comments.map((comment) => (
                <div className="py-3 border-bottom" key={comment._id}>
                  <div className="d-flex mb-1 flex-sm-row flex-column">
                    <div className="d-flex align-items-center">
                      {comment.role === 'admin' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-patch-check-fill me-1 text-success"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                        </svg>
                      )}
                      <p className="fw-bold">{comment.name}</p>
                    </div>
                    <p className="opacity-50 ms-sm-2">
                      {moment(comment.date).fromNow()}
                    </p>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
            </section>
          </div>
        </main>
      ) : <h1 className="py-5 text-center">{blog.message}</h1>}
      <Footer />
    </>
  );
}

export default Blog;
