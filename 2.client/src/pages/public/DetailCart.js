import { Breadcrumbs, Button, OrderItem, SelectQuantity } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatMoney } from 'ultils/helpers';

const DetailCart = ({location}) => {
    const {current } = useSelector(state => state.user)
    console.log(current?.cart)
    

    return <div className='w-full'>
                <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                    <div className="w-main">
                        <h3 className="font-semibold uppercase">My Cart</h3>
                        <Breadcrumbs category={location?.pathname} />
                    </div>
                </div>
                <div className='flex flex-col border my-8 w-main mx-auto'>
                <div className='w-main mx-auto bg-gray-200 opacity-70 font-bold grid py-3 grid-cols-10'>
                    <span className='col-span-6 w-full text-center'>Products</span>
                    <span className='col-span-1 w-full text-center'>Quantity</span>
                    <span className='col-span-3 w-full text-center'>Price</span>
                </div>
                {current?.cart?.map(el => <OrderItem key={el._id} el={el} />)}
                </div>
                <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
                    <span className='flex items-center gap-8 text-sm'>
                    <span>Subtotal: </span>
                    <span className='text-main font-bold'>{`${formatMoney(current?.cart?.reduce((sum, el) => +el.product?.price + sum, 0))} VND`}</span>
                    </span>
                    <span className='text-xs italic'>Shipping, taxes, and discounts calculated at checkout.</span>
                    <Button name='Checkout'></Button>
                </div>
            </div>
}

export default withBaseComponent(DetailCart)