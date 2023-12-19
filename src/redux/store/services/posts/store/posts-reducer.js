

import {
  SET_POST_PENDING
} from './posts-actions';
import {RESET_STORE} from "../../general/store/general-actions";

const initialState = {
  pending: {
    all: true,
    list: false,
    edit: false,
  },
  name: '',
};

export default function PostsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case SET_POST_PENDING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.payload.section]: action.payload.status,
        },
      };
    default:
      return state;
  }
}
