import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import App from './containers/App';
import Articles from './containers/Article';
import EventList from './event/ListContainer';

const Routes = (props) => (
    <Provider store={props.store}>
        <BrowserRouter {...props}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/blogs" component={Articles} />
                <Route path="/events" component={EventList} />
            </div>
        </BrowserRouter>
    </Provider>
);

export default Routes;