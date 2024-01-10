import React, { useEffect, useState } from 'react';
import { apiGetUserOrders } from 'apis/product';
import { useForm } from 'react-hook-form';
import { CustomSelect, InputForm } from 'components';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { formatMoney } from 'ultils/helpers';
import { statusOrder } from 'ultils/constant';
import withBaseComponent from 'hocs/withBaseComponent';

const History = ({ navigate, location }) => {
    const [orders, setOrders] = useState(null);
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useForm();
    const [isMounted, setIsMounted] = useState(false);
    const q = watch('q');
    const status = watch('status');
    const params = useSearchParams();

    const fetchOrder = async (params) => {
        try {
            const response = await apiGetUserOrders({
                ...params,
            });

            if (response.data.success) {
                setOrders(response.data.order);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        const pr = Object.fromEntries([...params]);
        if (!isMounted) {
            fetchOrder(pr);
            setIsMounted(true);
        }
    }, [isMounted, params]);

    const handleSearchStatus = ({ value }) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ status: value }).toString(),
        });
    };

    return (
        <div className="w-full relative p-4">
            <header className="text-3xl font-semibold py-4 border-b-blue-200">
                Personal
            </header>
            <div className="flex justify-end items-center px-4">
                <form className="w-[45%] flex items-center gap-4">
                    <InputForm
                        id="q"
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder="Search orders by status"
                    />
                    <CustomSelect
                        options={statusOrder}
                        value={status}
                        onChange={(val) => handleSearchStatus(val)}
                        classname="col-span-1"
                    />
                </form>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border bg-sky-900 text-white border-white">
                        <th className="text-center py-2">#</th>
                        <th className="text-center py-2">Products</th>
                        <th className="text-center py-2">Total</th>
                        <th className="text-center py-2">Status</th>
                        <th className="text-center py-2">Created At</th>
                        <th className="text-center py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((el, idx) => (
                        <tr className="border-b" key={el._id}>
                            <td className="text-center py-2">{idx + 1}</td>
                            <td className="text-center py-2">
                                <span className="flex flex-col items-start">
                                    {el.products?.map((item) => (
                                        <span key={item._id}>
                                            {`• ${item.title}`}
                                            {item.color && ` - ${item.color}`}
                                        </span>
                                    ))}
                                </span>
                            </td>
                            <td className="text-center py-2">
                                {formatMoney(el.total)}
                            </td>
                            <td className="text-center py-2">{el.status}</td>
                            <td className="text-center py-2">
                                {moment(el.createdAt)?.format('DD/MM/YYYY')}
                            </td>
                            <td className="text-center py-2">
                                {/* <span className="text-blue-500 hover:underline cursor-pointer px-1" onClick={() => setEditProduct(el)}>
                                Edit
                            </span>
                            <span className="text-blue-500 hover:underline cursor-pointer px-1" onClick={() => handleDeleteProduct(el._id)}>
                                Remove
                            </span> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default withBaseComponent(History);
