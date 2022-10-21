

import {path,PERMISSIONS} from '../utils/constant';
import Home from '../pages/Home';
import Login from '../pages/System/Login';
import Register from '../pages/System/Register';
import LayoutLogin_Register from '../layouts/Login_Register'
import ProfileLayout from '../layouts/ProfileLayout'

import NotFound404 from '../pages/NotFound404'
import News from '../pages/News';
import ManageUser from '../pages/Admin/ManageSystem/ManageSystem';
import ForgotPassword from '../pages/System/ForgotPassword'; 
import SeeMoreItemsSearch from '../pages/Items/SeeMoreItemsSearch'
import DetailItems from '../components/Items/DetailItems/DetailItems';
import DetailListCart from '../pages/Items/DetailListCart';
import ProFile from '../pages/User/ProFile';
import RegisterSell from '../pages/User/RegisterSell';
import UserManage from '../pages/User/UserManage';
import Invoice from '../pages/User/Invoice';
import {faPhoneFlip,faEnvelope,faCircleUser,faGear,faBagShopping,faRightFromBracket, faCalendarWeek} from '@fortawesome/free-solid-svg-icons';


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
    { path: path.DETAIL_LIST_CART, components: DetailListCart ,layout: null},

    { path: path.PRO_FILE, components: ProFile,layout: ProfileLayout},
    { path: path.RESGISTER_SELL, components: RegisterSell,layout: ProfileLayout},
    { path: path.MANAGE_SHOP, components: UserManage,layout: ProfileLayout},
    { path: path.DETAIL_ORDER, components: Invoice,layout: ProfileLayout},

    { path: path.NOTFOUND, components: NotFound404 ,layout: null}
]

const routesProFie = [
    { path: path.PRO_FILE, components: ProFile, idText: 'proFile.manageUser', icon: faGear},
    { path: path.RESGISTER_SELL, components: RegisterSell, idText: 'proFile.resgisterSell', role: PERMISSIONS.SELLER, icon: faBagShopping},
    { path: path.MANAGE_SHOP, components: UserManage, idText: 'proFile.manageShop', role: PERMISSIONS.PATIENT, icon: faBagShopping},
    { path: path.DETAIL_ORDER, components: Invoice, idText: 'proFile.manageOrder', icon: faCalendarWeek},
    { path: path.LOGINPAGE, components: UserManage, idText: 'manageAdmin.logout', status : 'LOGOUT',  icon: faRightFromBracket},
]


export { routes,routesProFie};
 