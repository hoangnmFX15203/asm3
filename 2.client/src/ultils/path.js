const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    OUR_SERVICES: 'services',
    FAQs: 'faq',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    // DETAIL_PRODUCT: 'san-pham',

    // Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',

    // member
    MEMBER: 'member',
    PERSONAL: 'personal',
    HISTORY: 'buy-history',
    MY_CART: 'my-cart',

    // staff
    STAFF: 'staff',
    
};

export default path;
