import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
import { getCurrent } from '../../store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../../ultils/icons';
import { logout } from '../../store/user/userSlice';

const { AiOutlineLogout } = icons;

const TopHeader = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, current, isAdmin } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn) {
                await dispatch(getCurrent());
            }
        };
        fetchData();
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        console.log(current);
    }, [current]);
    return (
        <div className="h-[38px] w-full bg-main flex items-center justify-center">
            <div className="w-main flex items-center justify-between text-xs text-white">
                <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                {isLoggedIn ? (
                    <div className="flex gap-2 text-sm items-center">
                        <small className="flex items-center justify-center">
                            <span>{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
                            <span
                                className="hover:rounded-full hover:bg-gray-200 p-2 hover:text-main cursor-pointer"
                                onClick={() => dispatch(logout())}
                            >
                                <AiOutlineLogout size={18} />
                            </span>
                        </small>
                    </div>
                ) : (
                    <Link className="hover:text-gray-800" to={`/${path.LOGIN}`}>
                        Sign In or Create Account
                    </Link>
                )}
            </div>
        </div>
    );
};

export default memo(TopHeader);
