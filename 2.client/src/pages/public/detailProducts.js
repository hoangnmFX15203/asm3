import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
    Breadcrumbs,
    Button,
    SelectQuantity,
    ProductExtraInfoItem,
    ProductInfomation,
    CustomSlider,
} from '../../components';
import { apiGetProduct, apiGetProducts, apiUpdateCart } from '../../apis';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import {
    formatMoney,
    formatPrice,
    renderStarFromNumber,
} from '../../ultils/helpers';
import { productExtraInfomation } from '../../ultils/constant';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import withBaseComponent from 'hocs/withBaseComponent';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const DetailProduct = ({ isQuickView, dispatch }) => {
    const {current} = useSelector(state => state.user)
    const { pid, title, categories } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProduct, setRelatedProduct] = useState(null);

    const fetchProductData = async () => {
        const response = await apiGetProduct(pid);
        if (response.data.success) setProduct(response.data.productData);
    };

    const fetchProducts = async () => {
        const response = await apiGetProducts({ categories: categories });
        if (response.data.success) setRelatedProduct(response.data.products);
    };

    useEffect(() => {
        if (pid) {
            fetchProductData();
            fetchProducts();
        }
        window.scrollTo(0, 0)
    }, [pid]);

    const handleQuantity = useCallback(
        (number) => {
            if (!Number(number) || Number(number) < 1) {
                return;
            } else {
                setQuantity(number);
            }
        },
        [quantity],
    );

    const handleChangeQuantity = useCallback(
        (flag) => {
            if (flag === 'minus' && quantity === 1) return;
            if (flag === 'minus') setQuantity((prev) => +prev - 1);
            if (flag === 'plus') setQuantity((prev) => +prev + 1);
        },
        [quantity],
    );

    const handleAddToCart = async () => {
        if (!current) {
            return toast.info('Please Login First');
            
        }
        const response = await apiUpdateCart({
            pid: pid,
            color: product?.color,
            quantity: quantity,
            price: product?.price,
        });
        if (response.data.success) {
            toast.success(response.data.mes);
            dispatch(getCurrent());
        } else toast.error(response.data.mes);
    }
    return (
        <div className="w-full">
            {!isQuickView && (
                <div className="h-[81px] bg-gray-100 flex justify-center items-center">
                    <div className="w-main">
                        <h3 className="font-semibold">{title}</h3>
                        <Breadcrumbs title={title} category={categories} />
                    </div>
                </div>
            )}
            <div className="w-main m-auto mt-4 flex">
                <div className="flex flex-col gap-4 w-2/5">
                    <div className="h-[458px] w-[458px] border flex items-center overflow-hidden">
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: product?.thumb,
                                },
                                largeImage: {
                                    src: product?.thumb,
                                    width: 1800,
                                    height: 1500,
                                },
                            }}
                        />
                    </div>

                    <div className="w-[458px]">
                        <Slider className="image-slider" {...settings}>
                            {product?.img?.map((el) => (
                                <div
                                    className="flex w-full justify-between"
                                    key={el}
                                >
                                    <img
                                        src={el}
                                        className="h-[143px] w-[143px] object-contain border"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="w-2/5 flex flex-col gap-4 pr-[24px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[30px] font-semibold">
                            {`${formatMoney(formatPrice(product?.price))}`} VND
                        </h2>
                        <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {renderStarFromNumber(product?.totalRatings)?.map(
                            (el, index) => (
                                <span key={index}>{el}</span>
                            ),
                        )}
                        <span className="text-sm text-main italic">{`(Da ban: ${product?.sold})`}</span>
                    </div>
                    <ul className="text-sm text-grey-500 pl-4">
                        {product?.desc?.length > 1 &&
                            product?.desc?.map((el) => (
                                <li className="leading-6 list-disc" key={el}>
                                    {el}
                                </li>
                            ))}
                        {product?.desc?.length <= 1 && (
                            <div
                                className="text-sm line-clamp-6 mb-8"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        product?.desc[0],
                                    ),
                                }}
                            ></div>
                        )}
                    </ul>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Quantity</span>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button name={'Add to Cart'} fw handleOnclick={handleAddToCart}>
                            Add to cart
                        </Button>
                    </div>
                </div>
                {!isQuickView && (
                    <div className="w-1/5">
                        {productExtraInfomation.map((el) => (
                            <ProductExtraInfoItem
                                key={el.id}
                                title={el.title}
                                icon={el.icon}
                                sub={el.sub}
                            />
                        ))}
                    </div>
                )}
            </div>
            {!isQuickView && (
                <div className="w-main m-auto mt-8">
                    <ProductInfomation
                        totalRating={product?.totalRatings}
                        rating={product?.rating}
                        nameProduct={product?.title}
                        pid={product?._id}
                    />
                </div>
            )}
            {!isQuickView && (
                <div className="w-main m-auto mt-8">
                    <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                        OTHER CUSTOMER ALSO LIKE
                    </h3>
                    <CustomSlider products={relatedProduct} normal={true} />
                </div>
            )}
        </div>
    );
};

export default withBaseComponent(DetailProduct);
