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
            console.log("Error Actions :"+ err)
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
            console.log("Error Actions :"+ err)
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
            console.log("Error Actions :"+ err)
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




// GET_ALL_CATEGORY_SUSCESS: 'GET_ALL_CATEGORY_SUSCESS',
// GET_ALL_CATEGORY_FAILED: 'GET_ALL_CATEGORY_FAILED',

export const getCategoryAllCodeStart = () => {
    return async (dispatch, getState) => {
        try{

            let category = await adminService.getAllCode('CATEGRORY')
            // console.log(category)
            
            if(category && category.data.errCode === 0 ){
                let data = {
                    category: category.data.data.inputType,
                }
                dispatch(getCategoryAllCodeSuscess(data))
            }else{
                dispatch(getCategoryAllCodeFailed())
            }
        }catch(err) {
            console.log("Error Actions :"+ err)
            dispatch(getCategoryAllCodeFailed())
        }
    }
}

export const getCategoryAllCodeSuscess = (data) => ({
    type: actionTypes.GET_ALL_CATEGORY_SUSCESS,
    dataAllCode: data
})

export const getCategoryAllCodeFailed = () => ({
    type: actionTypes.GET_ALL_CATEGORY_FAILED,
})





//  GET_ALL_USER_SUSCESS: 'GET_ALL_USER_SUSCESS',
//  GET_ALL_USER_FAILED: 'GET_ALL_USER_FAILED',



// Actions lấy user All và !R2
export const getAllUserStart = (type) => {
    return async (dispatch, getState) => {
        try{

            let allUser = await adminService.getAllUser('ALL');
            let allUserNotInR2 = await adminService.getAllUser('!R2');
        
        
            if( allUser && allUser.data.errCode === 0 && 
                allUserNotInR2 && allUserNotInR2.data.errCode === 0 
            ){
                let dataFull = allUser.data.data.listAllUser
                let dataNotInR2 = allUserNotInR2.data.data.listAllUser

                // console.log(allUserNotInR2.data.data.listAllUser, allUser.data.data.listAllUser)

                dispatch(getAllUserSuscess(dataFull))
                dispatch(getAllUserNotSellerSuscess(dataNotInR2))
            }else{
                dispatch(getAllUserFailed())
            }
           

        }catch(err) {
            console.log("Error Actions :"+ err)
            dispatch(getAllUserFailed())
        }
    }
}

export const getAllUserSuscess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUSCESS,
    users: data
})

export const getAllUserNotSellerSuscess = (data) => ({
    type: actionTypes.GET_ALL_USER_NOT_SELLER_SUSCESS,
    users: data
})

export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED,
})



// GET_ALL_SHOP_SUSCESS: 'GET_ALL_SHOP_SUSCESS',
// GET_ALL_SHOP_FAILED: 'GET_ALL_SHOP_FAILED',



// Actions lấy all Shop
export const getAllShopStart = (type) => {
    return async (dispatch, getState) => {
        try{
           
            let allShop = await adminService.getAllShop('ALL');
            if( allShop && allShop.data.errCode === 0){
                let data = allShop.data.data.listAllShop
                dispatch(getAllShopSuscess(data))
            }else{
                dispatch(getAllShopFailed())
            }
    
        }catch(err) {
            console.log("Error Actions :"+ err)
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





// Actions lấy AllCode (category)
export const getAllCodeInToItemsStart = (inputType) => {
    return async (dispatch, getState) => {
        try{

            let res = await adminService.getAllCode(inputType)
            
            // Thoi trang nam
            if(inputType === 'FSB'){
                if(res && res.data.errCode === 0 ){
                    
                    let FSBData = res.data.data.inputType
                    
                    // console.log(FSBData)
                    
                    dispatch(getAllCodeInToItemsFSBDataSuscess(FSBData))
                    return FSBData
                }else{
                    dispatch(getAllCodeInToItemsFSBDataSuscess([]))
                }
            }

            // Phu Kien Thhoi trang nam
            if(inputType === 'FSAM'){
                if(res && res.data.errCode === 0 ){
                    
                    let FSAMData = res.data.data.inputType
                    // console.log(FSAMData)
                    
                    dispatch(getAllCodeInToItemsFSAMDataSuscess(FSAMData))
                    return FSAMData
                }else{
                    dispatch(getAllCodeInToItemsFSAMDataSuscess([]))
                }
            }

            // Thoi trang nu
            if(inputType === 'FSM'){
                if(res && res.data.errCode === 0 ){
                    
                    let  FSMData = res.data.data.inputType
                    // console.log(FSMData)
                    
                    dispatch(getAllCodeInToItemsFSMDataSuscess(FSMData))
                    return FSMData
                }else{
                    dispatch(getAllCodeInToItemsFSMDataSuscess([]))
                }
            }

            // Phu Kien Thhoi trang nu
            if(inputType === 'FSAW'){
                if(res && res.data.errCode === 0 ){
                    
                    let FSAWData = res.data.data.inputType
                    // console.log(FSAWData)
                    
                    dispatch(getAllCodeInToItemsFSAWDataSuscess(FSAWData))
                    return FSAWData
                }else{
                    dispatch(getAllCodeInToItemsFSAWDataSuscess([]))
                }
            }

            // All
            if(inputType === 'All'){
                if(res && res.data.errCode === 0 ){
                    
                    let AllData = res.data.data.inputType
                    // console.log(AllData)
                    dispatch(getAllCodeInToItemsAllDataSuscess(AllData))
                    return AllData
                }else{
                    dispatch(getAllCodeInToItemsAllDataSuscess([]))
                }
            }

            // Giảm giá 
            if(inputType === 'DCC'){
                if(res && res.data.errCode === 0 ){
                    let DCCData = res.data.data.inputType
                    // console.log(DCCData)
                    dispatch(getAllCodeInToItemsDCCDataSuscess(DCCData))
                }else{
                    dispatch(getAllCodeInToItemsDCCDataSuscess([]))
                }
            }

            // Thương Hiệu
            if(inputType === 'BNPRD'){
                if(res && res.data.errCode === 0 ){
                    let BNPRDData = res.data.data.inputType
                    // console.log(BNPRDData)
                    dispatch(getAllCodeInToItemsBNPRDDataSuscess(BNPRDData))
                }else{
                    dispatch(getAllCodeInToItemsBNPRDDataSuscess([]))
                }
            }

            // Kiểu cỡ
            if(inputType === 'TYPESIZE'){
                if(res && res.data.errCode === 0 ){
                    let TYPESIZEData = res.data.data.inputType
                    // console.log(TYPESIZEData)
                    dispatch(getAllCodeInToItemsTYPESIZEDataSuscess(TYPESIZEData))
                }else{
                    dispatch(getAllCodeInToItemsTYPESIZEDataSuscess([]))
                }
            }

            // Kiểu cỡ chu
            if(inputType === 'SIZE'){
                if(res && res.data.errCode === 0 ){
                    let SIZEData = res.data.data.inputType
                    // console.log(SIZEData)
                    dispatch(getAllCodeInToItemsSIZEDataSuscess(SIZEData))
                }else{
                    dispatch(getAllCodeInToItemsSIZEDataSuscess([]))
                }
            }

            // Kiểu cỡ so
            if(inputType === 'SZNB'){
                if(res && res.data.errCode === 0 ){
                    let SZNBData = res.data.data.inputType
                    // console.log(SZNBData)
                    dispatch(getAllCodeInToItemsSZNBDataSuscess(SZNBData))
                }else{
                    dispatch(getAllCodeInToItemsSZNBDataSuscess([]))
                }
            }

            // Mau
            if(inputType === 'COLOR'){
                if(res && res.data.errCode === 0 ){
                    let COLORData = res.data.data.inputType
                    // console.log(SZNBData)
                    dispatch(getAllCodeInToItemsCOLORDataSuscess(COLORData))
                }else{
                    dispatch(getAllCodeInToItemsCOLORDataSuscess([]))
                }
            }
            

        }catch(err) {
            console.log("Error Actions getAllCodeInToItemsStart :"+ err)
        }
    }
}

export const getAllCodeInToItemsFSBDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_FSB_SUCCESS,
    FSBData: data
})


export const getAllCodeInToItemsFSAMDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_FSAM_SUCCESS,
    FSAMData: data
})


export const getAllCodeInToItemsFSMDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_FSM_SUCCESS,
    FSMData: data
})


export const getAllCodeInToItemsFSAWDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_FSAW_SUCCESS,
    FSAWData: data
})

export const getAllCodeInToItemsAllDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_ALL_SUCCESS,
    AllData: data
})


export const getAllCodeInToItemsDCCDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_DCC_SUCCESS,
    DCCData: data
})


export const getAllCodeInToItemsBNPRDDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_BNPRD_SUCCESS,
    BNPRDData: data
})


export const getAllCodeInToItemsTYPESIZEDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_TYPESIZE_SUCCESS,
    TYPESIZEData: data
})

export const getAllCodeInToItemsSIZEDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_SIZE_SUCCESS,
    SIZEData: data
})


export const getAllCodeInToItemsSZNBDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_SZNB_SUCCESS,
    SZNBData: data
})


export const getAllCodeInToItemsCOLORDataSuscess = (data) => ({
    type: actionTypes.GET_DATA_ALLCODE_COLOR_SUCCESS,
    COLORData: data
})



// GET_DATA_ITEMS_SUCCESS: 'GET_DATA_ITEMS_SUCCESS',
// GET_DATA_ITEMS_FAILED: 'GET_DATA_ITEMS_FAILED',

// Actions lấy AllCode (category)
export const getDataItemsStart = (inputType) => {
    return async (dispatch, getState) => {
        try{

            let res = await adminService.getDataItems(inputType)
            // console.log(res)


            if(inputType === 'All'){
                if(res && res.data.errCode === 0 ){
                    let dataAllItems = res.data.data.inputType
                    // console.log(dataAllItems)
                    dispatch(getDataItemsSuscess(dataAllItems))
                }else{
                    dispatch(getDataItemsSuscess([]))
                }
            }

        }
        catch(err){
            console.log("Error Actions getDataItemsStart :"+ err)
        }
    }
}

export const getDataItemsSuscess = (data) => ({
    type: actionTypes.GET_DATA_ITEMS_SUCCESS,
    dataAllItems: data
})


// SET_VALUE_EMPTY
export const setValueInputEmpty = () => {
    return async (dispatch, getState) => {
        try{
            const ranDomNumber = Math.floor(1000 + Math.random() * 9000)
            dispatch(setValueInputEmptySuscess(ranDomNumber))
        }
        catch(err){
        }
    }
}

export const setValueInputEmptySuscess = (ranDomNumber) => ({
    type: actionTypes.SET_VALUE_EMPTY,
    valueInput: ranDomNumber
})