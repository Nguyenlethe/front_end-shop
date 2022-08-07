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

export const retrievalPasswordStart = (email) => {
    return async (dispatch, getState) => {
        try{
            let result  = await appService.retrievalPassword(email)
            if( result && result.data.errCode === 0){
                dispatch(retrievalPasswordSuscess(result.data.data))
            }else{
                dispatch(retrievalPasswordFailed())
            }
            return result
        }catch(err) {
            console.log("retrievalPasswordStart"+err)
            dispatch(retrievalPasswordFailed())
        }
    }
}

export const retrievalPasswordSuscess = (data) => ({
    type: actionTypes.RETRIEVAL_PASSWORD_SUSCESS,
    dataRetrieval: data
})

export const retrievalPasswordFailed = () => ({
    type: actionTypes.RETRIEVAL_PASSWORD_FAILED,
})




// UPDATE_PASSWORD_SUSCESS: 'UPDATE_PASSWORD_SUSCESS:',
// UPDATE_PASSWORD_FAILED: 'UPDATE_PASSWORD_FAILED',

export const updatePasswordStart = (data) => {
    return async (dispatch, getState) => {
        try{
            let result  = await appService.updatePassword(data)
            if( result && result.data.errCode === 0){
                dispatch(updatePasswordSuscess(result.data.data))
            }else{
                dispatch(updatePasswordFailed())
            }
            return result
        }catch(err) {
            console.log("updatePasswordStart"+err)
            dispatch(updatePasswordFailed())
        }
    }
}

export const updatePasswordSuscess = (data) => ({
    type: actionTypes.UPDATE_PASSWORD_SUSCESS,
    dataRetrieval: data
})

export const updatePasswordFailed = () => ({
    type: actionTypes.UPDATE_PASSWORD_FAILED,
})
