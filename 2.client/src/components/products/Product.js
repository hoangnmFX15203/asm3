import React, { useState, memo } from 'react';
import { formatMoney, renderStarFromNumber } from 'ultils/helpers';
import label from '../../assets/new.png';
import trending from '../../assets/trending.png';
import { SelectOption } from '../index';
import icons from 'ultils/icons';
import { Link } from 'react-router-dom';
import path from 'ultils/path';
import withBaseComponent from 'hocs/withBaseComponent';
import { apiUpdateCart } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import { Swal } from 'sweetalert2';
import { BsCartCheckFill } from "react-icons/bs";

const { AiFillEye, AiOutlineMenu, BsFillHeartFill, BsCartPlus } = icons;

const Product = ({ productData, isNew, normal, navigate }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleClickOption = async (e, flag) => {
        e.stopPropagation();
        if (flag === 'CART') {
            if (!current) {
                return toast.info('Please Login First');
                
            }
            const response = await apiUpdateCart({
                pid: productData._id,
                color: productData.color,
            });
            if (response.data.success) {
                toast.success(response.data.mes);
                dispatch(getCurrent());
            } else toast.error(response.data.mes);
        }
        if (flag === 'QUICK_VIEW') console.log('Quick View');
    };
    return (
        <div className="w-full text-base px-[10px]">
            <div
                onClick={(e) =>
                    navigate(
                        `/${productData?.categories.toLowerCase()}/${
                            productData?._id
                        }/${productData?.title}`,
                    )
                }
                className="w-full border p-[15px] flex flex-col items-center"
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setIsShowOption(true);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setIsShowOption(false);
                }}
            >
                <div className="w-full relative">
                    {isShowOption && (
                        <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-none">
                            <span
                                title="Quick View"
                                onClick={(e) =>
                                    handleClickOption(e, 'QUICK_VIEW')
                                }
                            >
                                <SelectOption icon={<AiFillEye />} />
                            </span>
                            {current?.cart?.some(el => el.product === productData._id)? (<span
                                title="Added to Cart"
                                // onClick={(e) => handleClickOption(e, 'CART')}
                            >
                                <SelectOption icon={<BsCartCheckFill color='green' />} />
                            </span>) : <span
                                title="Add to Cart"
                                onClick={(e) => handleClickOption(e, 'CART')}
                            >
                                <SelectOption icon={<BsCartPlus />} />
                            </span>}
                            {/* <span
                                title="Add to Cart"
                                onClick={(e) => handleClickOption(e, 'CART')}
                            >
                                <SelectOption icon={<BsCartPlus />} />
                            </span> */}
                            <SelectOption icon={<BsFillHeartFill />} />
                        </div>
                    )}
                    <img
                        src={
                            productData?.thumb ||
                            'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
                        }
                        alt=""
                        className="w-[274px] h-[274px] object-cover"
                    />
                    {!normal && (
                        <img
                            src={isNew ? label : trending}
                            alt=""
                            className={`absolute w-[100px] h-[35px] top-[0] right-[0] object-cover`}
                        />
                    )}
                </div>
                <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
                    <span className="flex h-4">
                        {renderStarFromNumber(productData?.totalRatings)}
                    </span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Product));
