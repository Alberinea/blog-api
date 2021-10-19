import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchData from './utils/api';
import Header from './components/Header';
import Footer from './components/Footer';

const App = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchData('blog', 'GET', null, abortController.signal)
      .then((res) => res.json())
      .then((res) => setBlogs(res))
      .catch((err) => console.log(err));

    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser}></Header>
      <main className="">
        <div className="container py-3">
          {blogs.map((blog, i) => (
            <div
              className="my-5 p-sm-4 p-3 bg-white border rounded"
              key={i}
            >
              <Link
                className="d-inline-block text-dark mb-3 text-decoration-none"
                to={`/${blog._id}`}
              >
                <h3 className="link">{blog.title}</h3>
              </Link>
              <Link className="d-block mx-auto" to={`/${blog._id}`}>
                <img src={blog.image} alt={blog.title + 'image'} />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default App;
