import React, { memo, useState, useEffect } from 'react';
import icons from '../../ultils/icons';
import { colors } from '../../ultils/constant';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

const { AiOutlineDown } = icons;
const SearchItem = ({
    name,
    activeClick,
    changeActiveFilter,
    type = 'checkbox',
}) => {
    const [selected, setSelected] = useState([]);
    const category = useParams();
    const navigate = useNavigate();
    const handleSelect = (e) => {
        const alreadyEl = selected.find((el) => el === e.target.value);
        if (alreadyEl) {
            setSelected((prev) => prev.filter((el) => el !== e.target.value));
        } else {
            setSelected((prev) => [...prev, e.target.value]);
        }
        changeActiveFilter(null);
    };

    useEffect(() => {
        if (selected.length > 0) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(','),
                }).toString(),
            });
        } else {
            navigate(`/${category}`);
        }
    }, [selected]);
    return (
        <div
            className="p-3 text-gray-500 text-xs cursor-pointer gap-6 border border-gray-800 flex justify-between items-center relative"
            onClick={() => changeActiveFilter(name)}
        >
            <span className="capitalize">{name}</span>
            <AiOutlineDown />
            {activeClick === name && (
                <div className="absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]">
                    {type === 'checkbox' && (
                        <div className="p-2">
                            <div className="p-4 items-center flex justify-between gap-8">
                                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                                <span
                                    className="underline cursor-pointer hover:text-main"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelected([]);
                                    }}
                                >
                                    Reset
                                </span>
                            </div>
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-col gap-3 mt-4"
                            >
                                {colors.map((el, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4"
                                    >
                                        <input
                                            name={el}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                                            value={el}
                                            id={el}
                                            onChange={handleSelect}
                                            checked={selected.some(
                                                (selectedItem) =>
                                                    selectedItem === el,
                                            )}
                                        />
                                        <label
                                            className="capitalize text-gray-700"
                                            htmlFor={el}
                                        >
                                            {el}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(SearchItem);
