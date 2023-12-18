import {
  FETCH_ADMINS,
  FETCH_ADMIN,
  CREATE_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
} from '../actions/types';
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMINS:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case FETCH_ADMIN:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_ADMIN:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_ADMIN:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_ADMIN:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
