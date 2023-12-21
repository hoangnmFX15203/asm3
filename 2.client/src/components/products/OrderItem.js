import { apiUpdateCart } from 'apis';
import SelectQuantity from 'components/common/SelectQuantity';
import withBaseComponent from 'hocs/withBaseComponent';
import React, {useState, useCallback, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getCurrent } from 'store/user/asyncAction';
import { updateCart } from 'store/user/userSlice';
import { formatMoney } from 'ultils/helpers';

const OrderItem = ({el, defaultQuantity = 1, dispatch}) => {
    const [quantity, setQuantity] = useState(() => defaultQuantity)
    
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
    }

    const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }

    useEffect(() => {        
        dispatch(updateCart({pid: el.product?._id, quantity}))
    }, [quantity])

    return <div className='w-main mx-auto font-bold grid py-3 grid-cols-10 border-b' key={el._id}>
    <span className='col-span-6 w-full text-center'>
    <div className='flex gap-2 px-4 py-2'>
    <img src={el?.product?.thumb}  alt='thumb' className='w-28 h-28 object-cover'/>
    <div className='flex flex-col items-start gap-1'>
        <span className='text-sm text-main'>{el.product?.title}</span>
        <span className='text-[10px] font-main'>{el?.color}</span>
    </div>
    </div>
    </span>
    <span className='col-span-1 w-full text-center'>
        <div className='flex items-center h-full'>
        <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
            />
        </div>
    </span>
    <span className='col-span-3 w-full text-center h-full flex items-center justify-center'>
    <span className='text-lg'>{formatMoney(el.product?.price * quantity)+ ' VND'}</span>                        
    </span>
</div>
}

export default withBaseComponent(OrderItem)