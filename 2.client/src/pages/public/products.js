import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Product, SearchItem, Pagination } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const [params] = useSearchParams();

    const fetchProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response?.data.success) setProducts(response?.data);
    };

    useEffect(() => {
        fetchProductsByCategory();
    }, []);

    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of params) queries[i[0]] = i[1];
        fetchProductsByCategory(queries);
    }, [params]);

    const changeActiveFilter = useCallback(
        (name) => {
            if (activeClick === name) setActiveClick(null);
            else setActiveClick(name);
        },
        [activeClick],
    );
    return (
        <>
            <div className="w-full">
                <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                    <div className="w-main">
                        <h3 className="font-semibold uppercase">{category}</h3>
                        <Breadcrumbs category={category} />
                    </div>
                </div>
                <div className="w-main border p-4 flex mt-8 m-auto flex justify-between">
                    <div className="w-4/5 flex-auto flex flex-col gap-3">
                        <span className="font-semibold text-sm">Filter By</span>
                        <div className="flex items-center gap-4">
                            <SearchItem
                                name="price"
                                activeClick={activeClick}
                                changeActiveFilter={changeActiveFilter}
                            />
                            <SearchItem
                                name="color"
                                activeClick={activeClick}
                                changeActiveFilter={changeActiveFilter}
                            />
                        </div>
                    </div>
                    <div className="w-1/5 flex">Sort By</div>
                </div>
                <div className="mt-8 m-auto w-main">
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid flex mx-[-10px]"
                        columnClassName="my-masonry-grid_column"
                    >
                        {products?.products?.map((el) => (
                            <Product
                                key={el._id}
                                pid={el.id}
                                productData={el}
                                // isNew={activedTab === 1 ? false : true}
                                normal={true}
                            />
                        ))}
                    </Masonry>
                </div>
                <div className="w-main m-auto my-4 flex justify-end">
                    <Pagination totalCount={80} />
                </div>
            </div>
        </>
    );
};

export default Products;
