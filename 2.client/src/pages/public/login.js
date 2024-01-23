import React, { useState, useCallback } from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin } from './../../apis';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import path from '../../ultils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        mobile: '',
    });
    const [isRegister, setIsRegister] = useState(false);
    const resetPayload = () => {
        setPayload({
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: '',
            mobile: '',
        });
    };
    const handleSubmit = useCallback(async () => {
        const { firstName, lastname, email, mobile, ...data } = payload;
        if (isRegister) {
            const response = await apiRegister(payload);
            console.log(response)
            Swal.fire(
                response.data.success ? 'Congulation' : 'Ooop!',
                response.data.message,
                response.data.success ? 'success' : 'error',
            ).then(() => {
                setIsRegister(false);
                resetPayload();
            });
        } else {
            const rs = await apiLogin(data);
            if (rs.data.success) {
                dispatch(
                    login({
                        isLoggedIn: true,
                        token: rs.data.accessToken,
                        userData: rs.data.userData,
                        isAdmin: rs.data.isAdmin,
                    }),
                );
                setTimeout(() => {
                    navigate(`/${path.HOME}`);
                }, 100);
            } else Swal.fire('OoopS!', rs.data.mess, 'error');
        }
    }, [payload, isRegister]);
    return (
        <div className="w-screen h-screen relative">
            <img
                src="https://i.pinimg.com/736x/0a/be/92/0abe9229c939b8361f2d8a1085c3be0d.jpg"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
                <div classNames="p-8 bg-white flex f;ex-col items-center rounded-md min-w-[500px]">
                    <h1 className="text-[28px] font-semibold text-main mb-8">
                        {isRegister ? 'Register' : 'Login'}
                    </h1>
                    <InputField
                        value={payload.username}
                        setValue={setPayload}
                        nameKey="username"
                    />
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey="password"
                        type="password"
                    />
                    {isRegister && (
                        <InputField
                            value={payload.email}
                            setValue={setPayload}
                            nameKey="email"
                        />
                    )}
                    {isRegister && (
                        <InputField
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey="mobile"
                        />
                    )}
                    {isRegister && (
                        <div className="flex items-center gap-2">
                            <InputField
                                value={payload.firstName}
                                setValue={setPayload}
                                nameKey="firstname"
                            />
                            <InputField
                                value={payload.lastname}
                                setValue={setPayload}
                                nameKey="lastname"
                            />
                        </div>
                    )}
                    <Button
                        name={isRegister ? 'Register' : 'Login'}
                        handleOnclick={handleSubmit}
                        fw
                    />
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && (
                            <span className="text-blue-500 hover:underline cursor-pointer">
                                Forgot Password
                            </span>
                        )}
                        {!isRegister && (
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => setIsRegister(true)}
                            >
                                Create Account
                            </span>
                        )}
                        {isRegister && (
                            <span
                                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                                onClick={() => setIsRegister(false)}
                            >
                                Go Login
                            </span>
                        )}
                    </div>
                    <Link
                        className="flex text-blue-500 text-sm hover:underline cursor-pointer w-full text-center justify-center items-center"
                        to={`/${path.HOME}`}
                    >
                        Go home?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
