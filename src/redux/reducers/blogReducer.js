import {
  GET_LIST_BLOG,
  GET_LIST_BLOG_SUCCESS,
  GET_BLOG_INFO,
  GET_BLOG_INFO_SUCCESS,
  CREATE_BLOG_INFO,
  UPDATE_BLOG_INFO
} from '../constants';

const INITIAL_STATE = {
  blogs: [],
  totalCount: 100,
  tableParams: {
    limit: 10,
    page: 1,
    sort: 'createdAt',
    order: 'desc',
    search: ''
  },
  blogInfo: null,
  loading: false
};

const reducer = (state = INITIAL_STATE, action) => {
  let indexBlog = -1;
  switch (action.type) {
    case GET_LIST_BLOG:
      return {
        ...state,
        loading: true
      };
    case GET_LIST_BLOG_SUCCESS:
      return {
        ...state,
        blogs: action.payload.blogs,
        tableParams: {
          limit: action.payload.limit,
          page: action.payload.page,
          sort: action.payload.sort,
          order: action.payload.order,
          search: action.payload.search
        },
        loading: false
      };
    case GET_BLOG_INFO:
      return {
        ...state,
        loading: true
      };
    case GET_BLOG_INFO_SUCCESS:
      return {
        ...state,
        blogInfo: action.payload,
        loading: false
      };
    case CREATE_BLOG_INFO:
      return {
        ...state,
        blogs: [...state.blogs.push(action.payload)]
      };
    case UPDATE_BLOG_INFO:
      indexBlog = state.blogs.findIndex((x) => x.id === action.payload.id);
      if (indexBlog === -1) {
        return { ...state };
      }

      state.blogs[indexBlog] = action.payload;
      return {
        ...state,
        blogs: [...state.blogs]
      };
    default:
      return state;
  }
};

export default reducer;
