import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store, persistor} from './store/redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                    <ToastContainer />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
