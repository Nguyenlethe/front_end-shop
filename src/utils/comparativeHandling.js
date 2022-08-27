
import bcrypt from 'bcryptjs'
import { languages } from './constant'
import _ from 'lodash'

// Kiểm tra quyền
const handleCheckPermission = (comparativeData,encryptedData) => {
    let result = bcrypt.compareSync(comparativeData,encryptedData)
    return result
}


// Set object về trống
const resetDefaultState = (objectData) => {
    if(!_.isEmpty(objectData)){
        for(let key in objectData ){
            objectData[key] = ''
        }
        return objectData
    }
}


// Convent về options của input select
const handlConvertObject = (listObject,actions) => {
    let {language} = this.props
    let newObject = []

    if(actions === 'LIST_SHOP'){
        listObject.map(item => {
            newObject.value = item.id
            newObject.label =  item.nameShop;
            newObject.push({value: newObject.value ,label: newObject.label})
        })
    }

    if(actions === 'LIST_CATEGORY'){

        listObject.map(item => {
            newObject.value = item.code
            newObject.label = language === languages.EN ?  item.valueEn : item.valueVi
            newObject.push({value: newObject.value ,label: newObject.label})
        })
       
    }
    
    if(actions === undefined){
        listObject.map(item => {
            newObject.value = item.id
            newObject.label = language === languages.EN ? `${item.lastName} ${item.firstName}` : `${item.firstName} ${item.lastName}`
            newObject.push({value:newObject.value ,label: newObject.label})
        })
    }

    return ([...newObject])
}


export default {
    handleCheckPermission,
    resetDefaultState,
    handlConvertObject
} 