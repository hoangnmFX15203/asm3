import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCategories = createAsyncThunk(
    'app/categories',
    async (data, { rejectWithValue }) => {
        const response = await apis.apiGetCategory();

        if (!response.data.success) return rejectWithValue(response);
        return response.data.prodCategories;
    },
);

// export const getProduct = createAsyncThunk(
//     'app/products',
//     async (data, { rejectWithValue }) => {
//         const response = await apis.apiGetProduct();
        
//         if (!response.data.success) return rejectWithValue(response);
//         return response.data.products;
//     },
// );
