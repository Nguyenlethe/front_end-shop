
import {path} from '../utils/constant';

import Home from '../pages/Home';
import Login from '../pages/Login';
import News from '../pages/News';
import ManageUser from '../pages/Admin/ManageSystem/ManageSystem';


// Chứa những routes không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: path.HOME, components: Home },
    { path: path.HOMEPAGE, components: Home },
    { path: path.LOGINPAGE, components: Login, layout: null}, // Cái path nào có kí tự là /@.... sẽ lọt vào trang profile
    { path: path.NEWSPAGE, components: News },
];

// Chứa những routes cần đăng nhập
const privateRoutes = [];

const adminRoutes = [
    { path: path.MANAGE_USER, components: ManageUser },
];


const sellerRoutes = [

];


export { privateRoutes, publicRoutes, adminRoutes,sellerRoutes};
 