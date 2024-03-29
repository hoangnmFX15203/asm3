import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncAction';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        isAdmin: null,
        currentCart: []
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.current = action.payload.userData;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.current = null;
            state.isAdmin = null;
        },
        updateCart: (state, action) => {
           const {pid,quantity} = action.payload
           const updateItem = state.currentCart.find(el => el.product?._id === pid)
           if (updateItem) {
               updateItem.quantity = quantity
           } else {
               state.mes = 'Please try again'
           }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true
            state.currentCart = action.payload.cart;
        });

        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });
    },
});

export const { login, logout, updateCart } = userSlice.actions;

export default userSlice.reducer;
