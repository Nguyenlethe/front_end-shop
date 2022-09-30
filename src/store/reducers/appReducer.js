
import actionTypes from '../action/actionTypes';

const initState = {
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
    loginUser: {
        islogin: localStorage.getItem('islogin') ? localStorage.getItem('islogin') : false,
        isError: localStorage.getItem('isError') ? localStorage.getItem('isError') : false,
        id: localStorage.getItem('id') ? localStorage.getItem('id') : '',
        email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
        permission: localStorage.getItem('permission') ? localStorage.getItem('permission') : '',
        fullNameVi: localStorage.getItem('fullNameVi') ? localStorage.getItem('fullNameVi') : '',
        fullNameEn: localStorage.getItem('fullNameEn') ? localStorage.getItem('fullNameEn') : '',
        province: localStorage.getItem('province') ? localStorage.getItem('province') : '',
        // detailAddressVI: localStorage.getItem('detailAddressVI') ? localStorage.getItem('detailAddressVI') : '',
        // detailAddressEN: localStorage.getItem('detailAddressEN') ? localStorage.getItem('detailAddressEN') : '',

    },
    dataOptions: {},
    listItemsUserLike: []
}




const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE_SUSCESS:  
            localStorage.setItem('language', action.language)
            const storeLanguage =  localStorage.getItem('language')
            state.language = storeLanguage
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.language = []
            return {
                ...state
            }

        case actionTypes.LOGIN_SYSTEM_SUSCESS:  

            // let addressDetail = action.dataLogin.addressDetails
            // let wardsData = action.dataLogin.wardsData
            // let districtData = action.dataLogin.districtData
            // let provinceData = action.dataLogin.provinceData

            // const detaiAddress = {
            //     valueVi: `${addressDetail}, ${wardsData.valueVi} - ${districtData.valueVi} - ${provinceData.valueVi}`,
            //     valueEn: `${addressDetail}, ${wardsData.valueEn} - ${districtData.valueEn} - ${provinceData.valueEn}`,
            // }

            state.loginUser.id = action.dataLogin.id
            localStorage.setItem('islogin', true)
            localStorage.setItem('isError', false)
            localStorage.setItem('id', action.dataLogin.id)
            localStorage.setItem('email',action.dataLogin.email)
            localStorage.setItem('permission',action.dataLogin.permission)
            localStorage.setItem('fullNameVi',`${action.dataLogin.firstName} ${action.dataLogin.lastName}`)
            localStorage.setItem('fullNameEn',`${action.dataLogin.lastName} ${action.dataLogin.firstName}`)
            localStorage.setItem('province',action.dataLogin.province)
            // localStorage.setItem('detailAddressVI',detaiAddress.valueVi)
            // localStorage.setItem('detailAddressEN',detaiAddress.valueEn)

            // state.loginUser.detailAddressVI = localStorage.getItem('detailAddressVI')
            // state.loginUser.detailAddressEN = localStorage.getItem('detailAddressEN')
            state.loginUser.id = localStorage.getItem('id')
            state.loginUser.email = localStorage.getItem('email')
            state.loginUser.permission = localStorage.getItem('permission')
            state.loginUser.fullNameVi = localStorage.getItem('fullNameVi')
            state.loginUser.fullNameEn = localStorage.getItem('fullNameEn')
            state.loginUser.province = localStorage.getItem('province')
            state.loginUser.islogin = localStorage.getItem('islogin')
            state.loginUser.isError = localStorage.getItem('isError')

            return {
                ...state
            }

        case actionTypes.LOGIN_SYSTEM_FAILED:
            state.loginUser.islogin = false
            state.loginUser.isError = true
            return {
                ...state
            }
 
        case actionTypes.SET_EMPTY_DATA_LOG_OUT:
            state.loginUser.id = action.setDataLogin
            state.loginUser.email = action.setDataLogin
            state.loginUser.permission = action.setDataLogin
            state.loginUser.fullNameVi = action.setDataLogin
            state.loginUser.fullNameEn = action.setDataLogin
            state.loginUser.province = action.setDataLogin
            state.loginUser.islogin = action.setDataLogin
            state.loginUser.isError = action.setDataLogin
            return {
                ...state
            }

        case actionTypes.ADD_DATA_OPTIONS_SEARCH_NAV:
            state.dataOptions = action.dataOptions
            return {
                ...state
            }

        case actionTypes.GET_ITEMS_LIKES:
            state.listItemsUserLike = action.dataLike
            return {
                ...state
            }
        // GET_ITEMS_LIKES

            


        default:
            return state;
    }
}

export default appReducer;




