

import {path} from '../utils/constant';
import Home from '../pages/Home';
import Login from '../pages/System/Login';
import Register from '../pages/System/Register';
import LayoutLogin_Register from '../layouts/Login_Register'
import NotFound404 from '../pages/NotFound404'
import News from '../pages/News';
import ManageUser from '../pages/Admin/ManageSystem/ManageSystem';
import ForgotPassword from '../pages/System/ForgotPassword'; 
import SeeMoreItemsSearch from '../pages/Items/SeeMoreItemsSearch'
import DetailItems from '../components/Items/DetailItems/DetailItems';
import DetailListCart from '../pages/Items/DetailListCart';

const routes = [
    { path: path.HOME, components: Home },
    { path: path.HOMEPAGE, components: Home },
    { path: path.LOGINPAGE, components: Login, layout: LayoutLogin_Register}, 
    { path: path.REGISTERPAGE, components: Register, layout: LayoutLogin_Register},
    { path: path.NEWSPAGE, components: News },
    { path: path.FORGOTPASS, components: ForgotPassword , layout: LayoutLogin_Register},
    { path: path.MANAGE_USER, components: ManageUser , layout: null},
    { path: path.SEARCH_ITEMS, components: SeeMoreItemsSearch },
    { path: path.DETAIL_ITEMS, components: DetailItems },
    { path: path.DETAIL_LIST_CART, components: DetailListCart ,layout:null},
    { path: path.NOTFOUND, components: NotFound404 ,layout: null}
]






export { routes};
 