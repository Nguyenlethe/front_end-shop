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
            let resGender = await adminService.getAllCode('GENDER');
            let resPermission = await adminService.getAllCode('ROLE')
            let resProvince = await adminService.getAllCode('TTP')
            

            if( resGender && resGender.data.errCode === 0 &&
                resPermission && resPermission.data.errCode === 0 &&
                resProvince && resProvince.data.errCode === 0
            ){
                let data = {
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
