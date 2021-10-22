import { Link, useHistory } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const Header = ({ user, setUser }) => {
  const history = useHistory()

  const logOut = () => {
    fetchData('logout', 'DELETE')
      .then(() => {
        setUser(null);
        history.push('/')
      })
      .catch(() => {});
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="d-flex w-75">
            <Link
              to="/"
              className="navbar-brand fw-bold d-sm-block d-none me-5"
            >
              Blog
            </Link>

            {/* <form className="search-bar">
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
            </form> */}
          </div>

          <button
            className="navbar-toggler p-1"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            type="button"
          >
            <span className="navbar-toggler-icon" />
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
                  <Link className="nav-link active link me-3" to="/post">
                    Post new blog
                  </Link>
                  <button
                    type="button"
                    onClick={() => logOut()}
                    className="btn btn-outline-danger"
                  >
                    Log out
                  </button>
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
