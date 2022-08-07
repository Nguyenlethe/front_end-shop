import actionTypes from '../action/actionTypes';


const initState = {
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
    loginUser: {
        islogin: false,
        isError: false,
        id: localStorage.getItem('id') ? localStorage.getItem('id') : '',
        email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
        permission: localStorage.getItem('permission') ? localStorage.getItem('permission') : '',
        fullNameVi: localStorage.getItem('fullNameVi') ? localStorage.getItem('fullNameVi') : '',
        fullNameEn: localStorage.getItem('fullNameEn') ? localStorage.getItem('fullNameEn') : '',
        province: localStorage.getItem('province') ? localStorage.getItem('province') : '',
    }
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
            state.loginUser.id = action.dataLogin.id
            localStorage.setItem('id', action.dataLogin.id)
            localStorage.setItem('email',action.dataLogin.email)
            localStorage.setItem('permission',action.dataLogin.permission)
            localStorage.setItem('fullNameVi',`${action.dataLogin.firstName} ${action.dataLogin.lastName}`)
            localStorage.setItem('fullNameEn',`${action.dataLogin.lastName} ${action.dataLogin.firstName}`)
            localStorage.setItem('province',action.dataLogin.province)

            state.loginUser.id = localStorage.getItem('id')
            state.loginUser.email = localStorage.getItem('email')
            state.loginUser.permission = localStorage.getItem('permission')
            state.loginUser.fullNameVi = localStorage.getItem('fullNameVi')
            state.loginUser.fullNameEn = localStorage.getItem('fullNameEn')
            state.loginUser.province = localStorage.getItem('province')
            state.loginUser.islogin = true
            state.loginUser.isError = false
            return {
                ...state
            }

        case actionTypes.LOGIN_SYSTEM_FAILED:
            state.loginUser.islogin = false
            state.loginUser.isError = true
            return {
                ...state
            }


        default:
            return state;
    }
}

export default appReducer;




