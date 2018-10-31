import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import App from './containers/App';
import Articles from './containers/Article';
import EventList from './event/ListContainer';
import EventShow from './event/ShowContainer';

const Routes = (props) => (
    <Provider store={props.store}>
        <BrowserRouter {...props}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/blogs" component={Articles} />
                <Route exact path="/events" component={EventList} />
                <Route path="/events/:state/:id" component={EventShow} />
            </div>
        </BrowserRouter>
    </Provider>
);

export default Routes;