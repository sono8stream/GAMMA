import React from 'react';
import {BrowserRouter,Route,Router} from 'react-router-dom';

import App from './containers/App';
import Articles from './containers/Article';

const Routes = (props)=>(
    <BrowserRouter {...props}>
      <div>
        <Route exact path="/" component={ App } />
        <Route path="/blogs" component={ Articles } />
      </div>
    </BrowserRouter>
);

export default Routes;