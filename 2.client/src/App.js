import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Routes } from 'react-router-dom';
import {
    Login,
    Public,
    Home,
    FAQ,
    Services,
    DetailProduct,
    Products,
    DetailCart
} from './pages/public';
import {
    AdminLayout,
    ManageOrder,
    CreateProduct,
    DashBoard,
    ManageProducts,
    ManageUser,
} from './pages/admin';
import { MemberLayout, Personal, History, MyCart, Checkout } from './pages/member';
import { StaffLayout } from './pages/staff';
import path from './ultils/path';
import { getCategories } from './store/app/asyncAction';
import Cart from './components/products/Cart';
import { showCart } from 'store/app/appSlice';

function App() {
    const { isShowCart } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    return (
        <div className="min-h-screen font-main relative">
            {isShowCart && (
                <div onClick={() => dispatch(showCart())} className="absolute inset-0 bg-overlay z-50 flex justify-end">
                    <Cart />
                </div>
            )}
            <Routes>
                    <Route path={path.CHECKOUT} element={<Checkout />} />
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />

                    <Route
                        path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
                        element={<DetailProduct />}
                    />
                    <Route path={path.FAQs} element={<FAQ />} />
                    <Route path={path.OUR_SERVICES} element={<Services />} />
                    <Route path={path.PRODUCTS} element={<Products />} />
                    <Route path={path.DETAIL_CART} element={<DetailCart />} />
                    <Route path={path.ALL} element={<Home />} />
                </Route>
                <Route path={path.ADMIN} element={<AdminLayout />}>
                    <Route path={path.DASHBOARD} element={<DashBoard />} />
                    <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
                    <Route
                        path={path.CREATE_PRODUCT}
                        element={<CreateProduct />}
                    />
                    <Route
                        path={path.MANAGE_PRODUCTS}
                        element={<ManageProducts />}
                    />
                    <Route path={path.MANAGE_USER} element={<ManageUser />} />
                </Route>
                <Route path={path.MEMBER} element={<MemberLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                    <Route path={path.MY_CART} element={<DetailCart />} />
                    <Route path={path.HISTORY} element={<History />} />
                </Route>
                <Route path={path.STAFF} element={<StaffLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                </Route>
                <Route path={path.LOGIN} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
