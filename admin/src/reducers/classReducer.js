import { FETCH_CLASSES, FETCH_CLASS } from '../actions/types';
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CLASSES:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case FETCH_CLASS:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
