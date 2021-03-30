import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home, PostItem } from './components';
import { GlobalStyle } from './styles/GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/blog" component={Home} />
        <Route exact path="/blog/:id" component={PostItem} />
      </Switch>
      <GlobalStyle />
      <ToastContainer />
    </Router>
  );
};
