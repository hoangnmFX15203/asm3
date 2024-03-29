import { Breadcrumbs, Button, OrderItem, SelectQuantity } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from 'ultils/helpers';
import path from 'ultils/path';

const DetailCart = ({location, dispatch}) => {
    const { currentCart, current } = useSelector(state => state.user)
    const handleSubmit = () => {
        window.open(`/${path.CHECKOUT}`, '_blank')
    }
    
    

    return <div className='w-full'>
                <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                    <div className="w-main">
                        <h3 className="font-semibold uppercase">My Cart</h3>
                        <Breadcrumbs category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                    </div>
                </div>
                <div className='flex flex-col border my-8 w-main mx-auto'>
                <div className='w-main mx-auto bg-gray-200 opacity-70 font-bold grid py-3 grid-cols-10'>
                    <span className='col-span-6 w-full text-center'>Products</span>
                    <span className='col-span-1 w-full text-center'>Quantity</span>
                    <span className='col-span-3 w-full text-center'>Price</span>
                </div>
                {currentCart?.map(el => <OrderItem key={el._id} el={el} defaultQuantity={el.quantity} />)}
                </div>
                <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
                    <span className='flex items-center gap-8 text-sm'>
                    <span>Subtotal: </span>
                    <span className='text-main font-bold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el.product?.price*el.quantity + sum, 0))} VND`}</span>
                    </span>
                    <span className='text-xs italic'>Shipping, taxes, and discounts calculated at checkout.</span>
                    <Button name='Check out' handleOnclick={handleSubmit}></Button>
                    {/* <Link target='blank' to={`/${path.CHECKOUT}`} className='text-white bg-main rounded-md px-2 py-2'>Checkout</Link> */}
                </div>
            </div>
}

export default withBaseComponent(DetailCart)