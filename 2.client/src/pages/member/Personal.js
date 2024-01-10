import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputForm, Button } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { apiUpdateCurrentUser } from 'apis/user';
import { getCurrent } from './../../store/user/asyncAction';
import { toast } from 'react-toastify';

const Personal = () => {
    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        reset,
    } = useForm();
    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            mobile: current?.mobile,
            email: current?.email,
        });
    }, [current]);

    const handleUpdateInformation = async (data) => {
        // const formData = new FormData();
        // for (let i of Object.entries(data)) formData.append(i[0], i[1]);
        const response = await apiUpdateCurrentUser(data);
        if (response.success) {
            dispatch(getCurrent());
            toast.success(response.mes);
        } else {
            toast.error(response.mes);
        }
    };
    return (
        <div className="w-full relative px-4">
            <header className="text-3xl font-semibold py-4 border-b-blue-200">
                Personal
            </header>
            <form
                onSubmit={handleSubmit(handleUpdateInformation)}
                className="w-3/5 mx-auto py-8 flex flex-col gap-4"
            >
                <InputForm
                    label="Firstname"
                    register={register}
                    errors={errors}
                    id="firstname"
                    validate={{
                        required: 'Need fill this field',
                    }}
                />
                <InputForm
                    label="Lastname"
                    register={register}
                    errors={errors}
                    id="lastname"
                    validate={{
                        required: 'Need fill this field',
                    }}
                />
                <InputForm
                    label="Email"
                    register={register}
                    errors={errors}
                    id="email"
                    validate={{
                        required: 'Need fill this field',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'invalid email address',
                        },
                    }}
                />
                <InputForm
                    label="Phone"
                    register={register}
                    errors={errors}
                    id="mobile"
                    validate={{
                        required: 'Need fill this field',
                        pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: 'invalid phone number',
                        },
                    }}
                />
                <div className="flex items-center gap-2">
                    <span className="font-medium">Role: </span>
                    <span>{+current?.isAdmin === 1 ? 'Admin' : 'User'}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                    <span className="font-medium">Profile Image: </span>
                    <img />
                </div> */}
                {isDirty && (
                    <div className="w-full flex justify-end">
                        <Button name="Update Infomation" type="submit"></Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Personal;
