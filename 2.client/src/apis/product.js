import axios from '../axios';

export const apiGetProducts = (params) =>
    axios({
        url: '/product/',
        method: 'GET',
        params,
    });

export const apiGetProduct = (pid) =>
    axios({
        url: '/product/' + pid,
        method: 'GET',
    });

export const apiCreateProduct = (data) =>
    axios({
        url: '/product/',
        method: 'post',
        data
    });

export const apiUpdateProduct = (data, pid) =>
    axios({
        url: '/product/' + pid,
        method: 'put',
        data
    });

export const apiDeleteProduct = (pid) =>
    axios({
        url: '/product/' + pid,
        method: 'delete',
    });

export const apiCreateOrder = (data) =>
    axios({
        url: '/order/',
        method: 'post',
        data
    });
