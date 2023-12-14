import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { apiGetProducts } from '../../apis/product';
import { Product, CustomSlider } from '..';
import { getNewProducts } from '../../store/products/asynsActions';
import { useDispatch, useSelector } from 'react-redux';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const tabs = [
    { id: 1, name: 'Best Seller' },
    { id: 2, name: 'New Arrivals' },
];

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState(null);
    // const [newProducts, setNewProducts] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const { newProducts } = useSelector((state) => state.products);

    const fetchProducts = async () => {
        const response = await apiGetProducts({ sort: '-sold' });
        if (response?.data.success) {
            setBestSeller(response.data.products);
            setProducts(response.data.products);
        }
    };

    useEffect(() => {
        fetchProducts();
        dispatch(getNewProducts());
    }, []);

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSeller);
        if (activedTab === 2) setProducts(newProducts);
    }, [activedTab]);

    return (
        <div>
            <div className="flex text-[20px]  ml-[32px]">
                {tabs.map((el) => (
                    <span
                        key={el.id}
                        className={`font-semibold px-8 uppercase border-r cursor-pointer text-gray-400 ${
                            activedTab === el.id ? 'text-gray-900' : ''
                        }`}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
                <CustomSlider products={products} activedTab={activedTab} />
            </div>
            <div className="w-full flex gap-4 mt-4">
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                    className="flex-1 object-contain"
                />
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                    className="flex-1 object-contain"
                />
            </div>
        </div>
    );
};

export default BestSeller;
