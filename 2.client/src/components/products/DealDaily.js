import React, { useState, useEffect, memo } from 'react';

import { apiGetProducts } from '../../apis/product';
import icons from '../../ultils/icons';
import { renderStarFromNumber, formatMoney } from '../../ultils/helpers';
import { AiOutlineMenu } from 'react-icons/ai';
import CountDown from '../common/CountDown';

const { AiFillStar } = icons;
let idInterval;

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({
            limit: 1,
            page: Math.round(Math.random() * 10),
            totalRatings: 5,
        });
        if (response?.data.success) {
            setDealDaily(response.data.products[0]);
            const h = 23 - new Date().getHours();
            const m = 59 - new Date().getMinutes();
            const s = 59 - new Date().getSeconds();
            setHours(h);
            setMinutes(m);
            setSeconds(s);
        } else {
            setHours(0);
            setMinutes(59);
            setSeconds(59);
        }
    };

    useEffect(() => {
        fetchDealDaily();
    }, []);
    useEffect(() => {
        clearInterval(idInterval);
        fetchDealDaily();
    }, [expireTime]);
    useEffect(() => {
        idInterval = setInterval(() => {
            if (seconds > 0) setSeconds((prev) => prev - 1);
            else {
                if (minutes > 0) {
                    setMinutes((prev) => prev - 1);
                    setSeconds(59);
                } else {
                    if (hours > 0) {
                        setHours((prev) => prev - 1);
                        setMinutes(59);
                        setSeconds(59);
                    } else {
                        setExpireTime(!expireTime);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInterval);
        };
    }, [seconds, minutes, hours, expireTime]);
    return (
        <div className="border w-full flex-auto">
            <div className="flex items-center justify-between p-4">
                <span className="flex-1 flex justify-center">
                    <AiFillStar size={20} color="#DD1111" />
                </span>
                <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
                    Deal Daily
                </span>
                <span className="flex-1"></span>
            </div>
            <div className="w-full flex flex-col items-center pt-8 px-4">
                <img
                    src={
                        dealDaily?.thumb ||
                        'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
                    }
                    alt=""
                    className="w-full object-contain"
                />
                <span className="line-clamp-1 text-center">
                    {dealDaily?.title}
                </span>
                <span className="flex h-4">
                    {renderStarFromNumber(dealDaily?.totalRatings, 20)}
                </span>
                <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
            </div>
            <div className="px-4 mt-8">
                <div className="flex justify-center gap-2 items-center mb-4">
                    <CountDown unit={'Hours'} number={hours} />
                    <CountDown unit={'Minutes'} number={minutes} />
                    <CountDown unit={'Seconds'} number={seconds} />
                </div>

                <button
                    type="button"
                    className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
                >
                    <AiOutlineMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DealDaily);
