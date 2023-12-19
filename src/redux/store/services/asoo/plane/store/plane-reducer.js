

import {
  SET_ITEM_PENDING
} from './plane-actions';
import { RESET_STORE } from "../../../general/store/general-actions";

const initialState = {
  pending: {
    all: true,
    list: false,
    form: false,
  },
  name: '',
};

export default function ClassReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case SET_ITEM_PENDING:
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
