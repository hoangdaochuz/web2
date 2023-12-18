import React, { lazy } from 'react';
import history from './history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import store from './myStore';
const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      store.getState().auth.isSignedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
