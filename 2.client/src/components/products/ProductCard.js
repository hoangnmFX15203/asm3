import React from 'react';
import { renderStarFromNumber, formatMoney } from '../../ultils/helpers';

const ProductCard = (price, totalRatings, title, image) => {
    return (
        <div className="w-1/3 flex-auto flex px-[10px] mb-[20px]">
            <div className="w-full flex border">
                <img
                    src={price.image}
                    alt=""
                    className="w-[90px] object-contain p-4"
                />
                <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
                    <span className="line-clamp-1 capitalize text-sm">
                        {price.title?.toLowerCase()}
                    </span>
                    <span className="flex h-4">
                        {renderStarFromNumber(price.totalRatings, 14)}
                    </span>
                    <span>{`${formatMoney(price.price)} VND`}</span>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
