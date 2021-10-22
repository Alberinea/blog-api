import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import moment from 'moment';
import fetchData from './utils/fetchData';
import Header from './components/Header';
import Footer from './components/Footer';

const App = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const abortController = new AbortController();

  useEffect(() => {
    fetchData('blog', 'GET', null, abortController.signal)
      .then((res) => res.json())
      .then((res) => setBlogs(res))
      .catch(() => {});

    return () => abortController.abort();
  }, []);

  const deletePost = async (id) => {
    fetchData('blog', 'DELETE', { id })
      .then(() => window.location.reload())
      .catch(() => {});
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <main className="">
        <section className="container py-3">
          {blogs.map((blog) => (
            <article
              className="my-5 p-sm-4 p-3 bg-white border rounded"
              key={blog._id}
            >
              {' '}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex flex-sm-row flex-column">
                  <Link
                    className="d-inline-block text-dark text-decoration-none"
                    to={`/post/${blog.title.replace(/ /g, '-').toLowerCase()}`}
                  >
                    <h5 className="link">{blog.title}</h5>
                  </Link>
                  <h5 className="opacity-50 ms-sm-3">
                    {moment(blog.date).format('ll')}
                  </h5>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => deletePost(blog._id)}
                    className="btn btn-outline-secondary px-2 py-1"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <Link
                className="d-block mx-auto mb-3"
                to={`/post/${blog.title.replace(/ /g, '-').toLowerCase()}`}
              >
                <img src={blog.image} alt={`${blog.title}`} />
              </Link>
              <p className="mb-3 ">{blog.introduction}</p>
              <HashLink
                smooth
                to={`/post/${blog.title
                  .replace(/ /g, '-')
                  .toLowerCase()}/#comments`}
              >
                {blog.comments > 1
                  ? `${blog.comments} comments`
                  : `${blog.comments} comment`}
              </HashLink>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default App;
