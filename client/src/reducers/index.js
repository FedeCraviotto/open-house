import { combineReducers } from "redux";
import alertReducer from './alert.js';
import authReducer from './auth.js';

export default combineReducers({
    alertReducer,
    authReducer
})