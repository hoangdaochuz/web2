import {
  FETCH_USERS,
  FETCH_USER,
  BAN_USER,
  UNLOCK_USER,
  MAP_STUDENTID,
  UNMAP_STUDENTID,
} from '../actions/types.js';
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case FETCH_USER:
      return { ...state, [action.payload._id]: action.payload };
    case BAN_USER:
      return { ...state, [action.payload._id]: action.payload };
    case UNLOCK_USER:
      return { ...state, [action.payload._id]: action.payload };
    case MAP_STUDENTID:
      return { ...state, [action.payload._id]: action.payload };
    case UNMAP_STUDENTID:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
