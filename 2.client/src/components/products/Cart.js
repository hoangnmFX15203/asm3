import withBaseComponent from 'hocs/withBaseComponent';
import React, {memo} from 'react';
import { useSelector } from 'react-redux';
import { showCart } from 'store/app/appSlice';
import { formatMoney } from 'ultils/helpers';
import icons from 'ultils/icons';
import {Button} from 'components'
import { RiDeleteBin6Line } from "react-icons/ri";
import { apiRemoveCart, apiUpdateCart } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import { Navigate } from 'react-router-dom';
import path from 'ultils/path';

const Cart = ({dispatch, navigate}) => {
    const {currentCart} = useSelector(state => state.user)
    const { MdClose } = icons;

    const removeCart = async (pid) => {
        const response = await apiRemoveCart(pid);
        if (response.data.success) {
            toast.success(response.data.mes);
            dispatch(getCurrent());
        } else toast.error(response.data.mes);
    }
    
    return (
        <div onClick={e => e.stopPropagation()} className="w-[400px] h-screen overflow-y-auto bg-black text-white p-6 grid grid-rows-10">
            <header className="border-b border-gray-700 font-bold text-2xl flex justify-between items-center row-span-1 h-full">
                Your Cart
                <span onClick={() => dispatch(showCart())} className="cursor-pointer p-2">
                    <MdClose size={24} />
                </span>
            </header>
            <section className='row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto'>
                {!currentCart && <span className='text-xs italic'>Your Cart is empty</span>}
                {currentCart && currentCart?.map(el => (<div key={el._id} className='flex flex justify-between items-center'>
                    <div className='flex gap-2'>
                    <img src={el?.product?.thumb}  alt='thumb' className='w-16 h-16 object-cover'/>
                    <div className='flex flex-col gap-1'>
                        <span className='text-sm text-main'>{el.product?.title}</span>
                        <span className='text-[10px]'>{el?.color}</span>
                        <span className='text-[10px]'>{`Quantity: ${el.quantity}`}</span>
                        <span className='text-sm'>{formatMoney(el.product?.price)+ ' VND'}</span>
                    </div>
                    </div>
                    <span className='h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-700 cursor-pointer' onClick={() => removeCart(el.product?._id)}><RiDeleteBin6Line size={16} /></span>
                </div>))}
            </section>
            <div className='row-span-2 h-full flex flex-col justify-between'>
                <div className='flex items-center justify-between pt-4 border-t'>
                    <span>Subtotal: </span>
                    <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.product.price)*el?.quantity, 0)) + ' VND'}</span>
                </div>                
                    <span className='text-center text-gray-300 italic text-xs'>Shipping, taxes, and discounts calculated at checkout.</span>
                    <Button 
                    name='Shopping Cart' 
                    style='rounded-none w-full bg-main py-3' 
                    handleOnclick={() => {
                        dispatch(showCart())
                        navigate(`/${path.DETAIL_CART}`)
                    }}></Button>                
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Cart))
