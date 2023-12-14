import React from 'react';
import icons from 'ultils/icons';

const Cart = () => {
    const { MdClose } = icons;
    return (
        <div className="w-[400px] max-h-screen overflow-y-auto bg-black text-white p-6 ">
            <header className="py-4 border-b border-gray-700 font-bold text-2xl flex justify-between items-center">
                Your Cart
                <span className="cursor-pointer p-2">
                    <MdClose size={24} />
                </span>
            </header>
        </div>
    );
};

export default Cart;
