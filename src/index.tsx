import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { createStore } from 'redux';
import combineReducers from './reducers';

const store = createStore(combineReducers);

ReactDOM.render(
    <Routes store={store} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
