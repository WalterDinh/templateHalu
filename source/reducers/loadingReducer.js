import createReducer from 'lib/createReducer';
import * as types from 'actions/types';
import { Consts } from 'utilities';

const initialState = {
  show: false
};

export function loadingReducer(state = initialState, action) {
  if (action.type.includes('REQUEST')) {
    return {
      show: true
    };
  }
  return {
    show: false
  };
}
