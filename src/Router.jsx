import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/icons.css';
import './styles/styles.scss';

import { Loader } from './components';
import { Auth } from './contexts';
import { FindYourLove, Home, Login, Profile, SignUp, Terms, User } from './pages';
import { ProtectedRoute, RegisterRoute } from './routes';
import Test from './Test';

function Loading() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Loader size='large' />
      <h3 style={{ marginTop: '3rem' }}>loading ..</h3>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/auth/')
      .then(res => {
        setData({ ...res.data });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Auth.Provider value={{ data, setData }}>
          <Router>
            <Switch>
              <Route path='/' exact component={Home} />
              <RegisterRoute path='/login' exact component={Login} />
              <RegisterRoute path='/signup' exact component={Login} />
              <Route path='/terms' exact component={Terms} />
              <Route path='/find' exact component={FindYourLove} />
              <Route path='/signup' exact component={SignUp} />
              <Route path='/profile/:id' exact component={Profile} />
              <ProtectedRoute path='/user' exact component={User} />

              <Route path='/test' exact component={Test} />
            </Switch>
          </Router>
        </Auth.Provider>
      )}
    </>
  );
}
