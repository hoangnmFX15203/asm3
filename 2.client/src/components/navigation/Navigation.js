import React from 'react';
// import { navigation } from '../utils';
import { navigation } from '../../ultils/constant';
import { NavLink } from 'react-router-dom';

const notActiveStyle = '';
const activeStyle = '';

const Navigation = () => {
    return (
        <div className="w-main h-[48] py-2 border-y text-sm flex items-center">
            {navigation.map((el) => (
                <NavLink
                    to={el.path}
                    key={el.id}
                    className={(isActive) =>
                        isActive
                            ? 'pr-12 hover:text-main text-main'
                            : 'pr-12 hover:text-main'
                    }
                >
                    {el.value}
                </NavLink>
            ))}
        </div>
    );
};

export default Navigation;
