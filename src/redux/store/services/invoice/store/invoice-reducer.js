

import {
  SET_INVOICE_PENDING,
} from './invoice-actions';
import {RESET_STORE} from "../../general/store/general-actions";

const initialState = {
  pending: {
    add: false,
    get: false,
  },
};

export default function invoiceReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case SET_INVOICE_PENDING:
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
