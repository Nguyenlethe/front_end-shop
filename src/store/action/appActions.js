import actionTypes from './actionTypes';
import { default as appService} from '../../services/appService'


export const changeLanguageSuscess = (Lang) => ({
    type: actionTypes.CHANGE_LANGUAGE_SUSCESS,
    language: Lang
})

export const changeLanguageFailed = () => ({
    type: actionTypes.CHANGE_LANGUAGE_FAILED
})



// REGISTER_SYSTEM_SUSCESS: 'REGISTER_SYSTEM_SUSCESS:',
// REGISTER_SYSTEM_FAILED: 'REGISTER_SYSTEM_FAILED',


// Actions đăng nhập
export const loginSystemStart = (dataForm) => {
    return async (dispatch, getState) => {
        try{
            let resultDataUser  = await appService.loginSystem(dataForm)
            if( resultDataUser && resultDataUser.data.errCode === 0){
                dispatch(loginSystemSuscess(resultDataUser.data.data))
            }else{
                dispatch(loginSystemFailed())
            }
            return resultDataUser
        }catch(err) {
            console.log("loginSystemStart"+ err)
            dispatch(loginSystemFailed())
        }
    }
}

export const loginSystemSuscess = (data) => ({
    type: actionTypes.LOGIN_SYSTEM_SUSCESS,
    dataLogin: data
})

export const loginSystemFailed = () => ({
    type: actionTypes.LOGIN_SYSTEM_FAILED,
})



// RETRIEVAL_PASSWORD_SUSCESS: 'RETRIEVAL_PASSWORD_SUSCESS:',
// RETRIEVAL_PASSWORD_FAILED: 'RETRIEVAL_PASSWORD_FAILED',


// Actions gửi data (email để lấy lại password)
export const retrievalPasswordStart = (email) => {
    return async (dispatch, getState) => {
        try{
            let result  = await appService.retrievalPassword(email)
            return result
        }catch(err) {
            console.log("retrievalPasswordStart"+err)
        }
    }
}




// UPDATE_PASSWORD_SUSCESS: 'UPDATE_PASSWORD_SUSCESS:',
// UPDATE_PASSWORD_FAILED: 'UPDATE_PASSWORD_FAILED',


// Actions update Password
export const updatePasswordStart = (data) => {
    return async (dispatch, getState) => {
        try{
            let result  = await appService.updatePassword(data)
            return result
        }catch(err) {
            console.log("updatePasswordStart"+err)
        }
    }
}




// CREATE_USER_SUSCESS: 'CREATE_USER_SUSCESS:',
// CREATE_USER_FAILED: 'CREATE_USER_FAILED',

// Actions đăng ký Account
export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try{
            let result  = await appService.createNewUser(data)
            return result
        }catch(err) {
            console.log("createNewUserStart"+err)
        }
    }
}

