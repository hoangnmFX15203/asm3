import React, { useEffect, useState, useCallback } from 'react';
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from 'apis/user';
import { isAdmin } from 'ultils/constant';
import moment from 'moment';
import { InputField, InputForm, Select, Button } from 'components';
import useDebounce from './../../hook/useDebounce';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clsx from 'clsx';

const ManageUser = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        email: '',
        username: '',
        firstname: '',
        lastname: '',
        isAdmin: '',
        mobile: '',
    });
    const [users, setUsers] = useState(null);
    const [queries, setQueries] = useState({
        q: '',
    });

    const [editElm, setEditElm] = useState(null);
    const [update, setUpdate] = useState(false);
    const [params] = useSearchParams();

    const queriesDebouce = useDebounce(queries.q, 800);

    const fetchUsers = async (params) => {
        const response = await apiGetUsers(params);
        if (response.data.success) setUsers(response.data.rs);
    };

    const render = useCallback(() => {
        setUpdate(!update);
    }, [update]);

    useEffect(() => {
        const params = {};
        if (queriesDebouce) params.q = queriesDebouce;
        fetchUsers(params);
    }, [queriesDebouce, update, params]);

    // const setValue = useCallback(
    //     (value) => {
    //         setQueries(value);
    //     },
    //     [queries],
    // );

    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editElm._id);
        if (response.data.success) {
            setEditElm(null);
            render();
            toast.success(response.mes);
        } else toast.error(response.mes);
    };

    const handleDeleteUser = (uid) => {
        Swal.fire({
            title: 'Are you sure...',
            text: 'Are you ready remove this user?',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid);
                if (response.data.success) {
                    render();
                    toast.success(response.data.mes);
                } else {
                    toast.error(response.data.mes);
                }
            }
        });
    };

    return (
        <div className={clsx('w-full', editElm && 'pl-16 ml-8')}>
            <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
                <span>Manage Users</span>
            </h1>
            <div className="w-full p-4">
                <div className="flex justify-end py-4">
                    <InputField
                        nameKey={'q'}
                        value={queries.q}
                        setValue={setQueries}
                        style="w500"
                        placeholder="Search user's name..."
                    />
                </div>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    {editElm && (
                        <Button
                            type="submit"
                            className="flex justify-end py-4"
                            name="Update"
                        >
                            'Update'
                        </Button>
                    )}
                    <table className="table-auto mb-6 text-left w-full">
                        <thead className="font-bold bg-gray-700 text-[13px] text-white">
                            <tr className="border border-gray-500 ">
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">First Name</th>
                                <th className="px-4 py-2">Lat Name</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((el, index) => (
                                <tr
                                    key={el._id}
                                    className="border border-gray-500"
                                >
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">
                                        {editElm?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.email}
                                                id={'email'}
                                                validate={{
                                                    required: true,
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message:
                                                            'invalid email address',
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <span>{el.email}</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {editElm?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.username}
                                                id={'username'}
                                                validate={{
                                                    required: true,
                                                }}
                                            />
                                        ) : (
                                            <span>{el.username}</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {editElm?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={
                                                    editElm?.firstname
                                                }
                                                id={'firstname'}
                                                validate={{ required: true }}
                                            />
                                        ) : (
                                            <span>{el.firstname}</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {editElm?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.lastname}
                                                id={'lastname'}
                                                validate={{ required: true }}
                                            />
                                        ) : (
                                            <span>{el.lastname}</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {editElm?._id === el._id ? (
                                            <Select
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={el.isAdmin}
                                                id={'isAdmin'}
                                                validate={{ required: true }}
                                                option={isAdmin}
                                            />
                                        ) : (
                                            <span>
                                                {
                                                    isAdmin.find(
                                                        (role) =>
                                                            +role.code ===
                                                            +el.isAdmin,
                                                    )?.value
                                                }
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {editElm?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={editElm?.mobile}
                                                id={'mobile'}
                                                validate={{
                                                    required: true,
                                                    pattern: {
                                                        value: /^[62|0]+\d{9}/gi,
                                                        message:
                                                            'invalid phone number',
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <span>{el.mobile}</span>
                                        )}
                                    </td>

                                    <td className="py-2 px-4">
                                        {editElm?._id === el._id ? (
                                            <span
                                                className="px-2 text-orange-600 hover:underline cursor-pointer"
                                                onClick={() => {
                                                    setEditElm(null);
                                                }}
                                            >
                                                Back
                                            </span>
                                        ) : (
                                            <span
                                                className="px-2 text-orange-600 hover:underline cursor-pointer"
                                                onClick={() => {
                                                    setEditElm(el);
                                                }}
                                            >
                                                Edit
                                            </span>
                                        )}

                                        <span
                                            className="px-2 text-orange-600 hover:underline cursor-pointer"
                                            onClick={() =>
                                                handleDeleteUser(el._id)
                                            }
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default ManageUser;
