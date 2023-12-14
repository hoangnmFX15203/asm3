import React, { useEffect, useState } from 'react';
import {
    Sidebar,
    Banner,
    BestSeller,
    DealDaily,
    FeatureProducts,
    Product,
    CustomSlider,
} from '../../components/index';
// import Sidebar from '../../components/Sidebar/Sidebar';

import { useSelector } from 'react-redux';
import { userSlice } from './../../store/user/userSlice';

const Home = () => {
    const { newProducts } = useSelector((state) => state.products);
    const { isLoggedIn, current } = useSelector((state) => state.user);
    // const { categories } = useSelector((state) => state.app);
    return (
        <>
            <div className="w-main flex mt-6">
                <div className="flex flex-col gap-5 w-[25%] flex-auto">
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className="my-8">
                <FeatureProducts />
            </div>
            <div className="my-8 w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                    NEW ARRIVALS
                </h3>
                <div className="mt-4 mx-[-10px]">
                    <CustomSlider products={newProducts} />
                </div>
            </div>
            <div className="my-8 w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                    HOT COLLECTIONS
                </h3>
            </div>
        </>
    );
};

export default Home;
