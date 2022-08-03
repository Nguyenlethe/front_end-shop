import {combineReducers} from 'redux';
// import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import sellerReducer from "./sellerReducer";



// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';


// const persistCommonConfig = {
//     storage: storage,
//     stateReconciler: autoMergeLevel2,
// };



// const userPersistConfig = {
//     ...persistCommonConfig,
//     key: 'user'
// };

// const appPersistConfig = {
//     ...persistCommonConfig,    
//     key: 'app',
// }


// eslint-disable-next-line import/no-anonymous-default-export
export default combineReducers({
    user: userReducer,
    app: appReducer,
    seller: sellerReducer,
    admin: adminReducer
})




