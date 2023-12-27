import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './user/userSlice';

const commonConfig = {
    key: 'user',
    storage,
};

const userConfig = {
    ...commonConfig,
    whiteList: ['isLoggedIn', 'token', 'current', 'currentCart'],
};

export const store = configureStore({
    reducer: {
        app: appSlice,
        products: productSlice,
        user: persistReducer(userConfig, userSlice),
    },
});

export const persistor = persistStore(store);
