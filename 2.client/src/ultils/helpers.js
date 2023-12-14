import icons from './icons';

const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
    string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-');

export const formatMoney = (number) =>
    Number(number?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number, size) => {
    if (!Number(number)) return;
    const stars = [];
    for (let i = 0; i < +number; i++)
        stars.push(<AiFillStar color="orange" size={size || 16} />);
    for (let i = 5; i > +number; i--)
        stars.push(<AiOutlineStar color="orange" size={size || 16} />);

    return stars;
};

export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) return '';
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export const generateRange = (start, end) => {
    const length = end + 1 - start;
    return Array.from({ length }, (_, index) => start + index);
};
