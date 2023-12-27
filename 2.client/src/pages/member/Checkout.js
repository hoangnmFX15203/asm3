import React, { useEffect, useState } from 'react'
import payment from 'assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney } from 'ultils/helpers'
import { Button, InputForm } from 'components'
import { useForm } from 'react-hook-form'
import { apiCreateOrder } from 'apis'

const Checkout = () => {
    const {currentCart, current} = useSelector(state => state.user)
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useForm();

    useEffect(() => {
        setValue('address', current?.address)
    },[current])
    const address = watch('address')
    const handleOnclick = async () => {
        const cart = []
        currentCart.map(el => cart.push({
            product: el.product?._id,
            quantity: el.quantity,
            color: el.color,
            price: el.product?.price,
            title: el.product?.title,
            thumbnail: el.product?.thumb || el.product?.thumbnail
            
        }))
        const total = +currentCart?.reduce((sum, el) => +el.product?.price*el.quantity + sum, 0)
        const response = await apiCreateOrder({products: cart, total, address})
        if (response.data.success) {
            window.close()
        }
    }
    return <div className='p-8  w-full gap-6 grid grid-cols-10 h-full max-h-screen overflow-y-auto'>
        <div className='w-full flex justify-center items-center col-span-4'>
            <img src={payment} alt='payment' className='h-[70%] object-contain' />
        </div>
        <div className='w-full flex flex-col col-span-6 gap-6 justify-center'>
            <h2 className='text-3xl mb-6 font-bold'>Checkout your order</h2>
            <div className='flex w-full gap-6 justify-between'>
                <table className='table-auto flex-1'>
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
            </div>
            <div className='flex-1 flex flex-col justify-betwwen'>
                <span className='flex items-center gap-8 text-sm'>
                        <span className='font-medium'>Subtotal: </span>
                        <span className='text-main font-bold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el.product?.price*el.quantity + sum, 0))} VND`}</span>
                </span>
                <InputForm
                    label="Your Address"
                    register={register}
                    errors={errors}
                    id="address"
                    validate={{
                        required: 'Need fill this field',
                    }}
                    placeholder="Please fill the address first"
                    fullWidth
                />
                {address && address?.length > 10 && <div className='w-full mx-auto'><Button handleOnclick={handleOnclick} name='Order' fw></Button></div>}
            </div>
        </div>
        
    </div>
}

export default Checkout