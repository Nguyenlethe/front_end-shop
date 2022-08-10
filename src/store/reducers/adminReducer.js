import actionTypes from '../action/actionTypes';


const initialState = {
    dataDistrict: [],
    dataWards: [],
    dataForm: {
        listGender: [],
        listProvince: [],
        listPermission: [],
        listPay: [],
    },
    listUser: {
        allUser: [],
    },
    listShops: {
        allShops: []
    }
}




const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // Reduce Lưu trữ AllCode (Gender, Province, Permission)
        case actionTypes.GET_DATA_ALLCODE_SUCCESS:  
            state.dataForm.listGender = action.dataAllCode.gender
            state.dataForm.listProvince = action.dataAllCode.province
            state.dataForm.listPermission = action.dataAllCode.resPermission
            state.dataForm.listPay = action.dataAllCode.pay
            return {
                ...state
            }

        case actionTypes.GET_DATE_ALLCODE_FAILED:  
            state.dataForm.listGender = []
            state.dataForm.listProvince = []
            state.dataForm.listPermission = []

            return {
                ...state
            }

        // Reduce Lưu trữ Huyện
        case actionTypes.GET_DATA_PROVINCE_SUCCESS:  
            state.dataDistrict = action.dataDistrict
            
            return {
                ...state
            }

        
        case actionTypes.GET_DATE_PROVINCE_FAILED:  
            state.dataDistrict = []
            
            return {
                ...state
            }

        // Reduce lưu trữ xã
        case actionTypes.GET_DATA_WARDS_SUCCESS:  
            state.dataWards = action.dataWards
            
            return {
                ...state
            }

        
        case actionTypes.GET_DATE_WARDS_FAILED:  
            state.dataDistrict = []
            
            return {
                ...state
            }


        //  GET_ALL_USER_SUSCESS: 'GET_ALL_USER_SUSCESS',
        //  GET_ALL_USER_FAILED: 'GET_ALL_USER_FAILED',

        
        case actionTypes.GET_ALL_USER_SUSCESS:  
            state.listUser.allUser = action.users
            
            return {
                ...state
            }

        
        case actionTypes.GET_ALL_USER_FAILED:  
            state.listUser.allUser = []
            
            return {
                ...state
            }

        // GET_ALL_SHOP_SUSCESS: 'GET_ALL_SHOP_SUSCESS',
        // GET_ALL_SHOP_FAILED: 'GET_ALL_SHOP_FAILED',


        case actionTypes.GET_ALL_SHOP_SUSCESS:  
            state.listShops.allShops = action.shops
            
            return {
                ...state
            }

        
        case actionTypes.GET_ALL_SHOP_FAILED:  
            state.listShops.allShops = []
            
            return {
                ...state
            }



        default:
            return state;
    }
}

export default adminReducer;