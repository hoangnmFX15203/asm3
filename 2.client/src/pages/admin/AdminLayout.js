import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../ultils/path';
import { useSelector } from 'react-redux';
import { AdminSidebar } from 'components';

const AdminLayout = () => {
    const { isLoggedIn, current, isAdmin } = useSelector((state) => state.user);
    if (!isLoggedIn || +isAdmin !== 1)
        return <Navigate to={`/${path.LOGIN}`} replace={true} />;
    return (
        <div className="flex w-full bg-white min-h-screen relative text-gray-900">
            <div className="w-[327px] top-0 bottom-0 flex-one fixed">
                <AdminSidebar />
            </div>
            <div className="w-[327px]"></div>
            <div className="flex-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
