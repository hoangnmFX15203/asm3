import React, { useCallback, useEffect, useState } from 'react';
import { InputForm } from 'components';
import { useForm } from 'react-hook-form';
import { apiGetProducts, apiDeleteProduct } from 'apis/product';
import { useSearchParams } from 'react-router-dom';
import useDebounce from './../../hook/useDebounce';
import UpdateProduct from './UpdateProduct';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const ManageProducts = () => {
    const [params] = useSearchParams();
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch,
    } = useForm();

    const [products, setProducts] = useState(null);
    const [count, setCount] = useState(0);
    const [editProduct, setEditProduct] = useState(null);
    const [update, setUpdate] = useState(false)

    const render = useCallback(() => {
        setUpdate(!update)
    }, [])

    const handleSearchProducts = (data) => {
        console.log(data);
    };

    const fetchProducts = async (params) => {
        const response = await apiGetProducts(params);
        if (response.data?.success) {
            setProducts(response.data?.products);
            setCount(response.data?.count);
        }
    };

    const queryDebounce = useDebounce(watch('q', 800));

    useEffect(() => {
        const searchParams = Object.fromEntries([...params]);
        if (queryDebounce) searchParams.q = queryDebounce;
        fetchProducts(searchParams);
    }, [params, queryDebounce, update]);

    const handleDeleteProduct = (pid) => {
        Swal.fire({
            title: 'Are you sure',
            text: 'Are you sure delete this product',
            icon: 'warning', showCancelButton: true
        }).then (async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteProduct(pid)
                if (response.success) toast.success(response.mes)
                else toast.error(response.mes)
            render()
            }
        })
    }
    return (
        <div className="w-full flex flex-col gap-4 relative">
            {editProduct && (
                <div className="absolute inset-0 min-h-screen z-50 bg-gray-100">
                    <UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct} />
                </div>
            )}
            <div className="h-[60px] w-full"></div>
            <div className="p-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0">
                <h1 className="text-3xl font-bold tracking-tight ">
                    Manage Products
                </h1>
            </div>
            <div className="flex w-full justify-end items-center px-4">
                <form
                    className="w-[45%]"
                    onSubmit={handleSubmit(handleSearchProducts)}
                >
                    <InputForm
                        id="q"
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder="Search products by title"
                    />
                </form>
            </div>
            <table className="table-auto">
                <thead>
                    <tr className="border bg-sky-900 text-white border-white">
                        <th className="text-center py-2">Order</th>
                        <th className="text-center py-2">Thumb</th>
                        <th className="text-center py-2">Title</th>
                        <th className="text-center py-2">Category</th>
                        <th className="text-center py-2">Price</th>
                        <th className="text-center py-2">Quantity</th>
                        <th className="text-center py-2">Sold</th>
                        <th className="text-center py-2">Color</th>
                        <th className="text-center py-2">Ratings</th>
                        <th className="text-center py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((el, idx) => (
                        <tr className="border-b" key={el._id}>
                            <td className="text-center py-2">{idx + 1}</td>
                            <td className="text-center py-2">
                                <img
                                    src={el.thumb}
                                    alt="thumb"
                                    className="w-12 h-12 object-cover"
                                />
                            </td>
                            <td className="text-center py-2">{el.title}</td>
                            <td className="text-center py-2">
                                {el.categories}
                            </td>
                            <td className="text-center py-2">{el.price}</td>
                            <td className="text-center py-2">{el.quantity}</td>
                            <td className="text-center py-2">{el.sold}</td>
                            <td className="text-center py-2">{el.color}</td>
                            <td className="text-center py-2">
                                {el.totalRatings}
                            </td>
                            <td className="text-center py-2">
                                <span className="text-blue-500 hover:underline cursor-pointer px-1" onClick={() => setEditProduct(el)}>
                                    Edit
                                </span>
                                <span className="text-blue-500 hover:underline cursor-pointer px-1" onClick={() => handleDeleteProduct(el._id)}>
                                    Remove
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;
