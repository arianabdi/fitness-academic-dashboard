import { createAction } from "redux-actions";
import { useSelector } from "react-redux";

export const SET_ITEM_PENDING = "CLASS/SET_PENDING";
export const path = '/courses/CourseClass'
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
            const { profile } = getState();

            console.log('<<<<<<<<<>>>>>>>>>' , profile)
            dispatch(setItemsPending(true));
            const defaultPath = profile.roles.includes('Teacher') ? '/Courses/GetData/CourseClass/Teacher': (
              profile.roles.includes('Student') ? '/courses/CourseClass': '/courses/CourseClass'
            )
            return (await axios.get(`${path}?limit=${pagination.itemPerPage}&page=${pagination.currentPage}&${filter}`));
        } catch (error) {
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
            console.log(error.message);
            return error

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
            return (await axios.get(`${path}/${id}`));
        } catch (error) {
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
            console.log(error.message);
        } finally {
            dispatch(setItemsPending(false));
        }
    };
}





