import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import decode from 'jwt-decode';
import App from './App';
import Login from './Login';
import Post from './Post';
import Blog from './Blog';
import NotFound from './NotFound';
import fetchData from './utils/fetchData';

const Routes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      fetchData('refresh', 'POST')
        .then((res) => res.json())
        .then((res) => {
          if (res.access_token) {
            const accessToken = decode(res.access_token);
            setUser(accessToken);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <BrowserRouter>
      {loading ? null : (
        <Switch>
          <Route exact path="/">
            <App user={user} setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/post">
            <Post user={user} setUser={setUser} />
          </Route>
          <Route exact path="/post/:title">
            <Blog user={user} setUser={setUser} />
          </Route>
          <Route>
            <NotFound user={user} setUser={setUser} />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
