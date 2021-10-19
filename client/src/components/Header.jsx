import { Link } from 'react-router-dom';
import fetchData from '../utils/api';

const Header = ({ user, setUser }) => {
  const logOut = () => {
    fetchData('logout', 'DELETE')
      .then((res) => {
        if (res.status === 204) {
          setUser(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold d-sm-block d-none">
            Blog
          </Link>

          <form className="w-75 search-bar">
            <input
              className="form-control"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active link d-sm-none d-block" to="/">
                Home
              </Link>
              {!user && (
                <Link className="nav-link active link" to="/login">
                  Login
                </Link>
              )}
              {user && (
                <>
                  <Link className="nav-link active link" to="/post">
                    Post new blog
                  </Link>
                  <p onClick={() => logOut()} className="nav-link active link">
                    Log out
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
