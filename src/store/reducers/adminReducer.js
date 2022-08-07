import actionTypes from '../action/actionTypes';


const initialState = {
    dataDistrict: [],
    dataWards: [],
    dataForm: {
        listGender: [],
        listProvince: [],
        listPermission: []
    }
}




const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // Reduce Lưu trữ AllCode (Gender, Province, Permission)
        case actionTypes.GET_DATA_ALLCODE_SUCCESS:  
            state.dataForm.listGender = action.dataAllCode.gender
            state.dataForm.listProvince = action.dataAllCode.province
            state.dataForm.listPermission = action.dataAllCode.resPermission
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





        default:
            return state;
    }
}

export default adminReducer;