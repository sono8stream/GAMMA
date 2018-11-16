import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import App from './containers/App';
import Articles from './containers/Article';
import ArticleShow from './containers/Article/show';
import ArticleEdit from './containers/Article/edit';
import EventShow from './event/ShowContainer';
import EventList from './event/ListContainer';
import Login from './containers/login';
import Logout from './containers/logout';
import BlogTransferer from './containers/blogTransferer';

const Routes = props => (
  <Provider store={props.store}>
    <BrowserRouter {...props}>
      <div>
        <Route path="/8EEyN7E9" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/blogs" component={Articles} />
        <Route path="/blogs/show/:id" component={ArticleShow} />
        <Route path="/blogs/edit/:id" component={ArticleEdit} />
        <Route exact path="/events" component={EventList} />
        <Route path="/events/:state/:id" component={EventShow} />
        <Route exact path="/" component={BlogTransferer} />
      </div>
    </BrowserRouter>
  </Provider>
);

export default Routes;