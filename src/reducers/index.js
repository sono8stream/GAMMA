import { combineReducers } from 'redux';
import counter from './counter';
import eventReducer from '../event/reducer';

export default combineReducers({
    counter, eventReducer
});