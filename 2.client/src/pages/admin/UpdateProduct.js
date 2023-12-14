import React, { memo, useState, useEffect, useCallback } from 'react';
import { InputForm, Select, MarkdownEditor, Button } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getBase64 } from 'ultils/helpers';
import { toast } from 'react-toastify';
import { apiUpdateProduct } from 'apis';

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
    const { categories } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });
    const [payload, setPayload] = useState({
        description: '',
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const changeValue = useCallback(
        (e) => {
            setPayload(e);
        },
        [payload],
    );
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    };
    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        if (files)
            for (let file of files) {
                if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                    toast.warning('File not supported!');
                    return;
                }
                const base64 = await getBase64(file);
                imagesPreview.push(base64);
            }
        if (imagesPreview.length > 0)
            setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };

    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0)
            handlePreviewThumb(watch('thumb')[0]);
    }, [watch('thumb')]);
    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0)
            handlePreviewImages(watch('images'));
    }, [watch('images')]);
    useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            color: editProduct?.color || '',
        });
        setPayload({
            description:
                typeof editProduct?.desc === 'object'
                    ? editProduct?.desc?.join(',')
                    : editProduct?.desc,
        });
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.img || [],
        });
    }, [editProduct]);

    const handleUpdateProduct = async (data) => {
        if (data?.categories)
            data.categories = categories[+data.categories]?.type;
        const finalPayload = { ...data, ...payload };
        const formData = new FormData();
        for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

        if (finalPayload.thumb)
            formData.append(
                'thumb',
                finalPayload?.thumb?.length === 0
                    ? preview.thumb
                    : finalPayload.thumb[0],
            );
        if (finalPayload.images) {
            const images =
                finalPayload?.images?.length === 0
                    ? preview.images
                    : finalPayload.images;
            for (let image of images) {
                formData.append('images', image);
            }
        }
        const response = await apiUpdateProduct(formData, editProduct._id);
        // if (response.data?.success) {
        //     toast.success('Tao san pham thanh cong');
        //     reset();
        //     setPayload({
        //         thumb: '',
        //         images: [],
        //     });
        // } else {
        //     toast.error('Tao san pham that bai');
        // }
    };
    return (
        <div className="w-full flex flex-col gap-4 relative">
            <div className="h-[60px] w-full"></div>
            <div className="p-4 border-b right-0 left-[327px] bg-gray-100 flex justify-between items-center fixed top-0">
                <h1 className="text-3xl font-bold tracking-tight ">
                    Update Products
                </h1>
                <span
                    className="text-main hover;underline cursor-pointer"
                    onClick={() => setEditProduct(null)}
                >
                    Cancel
                </span>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
                    <InputForm
                        label="Name product"
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{
                            required: 'Need fill this field',
                        }}
                        style="flex-1"
                        placeholder="Name of new product"
                    />
                    <div className="w-full my-6 flex gap-4">
                        <InputForm
                            label="Price"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: 'Need fill this field',
                            }}
                            style="flex-auto"
                            placeholder="Price of new product"
                            type="number"
                            fullWidth
                        />
                        <InputForm
                            label="Quantity"
                            register={register}
                            errors={errors}
                            id="quantity"
                            validate={{
                                required: 'Need fill this field',
                            }}
                            style="flex-auto"
                            placeholder="Quantity of new product"
                            type="number"
                            fullWidth
                        />
                        <InputForm
                            label="Color"
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{
                                required: 'Need fill this field',
                            }}
                            style="flex-auto"
                            placeholder="Color of new product"
                            type="text"
                            fullWidth
                        />
                    </div>
                    <div className="w-full my-6 flex gap-4">
                        <Select
                            label="Category"
                            option={categories?.map((el, index) => ({
                                code: index,
                                value: el?.type,
                            }))}
                            register={register}
                            id="categories"
                            validate={{
                                required: 'Need fill this field',
                            }}
                            style="flex-auto"
                            errors={errors}
                            fullWidth
                        />
                    </div>
                    <MarkdownEditor
                        name="description"
                        value={payload.description}
                        changeValue={changeValue}
                        label="Description"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="thumb">
                            Upload Thumb
                        </label>
                        <input type="file" id="thumb" {...register('thumb')} />
                        {errors['thumb'] && (
                            <small className="text-xs text-red-500">
                                {errors['thumb']?.message}
                            </small>
                        )}
                    </div>
                    {preview?.thumb && (
                        <div className="my-4">
                            <img
                                src={preview.thumb}
                                alt="thumbnail"
                                className="w-[200px] object-contain"
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="products">
                            Upload Images
                        </label>
                        <input
                            type="file"
                            id="products"
                            multiple
                            {...register('images')}
                        />
                        {errors['images'] && (
                            <small className="text-xs text-red-500">
                                {errors['images']?.message}
                            </small>
                        )}
                    </div>
                    {preview?.images.length > 0 && (
                        <div className="my-4 flex w-full gap-3 flex-wrap">
                            {preview.images?.map((el, index) => (
                                <div
                                    // onMouseEnter={() => setHoverElm(el.name)}
                                    className="w-fit relative"
                                    // onMouseLeave={() => setHoverElm(null)}
                                    key={index}
                                >
                                    <img
                                        src={el}
                                        alt="product"
                                        className="w-[200px] object-contain"
                                    />
                                    {/* {hoverElm === el.name && (
                                        <div
                                            className="absolute cursor-pointer inset-0 flex items-center justify-center"
                                            onClick={() => {
                                                handleRemoveImage(el.name);
                                            }}
                                        >
                                            <RiDeleteBin2Fill
                                                size={24}
                                                color="white"
                                            />
                                        </div>
                                    )} */}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="my-6">
                        <Button type="submit" name="Update New Product">
                            Update New Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(UpdateProduct);
