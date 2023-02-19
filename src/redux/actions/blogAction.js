import {
  GET_LIST_BLOG,
  GET_LIST_BLOG_SUCCESS,
  GET_BLOG_INFO,
  GET_BLOG_INFO_SUCCESS,
  UPDATE_BLOG_INFO,
  CREATE_BLOG_INFO
} from '../constants';

export const getBlogs = (payload) => {
  return {
    type: GET_LIST_BLOG,
    payload: payload
  };
};

export const getBlogsSuccess = (payload) => {
  return {
    type: GET_LIST_BLOG_SUCCESS,
    payload: payload
  };
};

export const getBlogInfo = (payload) => {
  return {
    type: GET_BLOG_INFO,
    payload: payload
  };
};

export const getBlogsInfoSuccess = (payload) => {
  return {
    type: GET_BLOG_INFO_SUCCESS,
    payload: payload
  };
};

export const createBlogInfo = (payload) => {
  return {
    type: CREATE_BLOG_INFO,
    payload: payload
  };
};

export const updateBlogInfo = (payload) => {
  return {
    type: UPDATE_BLOG_INFO,
    payload: payload
  };
};
