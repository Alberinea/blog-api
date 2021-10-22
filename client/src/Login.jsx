import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';
import Header from './components/Header';
import Footer from './components/Footer';
import fetchData from './utils/fetchData';

const Login = ({ user, setUser }) => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    const res = await fetchData('login', 'POST', {
      username,
      password,
    });
    const result = await res?.json();

    if (!result.success) {
      setError(result.message);
    }

    if (result.success) {
      const decoded = decode(result.access_token);
      setUser(decoded);

      history.push('/');
    }
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <main className="pt-5">
        {!user ? (
          <form className="container p-3 border rounded text-center bg-white">
            {error !== '' && (
              <div className="alert alert-danger py-2 fw-bold">{error}</div>
            )}

            <div className="mb-3">
              <input
                onChange={(e) => setUsername(() => e.target.value)}
                placeholder="Username"
                type="text"
                className="form-control"
                autoComplete="on"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(e) => setPassword(() => e.target.value)}
                placeholder="Password"
                type="password"
                className="form-control"
                autoComplete="on"
              />
            </div>
            <button
              onClick={async (e) => login(e)}
              type="submit"
              className="btn btn-dark px-3"
            >
              Login
            </button>
          </form>
        ) : (
          <h1 className="text-center">You have already logged in</h1>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Login;
