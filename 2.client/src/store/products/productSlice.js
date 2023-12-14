import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNewProducts } from './asynsActions';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        errorMessage: '',
    },
    reducer: {
        // logout: (state) => {
        //     state.isLoading = false;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
    // name: 'getProduct',
    // initialState: {
    //     products: null,
    //     isLoading: false,
    // },
    // reducer: {
    //     // logout: (state) => {
    //     //     state.isLoading = false;
    //     // },
    // },
    // extraReducers: (builder) => {
    //     builder.addCase(actions.getProduct.pending, (state) => {
    //         state.isLoading = true;
    //     });

    //     builder.addCase(actions.getProduct.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.categories = action.apiGetProducts;
    //     });

    //     builder.addCase(actions.getProduct.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.errorMessage = action.payload.message;
    //     });
    // },
});

// export const {} = appSlice.actions;

export default productSlice.reducer;
