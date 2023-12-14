import React from 'react';

const Button = ({ children, handleOnclick, style, fw, name, type='button' }) => {
    return (
        <button
            type={type}
            className={
                style
                    ? style
                    : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${
                          fw ? 'w-full' : 'w-fit'
                      }`
            }
            onClick={() => {
                handleOnclick && handleOnclick();
            }}
        >
            {name}
        </button>
    );
};

export default Button;
