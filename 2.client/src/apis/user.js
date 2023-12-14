import axios from '../axios';

export const apiRegister = (data) =>
    axios({
        url: 'auth/register',
        method: 'post',
        data: data,
    });

export const apiLogin = (data) =>
    axios({
        url: 'auth/login',
        method: 'post',
        data: data,
    });

export const apiGetCurrent = () =>
    axios({
        url: '/user/current',
        method: 'get',
    });

export const apiGetUsers = (params) =>
    axios({
        url: '/user',
        method: 'get',
        params,
    });

export const apiUpdateUser = (data, uid) =>
    axios({
        url: '/user/' + uid,
        method: 'put',
        data,
    });

export const apiDeleteUser = (uid) =>
    axios({
        url: '/user/' + uid,
        method: 'delete',
    });

export const apiUpdateCurrentUser = (data) =>
    axios({
        url: '/user/current',
        method: 'put',
        data,
    });

export const apiUpdateCart = (data) =>
    axios({
        url: '/user/cart',
        method: 'put',
        data,
    });

export const apiRemoveCart = (pid) =>
    axios({
        url: '/user/remove-cart/' +pid,
        method: 'delete',
    });
