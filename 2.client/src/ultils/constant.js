import path from './path';
import icons from './icons';

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`,
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`,
    },
    {
        id: 3,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`,
    },
    {
        id: 4,
        value: 'FAQs',
        path: `/${path.FAQs}`,
    },
];

const { RiTruckFill, BsShieldShaded, BsFillReplyFill, FaTty, AiFillGift } =
    icons;

export const productExtraInfomation = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quality Checked',
        icon: <RiTruckFill />,
    },
    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free On All Products',
        icon: <BsShieldShaded />,
    },
    {
        id: 3,
        title: 'Special Gift Cards',
        sub: 'Special Gift Cards',
        icon: <BsFillReplyFill />,
    },
    { id: 4, title: 'Free Return', sub: 'Within 7 Days', icon: <FaTty /> },
    {
        id: 5,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icon: <AiFillGift />,
    },
];

export const productInfoTabs = [
    {
        id: 1,
        name: 'DESCRIPTION',
        content: 'DESCRIPTION',
    },
    {
        id: 2,
        name: 'WARRANTY',
        content: 'WARRANTY',
    },
    {
        id: 3,
        name: 'DELIVERY',
        content: 'DELIVERY',
    },
    {
        id: 4,
        name: 'PAYMENT',
        content: 'PAYMENT',
    },
    {
        id: 5,
        name: 'CUSTOMER REVIEW',
        content: 'CUSTOMER REVIEW',
    },
];

export const colors = ['red', 'blue', 'green', 'brown', 'silver'];

const { AiOutlineDashboard, MdGroup, TbBrandProducthunt, RiBillLine } = icons;

export const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <AiOutlineDashboard />,
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Manage User',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <MdGroup />,
    },
    {
        id: 3,
        type: 'PARENT',
        text: 'Manage Products',
        icon: <TbBrandProducthunt />,
        submenu: [
            {
                text: 'Create Product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
            },
            {
                text: 'Manage Product',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
            },
        ],
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Manage Order',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <RiBillLine />,
    },
];

export const isAdmin = [
    {
        code: 1,
        value: 'Admin',
    },
    {
        code: 2,
        value: 'Member',
    },
    {
        code: 3,
        value: 'Staff',
    },
];

export const memberSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Personal',
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: <AiOutlineDashboard />,
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'My Cart',
        path: `/${path.MEMBER}/${path.MY_CART}`,
        icon: <MdGroup />,
    },
    
    {
        id: 4,
        type: 'SINGLE',
        text: 'Buy History',
        path: `/${path.MEMBER}/${path.HISTORY}`,
        icon: <RiBillLine />,
    },
];

export const statusOrder = [
    {
        label: 'Cancelled',
        value: 'Cancelled'
    },
    {
        label: 'Processing',
        value: 'Processing'
    },
    {
        label: 'Confirmed',
        value: 'Confirmed'
    },
    {
        label: 'Succeed',
        value: 'Succeed'
    },
]
