import axios from '../axios';

export const apiGetCategory = () =>
    axios({
        url: 'product/prodcategory',
        method: 'GET',
    });

// export const apiGetProduct = (params) =>
//     axios({
//         url: '/product/',
//         method: 'GET',
//         params,
//     });
