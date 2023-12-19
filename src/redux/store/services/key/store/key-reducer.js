

import {
  SET_KEY_PENDING,
} from './key-actions';
import {RESET_STORE} from "../../general/store/general-actions";

const initialState = {
  pending: {
    all: true,
    pending: false,
    profile: false,
  },
  // package_type: '',
  // key_name: '',
  // key_service: '',
  // country: '',
  // duration: 1
};

export default function keyReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case SET_KEY_PENDING:
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
