import { takeLatest, call, put } from 'redux-saga/effects';
import API from './api';
import { GET_LIST_BLOG, GET_BLOG_INFO } from '../redux/constants';
import { getBlogsSuccess, getBlogsInfoSuccess } from '../redux/actions/blogAction';

const getBlogs = async ({ page, limit, sort, order, search }) => {
  const url = `/blogs?page=${page}&limit=${limit}&sortBy=${sort}&order=${order}&search=${search}`;
  return await API.get(url).catch((err) => {
    console.log(err);
    return err;
  });
};

function* getBlogsListSaga(action) {
  try {
    const response = yield call(getBlogs, action.payload);
    const { data, status } = response;
    if (status === 200) {
      yield put(getBlogsSuccess({ ...action.payload, blogs: data }));
    } else {
      console.log('Error on getBlogsListSaga');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

const getBlogInfo = async (id) => {
  const url = `/blogs/${id}`;
  return await API.get(url).catch((err) => {
    console.log(err);
    return err;
  });
};

function* getBlogInfoSaga(action) {
  try {
    const response = yield call(getBlogInfo, action.payload);
    const { data, status } = response;
    if (status === 200) {
      yield put(getBlogsInfoSuccess(data));
    } else {
      console.log('Error on getBlogInfoSaga');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

export default function* blogSagas() {
  yield takeLatest(GET_LIST_BLOG, getBlogsListSaga);
  yield takeLatest(GET_BLOG_INFO, getBlogInfoSaga);
}
