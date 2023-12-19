import {createAction} from 'redux-actions';

export const SET_POST_PENDING = "POST/SET_PENDING";

export const setPostPending = createAction(SET_POST_PENDING, (section = 'list', status = false) => ({
    section,
    status,
}));

export function setPostsPending(status) {
    return setPostPending('list', status);
}


export function getPosts(pagination, filter) {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setPostsPending(true));
            const response = await axios.get(`/admin/posts?limit=${pagination.itemPerPage}&page=${pagination.currentPage}&${filter}`);
            return {posts: response.data.posts, totalItems: response.data.totalItems};
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(setPostsPending(false));
        }
    };
}

export function addNewPost(body) {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setPostsPending(true));
            const response = await axios.post(`/admin/posts`, body);
            return response;

        } catch (error) {
            console.log(error.message);
            return error
            
        } finally {
            dispatch(setPostsPending(false));
        }
    };
}


export function updatePost(body) {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setPostsPending(true));
            // const response = await axios.post(`/admin/posts`, body);
            return response;

        } catch (error) {
            console.log(error.message);
            return error
            
        } finally {
            dispatch(setPostsPending(false));
        }
    };
}

export function getPostById(id) {
   return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setPostsPending(true));
            const response = await axios.get(`/admin/posts/${id}`);
            return response.data.post;
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(setPostsPending(false));
        }
    };
}


export function getPostCategorySelectOptions() {
    return async (dispatch, getState, {axios}) => {
        try {
            dispatch(setPostsPending(true));
            const response = await axios.get(`/admin/posts/category-select-options`);
            return response.data.categories;
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(setPostsPending(false));
        }
    };
}





