

import {
  SET_POST_PENDING
} from './posts-actions';
import {RESET_STORE} from "../../general/store/general-actions";

const initialState = {
  token: '',
  name: '',
};

export default function ChatReducer(state = initialState, action = {}) {
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
