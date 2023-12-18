import axios from 'axios';
import axiosJWT from '../api/axiosJWT';
import config from '../config/mainConfig';
import history from '../history';
import { toast } from 'react-toastify';
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_ADMINS,
  FETCH_ADMIN,
  CREATE_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
  FETCH_USERS,
  FETCH_USER,
  BAN_USER,
  UNLOCK_USER,
  FETCH_CLASSES,
  FETCH_CLASS,
  MAP_STUDENTID,
  UNMAP_STUDENTID,
} from './types';

export const signIn = (formValues) => async (dispatch) => {
  try {
    const res = await axios.post(`${config.BACKEND_URL}/auth/admin/login`, {
      email: formValues.email,
      password: formValues.password,
    });
    if (res.data.success) {
      dispatch({
        type: SIGN_IN,
        payload: res.data,
      });
      history.push('/dashboard');
      toast('🎉🎉 Welcome to the dashboard!');
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const signOut = () => {
  history.push('/login');
  toast.info('Logout Successfully');
  return {
    type: SIGN_OUT,
  };
};

export const fetchAdmins = () => async (dispatch) => {
  try {
    const res = await axiosJWT.get('/users/admins');
    if (res.data.success) {
      dispatch({
        type: FETCH_ADMINS,
        payload: res.data.admins,
      });
    }
  } catch (err) {
    toast.error('Error');
  }
};

export const fetchAdmin = (adminId) => async (dispatch) => {
  try {
    const res = await axiosJWT.get(`/users/${adminId}`);
    if (res.data.success) {
      dispatch({
        type: FETCH_ADMIN,
        payload: res.data.user,
      });
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const createAdmin = (formValues) => async (dispatch) => {
  try {
    const res = await axiosJWT.post('/users/admins', formValues);
    if (res.data.success) {
      dispatch({
        type: CREATE_ADMIN,
        payload: res.data.admin,
      });
      toast.success('Admin Created Successfully');
      history.push('/admins');
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

// edit admin profile
export const editAdmin = (id, data) => async (dispatch) => {
  try {
    const res = await axiosJWT.put(`/users/${id}`, data);
    console.log(res);
    if (res.data.success) {
      dispatch({
        type: EDIT_ADMIN,
        payload: res.data.user,
      });
      toast.success('Updated!');
    }
  } catch (err) {
    toast.success(err.response.data.message);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axiosJWT.get('/users');
    if (res.data.success) {
      dispatch({
        type: FETCH_USERS,
        payload: res.data.users,
      });
    }
  } catch (err) {
    toast.success(err.response.data.message);
  }
};

export const fetchUser = (id) => async (dispatch) => {
  try {
    const res = await axiosJWT.get(`/users/${id}`);
    if (res.data.success) {
      dispatch({
        type: FETCH_USER,
        payload: res.data.user,
      });
    }
  } catch (err) {}
};

export const banUser = (id, setLoading) => async (dispatch) => {
  try {
    const res = await axiosJWT.post(`/users/ban`, { id });
    if (res.data.success) {
      dispatch({
        type: BAN_USER,
        payload: res.data.user,
      });
      setLoading(false);
      toast.success('Banned!');
    }
  } catch (err) {}
};

export const unLockUser = (id, setLoading) => async (dispatch) => {
  try {
    const res = await axiosJWT.post(`/users/unlock`, { id });
    if (res.data.success) {
      dispatch({
        type: UNLOCK_USER,
        payload: res.data.user,
      });
      setLoading(false);
      toast.success('Unlocked!');
    }
  } catch (err) {}
};

export const fetchClasses = () => async (dispatch) => {
  try {
    const res = await axiosJWT.get('/courses/all');
    if (res.data.success) {
      dispatch({
        type: FETCH_CLASSES,
        payload: res.data.courses,
      });
    }
  } catch (err) {}
};

export const fetchClass = (id) => async (dispatch) => {
  try {
    const res = await axiosJWT.get(`/courses/all/${id}`);
    if (res.data.success) {
      dispatch({
        type: FETCH_CLASS,
        payload: res.data.course,
      });
    }
  } catch (err) {}
};

export const mapStudentId = (userId, studentId) => async (dispatch) => {
  try {
    const res = await axiosJWT.patch('/users/map', {
      id: userId,
      student: studentId,
    });
    if (res.data.success) {
      dispatch({
        type: MAP_STUDENTID,
        payload: res.data.user,
      });
      toast.success('Mapped!');
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const unMapStudentId = (userId) => async (dispatch) => {
  try {
    const res = await axiosJWT.patch('/users/unmap', {
      id: userId,
    });
    if (res.data.success) {
      dispatch({
        type: UNMAP_STUDENTID,
        payload: res.data.user,
      });
      toast.success('Unmapped!');
    }
  } catch (err) {}
};
