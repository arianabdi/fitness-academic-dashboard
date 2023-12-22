import {createAction} from 'redux-actions';
import { ErrorToaster } from "../../../../../../../shared/toaster";

export const SET_ITEM_PENDING = "USER_SYSTEM/SET_PENDING";
export const path = '/api/user'
export const setItemPending = createAction(SET_ITEM_PENDING, (section = 'list', status = false) => ({
    section,
    status,
}));

export function setItemsPending(status) {
    return setItemPending('list', status);
}


export function getItems(pagination, filter) {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setItemsPending(true));
            return (await axios.get(`${path}/list?limit=${pagination.itemPerPage}&page=${pagination.currentPage}&${filter}`))
        } catch (error) {
            ErrorToaster(error)
            console.log(error.message);
        } finally {
            dispatch(setItemsPending(false));
        }
    };
}

export function addNewItem(body) {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setItemsPending(true));
            const response = await axios.post(path, body);
            return response;

        } catch (error) {
            ErrorToaster(error)
            console.log(error.message);

        } finally {
            dispatch(setItemsPending(false));
        }
    };
}


export function updateItem(body) {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setItemsPending(true));
            const response = await axios.post(path, body);
            return response.data.items;

        } catch (error) {
            ErrorToaster(error)
            console.log(error.message);
            return error

        } finally {
            dispatch(setItemsPending(false));
        }
    };
}

export function getItemById(id) {
   return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setItemsPending(true));
            const response = await axios.get(`${path}/${id}`);
            return response.data.post;
        } catch (error) {
            ErrorToaster(error)
            console.log(error.message);
        } finally {
            dispatch(setItemsPending(false));
        }
    };
}


export function getPostCategorySelectOptions() {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setItemsPending(true));
            const response = await axios.get(`/admin/posts/category-select-options`);
            return response.data.categories;
        } catch (error) {
            ErrorToaster(error)
            console.log(error.message);
        } finally {
            dispatch(setItemsPending(false));
        }
    };
}





