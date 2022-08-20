import actionTypes from '../action/actionTypes';


const initialState = {
    dataDistrict: [],
    dataWards: [],
    dataForm: {
        listGender: [],
        listProvince: [],
        listPermission: [],
        listPay: [],
        category: [],
    },
    listUser: {
        allUser: [],
        allUserNotSeller: []
    },
    listShops: {
        allShops: []
    },
    listAllCodeItems: {
        FSBData: [],
        FSAMData:[],
        FSMData:[],
        FSAWData:[],
        AllData: [],
        DCCData: [],
        BNPRDData: [],
        TYPESIZEData:[],
        SIZEData:[],
        SZNBData: [],
        COLORData: [],
    },
    items: {
        itemsAll: [],
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


        case actionTypes.GET_ALL_USER_NOT_SELLER_SUSCESS:  



            state.listUser.allUserNotSeller = action.users

            
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

       
        // GET_ALL_CATEGORY_SUSCESS: 'GET_ALL_CATEGORY_SUSCESS',
        // GET_ALL_CATEGORY_FAILED: 'GET_ALL_CATEGORY_FAILED',


        case actionTypes.GET_ALL_CATEGORY_SUSCESS:  
            state.dataForm.category = action.dataAllCode.category
            
            return {
                ...state
            }

        case actionTypes.GET_ALL_CATEGORY_FAILED:  
            state.dataForm.category = []
            
            return {
                ...state
            }


        // GET_DATA_ALLCODE_FSB_SUCCESS
        // GET_DATA_ALLCODE_FSAM_SUCCESS
        // GET_DATA_ALLCODE_FSM_SUCCESS
        // GET_DATA_ALLCODE_FSAW_SUCCESS
        // GET_DATE_ALLCODE_ITEMS_FAILED



        case actionTypes.GET_DATA_ALLCODE_FSB_SUCCESS:  
            state.listAllCodeItems.FSBData = action.FSBData

            //console.log('Data FBSData', state.listAllCodeItems.FSBData)

            return {
                ...state
            }

        case actionTypes.GET_DATA_ALLCODE_FSAM_SUCCESS:  
            state.listAllCodeItems.FSAMData = action.FSAMData

            //console.log('Data FSAMData',state.listAllCodeItems.FSAMData)
            
            return {
                ...state
            }


        case actionTypes.GET_DATA_ALLCODE_FSM_SUCCESS:  
            state.listAllCodeItems.FSMData = action.FSMData
            //console.log('Data FSMDData',state.listAllCodeItems.FSMData)
            
            return {
                ...state
            }


        case actionTypes.GET_DATA_ALLCODE_FSAW_SUCCESS:  
            state.listAllCodeItems.FSAWData = action.FSAWData
            //console.log('Data FSAWData',state.listAllCodeItems.FSAWData)
            
            return {
                ...state
            }


        case actionTypes.GET_DATA_ALLCODE_ALL_SUCCESS:  
            state.listAllCodeItems.AllData = action.AllData
            //console.log('Data AllData',state.listAllCodeItems.AllData)
            
            return {
                ...state
            }


        case actionTypes.GET_DATA_ALLCODE_DCC_SUCCESS:  
            state.listAllCodeItems.DCCData = action.DCCData
            //console.log('Data DCCData',state.listAllCodeItems.DCCData)
            
            return {
                ...state
            }


        case actionTypes.GET_DATA_ALLCODE_BNPRD_SUCCESS:  
            state.listAllCodeItems.BNPRDData = action.BNPRDData
            //console.log('Data DCCData',state.listAllCodeItems.BNPRDData)
            
            return {
                ...state
            }

           
        case actionTypes.GET_DATA_ALLCODE_TYPESIZE_SUCCESS:  
            state.listAllCodeItems.TYPESIZEData = action.TYPESIZEData
            //console.log('Data TYPESIZEData',state.listAllCodeItems.TYPESIZEData)
            
            return {
                ...state
            }

        // GET_DATA_ALLCODE_SIZE_SUCCESS:'GET_DATA_ALLCODE_SIZE_SUCCESS',
        // GET_DATA_ALLCODE_SZNB_SUCCESS:'GET_DATA_ALLCODE_SZNB_SUCCESS'

        case actionTypes.GET_DATA_ALLCODE_SIZE_SUCCESS:  
            state.listAllCodeItems.SIZEData = action.SIZEData
            //console.log('Data DCCData',state.listAllCodeItems.SIZEData)
            
            return {
                ...state
            }

           
        case actionTypes.GET_DATA_ALLCODE_SZNB_SUCCESS:  
            state.listAllCodeItems.SZNBData = action.SZNBData
            //console.log('Data TYPESIZEData',state.listAllCodeItems.SZNBData)
            
            return {
                ...state
            }
            
            

        case actionTypes.GET_DATA_ALLCODE_COLOR_SUCCESS:  
            state.listAllCodeItems.COLORData = action.COLORData
            // console.log('Data COLORData',state.listAllCodeItems.COLORData)
            
            return {
                ...state
            }
        

            
        // GET_DATA_ITEMS_SUCCESS: 'GET_DATA_ITEMS_SUCCESS',
        // GET_DATA_ITEMS_FAILED: 'GET_DATA_ITEMS_FAILED',

        case actionTypes.GET_DATA_ITEMS_SUCCESS:  
            state.items.itemsAll = action.dataAllItems
            //console.log('Data TYPESIZEData',state.listAllCodeItems.SZNBData)
            
            return {
                ...state
            }
        
        



        default:
            return state;
    }
}

export default adminReducer;