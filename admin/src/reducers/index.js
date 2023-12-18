import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import classReducer from './classReducer';

export default combineReducers({
  auth: authReducer,
  admins: adminReducer,
  users: userReducer,
  classes: classReducer,
});
