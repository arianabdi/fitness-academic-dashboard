import { createAction } from 'redux-actions';
import {timeout} from "../../../shared/shared";

export const SET_INVOICE_PENDING = 'INVOICE/SET_PENDING';

export const setInvoicePending = createAction(SET_INVOICE_PENDING, (section = 'get', status = false) => ({
  section,
  status,
}));

export function setGetInvoicePending(status) {
  return setInvoicePending('get', status);
}

export function createInvoice(data) {
  return async (dispatch, getState, { axios }) => {
    try {

      dispatch(setGetInvoicePending(true));
      await axios.post(`/server`, data);
      await timeout(2000);
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setGetInvoicePending(false));
    }
  };
}

export function getInvoice() {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setGetInvoicePending(true));
      console.log('', ``)
      const response = await axios.get(`/payment-gateway/plisio/invoice/6430539a4b613adb80326898`);
      console.log('response', response.data.invoice)

      await timeout(2000);
      return response.data.invoice;

    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setGetInvoicePending(false));
    }
  };
}





