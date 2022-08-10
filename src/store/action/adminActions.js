import actionTypes from './actionTypes';
import { default as adminService} from '../../services/adminService'



// Actions lấy Xã/Phường
export const fetchAllDataWardsStart = (inputWards) => {
    return async (dispatch, getState) => {
        try{
            let resWards = await adminService.getDataWards(inputWards);
            if( resWards && resWards.data.errCode === 0 ){
                dispatch(fetchAllDataWardsSuscess(resWards.data.data))
            }else{
                dispatch(fetchAllDataWardsFailed())
            }
        }catch(err) {
            console.log("fetchAllDoctor"+ err)
            dispatch(fetchAllDataWardsFailed())
        }
    }
}

export const fetchAllDataWardsSuscess = (data) => ({
    type: actionTypes.GET_DATA_WARDS_SUCCESS,
    dataWards: data
})

export const fetchAllDataWardsFailed = () => ({
    type: actionTypes.GET_DATE_WARDS_FAILED,
})





// Actions lấy Huyện
export const fetchAllDataProvinceStart = (inputProvince) => {
    return async (dispatch, getState) => {
        try{
            let resProvince = await adminService.getDataDistrict(inputProvince);
            if( resProvince && resProvince.data.errCode === 0 ){
                dispatch(fetchAllDataProvinceSuscess(resProvince.data.data))
            }else{
                dispatch(fetchAllDataProvinceFailed())
            }


        }catch(err) {
            console.log("fetchAllDoctor"+ err)
            dispatch(fetchAllDataProvinceFailed())
        }
    }
}

export const fetchAllDataProvinceSuscess = (data) => ({
    type: actionTypes.GET_DATA_PROVINCE_SUCCESS,
    dataDistrict: data
})

export const fetchAllDataProvinceFailed = () => ({
    type: actionTypes.GET_DATE_PROVINCE_FAILED,
})





// Actions lấy AllCode (Gender, Province, Permission)
export const fetchAllDataAllCodeStart = () => {
    return async (dispatch, getState) => {
        try{
            let resPay = await adminService.getAllCode('PAY')
            let resGender = await adminService.getAllCode('GENDER')
            let resPermission = await adminService.getAllCode('ROLE')
            let resProvince = await adminService.getAllCode('TTP')
            

            if( resGender && resGender.data.errCode === 0 &&
                resPermission && resPermission.data.errCode === 0 &&
                resProvince && resProvince.data.errCode === 0 &&
                resPay && resPay.data.errCode === 0
            ){
                let data = {
                    pay: resPay.data.data.inputType,
                    gender: resGender.data.data.inputType,
                    province: resProvince.data.data.inputType,
                    resPermission: resPermission.data.data.inputType
                }
                dispatch(fetchAllDataAllCodeSuscess(data))
            }else{
                dispatch(fetchAllDataAllCodeFailed())
            }


        }catch(err) {
            console.log("fetchAllDoctor"+ err)
            dispatch(fetchAllDataAllCodeFailed())
        }
    }
}

export const fetchAllDataAllCodeSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_SUCCESS,
    dataAllCode: data
})

export const fetchAllDataAllCodeFailed = () => ({
    type: actionTypes.GET_DATE_ALLCODE_FAILED,
})




//  GET_ALL_USER_SUSCESS: 'GET_ALL_USER_SUSCESS',
//  GET_ALL_USER_FAILED: 'GET_ALL_USER_FAILED',



// Actions lấy AllCode (Gender, Province, Permission)
export const getAllUserStart = (type) => {
    return async (dispatch, getState) => {
        try{
            if(type === 'ALL'){
                let allUser = await adminService.getAllUser(type);
                if( allUser && allUser.data.errCode === 0){
                    let data = allUser.data.data.listAllUser
                    dispatch(getAllUserSuscess(data))
                }else{
                    dispatch(getAllUserFailed())
                }
            }
        }catch(err) {
            console.log("fetchAllDoctor"+ err)
            dispatch(getAllUserFailed())
        }
    }
}

export const getAllUserSuscess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUSCESS,
    users: data
})

export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED,
})



// GET_ALL_SHOP_SUSCESS: 'GET_ALL_SHOP_SUSCESS',
// GET_ALL_SHOP_FAILED: 'GET_ALL_SHOP_FAILED',



// Actions lấy AllCode (Gender, Province, Permission)
export const getAllShopStart = (type) => {
    return async (dispatch, getState) => {
        try{
            if(type === 'ALL'){
                
                let allShop = await adminService.getAllShop(type);

                console.log(allShop)
                
                if( allShop && allShop.data.errCode === 0){
                    let data = allShop.data.data.listAllShop
                    dispatch(getAllShopSuscess(data))
                }else{
                    dispatch(getAllShopFailed())
                }
            }
        }catch(err) {
            console.log("fetchAllDoctor"+ err)
            dispatch(getAllShopFailed())
        }
    }
}

export const getAllShopSuscess = (data) => ({
    type: actionTypes.GET_ALL_SHOP_SUSCESS,
    shops: data
})

export const getAllShopFailed = () => ({
    type: actionTypes.GET_ALL_SHOP_FAILED,
})
