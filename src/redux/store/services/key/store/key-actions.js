import { createAction } from 'redux-actions';
import {timeout} from "../../../shared/shared";




export const SET_KEY_PENDING = 'KEYS/SET_PENDING';

export const setKeyPending = createAction(SET_KEY_PENDING, (section = 'pending', status = false) => ({
  section,
  status,
}));

export function setKeysPending(status) {
  return setKeyPending('pending', status);
}
export function setProfilePending(status) {
  return setKeyPending('profile', status);
}

export function buyKey(data) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));

      const res = await axios.post(`/key/buy`, data);


      return res;
    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}

export function getServiceList() {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));

      const res = await axios.get(`/service`);
      return res.data

    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}

export function sendMail(to, title, subtitle, access_key) {
  return async (dispatch, getState, { axios }) => {
    try {
      // dispatch(setKeysPending(true));

      const res = await axios.post(`/shared/send-mail`,{
        to: to,
        title: title,
        subtitle: subtitle,
        accessKey: access_key
      });

      return res.data

    } catch (error) {
    } finally {
      // dispatch(setKeysPending(false));
    }
  };
}

export function updateProfile(keyId, body){
  return async (dispatch, getState, { axios }) => {
    try {
      // dispatch(setProfilePending(true));
      const res = await axios.patch(`/key/update-profile/${keyId}`, body);
      await timeout(2000)
      return res.data
    } catch (error) {
    } finally {
      // dispatch(setProfilePending(false));
    }
  };
}



export function getPackageList() {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));
      const res = await axios.get(`/package`);
      await timeout(2000);
      return res.data

    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}

export function getOperatorList(){
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));
      const res = await axios.get(`/operators`);
      return res.data.operators
    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}

export function getDisruptionsList(){
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));
      const res = await axios.get(`/disruptions`);
      return res.data
    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}

export function reportDisruption(body){
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));
      const res = await axios.post(`/report/disruption`, body);
      return res.data
    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}


export function registerKeyPayment(keyId, body){
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));
      const res = await axios.post(`/create-renewal-payment/${keyId}`, body);
      return res.data
    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}


export function getUserKeys(pagination, filter) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setKeysPending(true));
      const res = await axios.get(`/key?limit=${pagination.itemPerPage}&page=${pagination.currentPage}&${filter}`);
      return res.data
    } catch (error) {
    } finally {
      dispatch(setKeysPending(false));
    }
  };
}


export function checkUserName(username) {
  return async (dispatch, getState, { axios }) => {
    try {
      // dispatch(setKeysPending(true));

      const res = await axios.get(`/user/check-username/${username}`);
      console.log('check-username', res);
      return res.data
    } catch (error) {
      console.log('ERROR', error.message);
    } finally {
      // dispatch(setKeysPending(false));
    }
  };
}


export function checkDiscountCode(discountCode) {
  return async (dispatch, getState, { axios }) => {
    try {
      // dispatch(setKeysPending(true));

      const res = await axios.get(`/discount/use_of/${discountCode}`);
      await timeout(1000);
      console.log('discount', res);
      return res.data
    } catch (error) {
      console.log('ERROR', error.message);
    } finally {
      // dispatch(setKeysPending(false));
    }
  };
}



