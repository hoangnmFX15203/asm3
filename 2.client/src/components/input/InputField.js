import React from 'react';
import clsx from 'clsx';

const InputField = ({
    value,
    setValue,
    nameKey,
    type,
    invalidFields,
    setInvalidFields,
    style,
    fullWidth,
    placeholder,
}) => {
    return (
        <div
            className={
                (clsx('flex flex-col mb-2 relative'), fullWidth && 'w-full')
            }
        >
            <label
                className="text-[10px] absolute top-0 left-[12px] block bg-white px-1"
                htmlFor={nameKey}
            >
                {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            </label>
            <input
                type={type || 'text'}
                className={clsx(
                    'px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic outline-none',
                    style,
                )}
                placeholder={
                    placeholder ||
                    nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
                }
                value={value}
                onChange={(e) =>
                    setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
                }
            />
        </div>
    );
};

export default InputField;
