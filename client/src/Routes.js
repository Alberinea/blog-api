import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Post from './Post';
import fetchData from './utils/api';

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
            setUser(res.access_token);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <BrowserRouter>
      {loading ? null : (
        <Switch>
          <Route exact path="/">
            <App user={user} setUser={setUser}></App>
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser}></Login>
          </Route>
          <Route exact path="/post">
            <Post user={user} setUser={setUser}></Post>
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
