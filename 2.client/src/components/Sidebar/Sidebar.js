import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { apiGetCategory } from '../../apis/app';
import { createSlug } from '../../ultils/helpers';

const Sidebar = () => {
    const { categories } = useSelector((state) => state.app);
    return (
        <div className="flex flex-col border">
            {categories?.map((el) => {
                return (
                    <NavLink
                        key={createSlug(el.type)}
                        to={createSlug(el.type)}
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                                : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                        }
                    >
                        {el.type}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;
