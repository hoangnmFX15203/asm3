import React, { useState, useEffect, Fragment, memo } from 'react';
import logo from '../../assets/logo.png';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'store/user/userSlice';
import { BsCartCheckFill } from 'react-icons/bs';
import withBaseComponent from './../../hocs/withBaseComponent';
import { showCart } from 'store/app/appSlice';

const { BsFillTelephoneFill, MdEmail, FaUser, BsBagPlusFill } = icons;
const Header = () => {
    const dispatch = useDispatch();
    const [isShowOption, setIsShowOption] = useState(false);
    const { current } = useSelector((state) => state.user);
    // const handleRole = () => {
    //     if (+current?.isAdmin === 1) {
    //         setRole(`/${path.ADMIN}/${path.DASHBOARD}`);
    //     } else if (+current?.isAdmin === 3) {
    //         setRole(`/${path.STAFF}`);
    //     } else {
    //         setRole(`/${path.MEMBER}/${path.PERSONAL}`);
    //     }
    // };

    useEffect(() => {
        const handleClickOutsideOption = (e) => {
            const profile = document.getElementById('profile');
            if (!profile?.contains(e.target)) setIsShowOption(false);
        };

        document.addEventListener('click', handleClickOutsideOption);

        return () => {
            document.removeEventListener('click', handleClickOutsideOption);
        };
    }, []);
    return (
        <div className="w-main flex justify-between h-[110px] py-[35px]">
            <Link to={`/${path.HOME}`}>
                <img
                    src={logo}
                    alt="logo"
                    className="w-[234px] object-contain"
                />
            </Link>
            <div className="flex text-[13px]">
                <div className="flex flex-col px-6 border-r items-center">
                    <span className="font-semibold flex gap-4 items-center">
                        <BsFillTelephoneFill color="red" />
                        (+1800) 000 8808
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col px-6 border-r items-center">
                    <span className="font-semibold flex gap-4 items-center">
                        <MdEmail color="red" />
                        SUPPORT@TADATHEMES.COM
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {current && (
                    <Fragment>
                        <div
                            onClick={() => dispatch(showCart())}
                            className="cursor-pointer flex items-center px-6 border-r justify-center gap-2"
                        >
                            <BsBagPlusFill color="red" />
                            <span>{`${
                                current?.cart?.length || 0
                            } item(s)`}</span>
                        </div>
                        <div
                            className="flex items-center justify-center px-6 gap-2 cursor-pointer relative"
                            id="profile"
                            onClick={() => {
                                setIsShowOption((prev) => !prev);
                            }}
                        >
                            <FaUser color="red" />
                            <span>Profile</span>
                            {isShowOption && (
                                <div className="absolute top-full flex flex-col left-[16px] bg-gray-100 min-w-[150px] border py-2">
                                    <Link
                                        className="p-2 hover:bg-shy-100 w-full"
                                        to={`/${path.MEMBER}/${path.PERSONAL}`}
                                    >
                                        Personal
                                    </Link>
                                    {+current?.isAdmin === 1 && (
                                        <Link
                                            className="p-2 hover:bg-shy-100 w-full"
                                            to={`/${path.ADMIN}/${path.DASHBOARD}`}
                                        >
                                            Admin Workspace
                                        </Link>
                                    )}
                                    <span
                                        className="p-2 hover:bg-shy-100 w-full"
                                        onClick={() => dispatch(logout())}
                                    >
                                        Log Out
                                    </span>
                                </div>
                            )}
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Header));
