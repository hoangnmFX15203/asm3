import React, { useState, useCallback, useEffect } from 'react';
import { InputForm, Select, Button, MarkdownEditor } from 'components';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getBase64 } from 'ultils/helpers';
import { toast } from 'react-toastify';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { apiCreateProduct } from 'apis'

const CreateProduct = () => {
    const { categories } = useSelector((state) => state.app);
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = useForm();

    const [payload, setPayload] = useState({
        description: '',
    });
    const [hoverElm, setHoverElm] = useState(null);
    const [invalidFields, setInvalidFields] = useState([]);
    const changeValue = useCallback(
        (e) => {
            setPayload(e);
        },
        [payload],
    );
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });

    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    };
    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('File not supported!');
                return;
            }
            const base64 = await getBase64(file);
            imagesPreview.push({
                name: file.name,
                path: base64,
            });
        }
        if (imagesPreview.length > 0)
            setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };
    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0]);
    }, [watch('thumb')]);
    useEffect(() => {
        handlePreviewImages(watch('images'));
    }, [watch('images')]);

    const handleCreateProduct = async (data) => {
        if (data?.categories)
            data.categories = categories[+data.categories]?.type;
        const finalPayload = { ...data, ...payload };
        const formData = new FormData();
        for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
        if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0]);
        if (finalPayload.images) {
            for (let image of finalPayload.images) formData.append('images', image)
        }
        const response = await apiCreateProduct(formData)
        if (response.data?.success) {
            toast.success('Tao san pham thanh cong')
            reset()
            setPayload({
                thumb: '',
                images: []
            })
        } else {
            toast.error('Tao san pham that bai')
        }
    };
    // const handleRemoveImage = (name) => {
    //     const files = [...watch('images')];
    //     reset({
    //         images: files?.filter((el) => el.name !== name),
    //     });
    //     if (preview.images?.some((el) => el.name === name))
    //         setPreview((prev) => ({
    //             ...prev,
    //             images: prev.images.filter((el) => el.name !== name),
    //         }));
    // };
    return (
        <div className="w-full">
            <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
                <span>CREAT NEW PRODUCT</span>
            </h1>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleCreateProduct)}>
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
                        value=""
                        changeValue={changeValue}
                        label="Description"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="thumb">
                            Upload Thumb
                        </label>
                        <input
                            type="file"
                            id="thumb"
                            {...register('thumb', { required: 'Need fill' })}
                        />
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
                            {...register('images', { required: 'Need fill' })}
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
                                    onMouseEnter={() => setHoverElm(el.name)}
                                    className="w-fit relative"
                                    onMouseLeave={() => setHoverElm(null)}
                                    key={index}
                                >
                                    <img
                                        src={el.path}
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
                        <Button type="submit" name="Create New Product">
                            Create New Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
