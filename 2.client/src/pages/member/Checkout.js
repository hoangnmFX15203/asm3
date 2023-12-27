import React, { useState } from 'react'
import payment from 'assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney } from 'ultils/helpers'
import { Button } from 'components'

const Checkout = () => {
    const {currentCart} = useSelector(state => state.user)
    const [order,setOrder] = useState([])
    const handleOrder = () => {
        
    }
    return <div className='p-8  w-full gap-6 grid grid-cols-10 h-full max-h-screen overflow-y-auto'>
        <div className='w-full flex justify-center items-center col-span-4'>
            <img src={payment} alt='payment' className='h-[70%] object-contain' />
        </div>
        <div className='w-full flex flex-col col-span-6 gap-6 items-center justify-center'>
            <h2 className='text-3xl mb-6 font-bold'>Checkout your order</h2>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='border bg-gray-200'>
                        <th className='text-left p-2'>Product</th>
                        <th className='text-center p-2'>Quantity</th>
                        <th className='text-right p-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCart.map((el, index) => (
                        <tr key={index} className='border'>
                            <td className='text-left p-2'>{el.product.title}</td>
                            <td className='text-center p-2'>{el.quantity}</td>
                            <td className='text-right p-2'>{formatMoney(el.product.price) + ' VND'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span className='flex items-center gap-8 text-sm'>
                    <span>Subtotal: </span>
                    <span className='text-main font-bold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el.product?.price*el.quantity + sum, 0))} VND`}</span>
                    </span>
            <div>input address</div>
            <div className='w-full mx-auto'><Button name='Order' fw></Button></div>
        </div>
        
    </div>
}

export default Checkout